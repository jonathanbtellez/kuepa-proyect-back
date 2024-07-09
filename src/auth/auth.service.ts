import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { LogService } from 'src/log/log.service';
import { methodAuth, statusAuth, typeAuth } from 'src/common/enums';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
    private readonly log: LogService,
  ) {}

  @Post()
  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (!user){
      throw new NotFoundException('User not found');
    }
    if (!(await this.encryptService.compare(pass, user.password))) {
      const log = await this.log.create({
        user: user._id,
        type: typeAuth.LOGIN,
        status: statusAuth.ERROR,
        method: methodAuth.PASSWORD,
        result: { message: 'Password does not match' },
      });
      this.usersService.addLog(user._id, log._id);
      throw new BadRequestException('Password does not match');
    }

    const id = user._id;
    const log = await this.log.create({
      user: id,
      type: typeAuth.LOGIN,
      status: statusAuth.SUCCESS,
      method: methodAuth.PASSWORD,
      result: { message: 'Sign in succesfull' },
    });

    this.usersService.addLog(user._id, log._id);
    const payload = { sub: id, username: user.username, role: user.rol };
    const access_token = await this.jwtService.signAsync(payload);
    this.usersService.update(user.id, {token: access_token});
    
    return {
      access_token
    };
  }

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ access_token: string }> {
    const userInDB = await this.usersService.findByUsername(signUpDto.username);
    if(userInDB) {throw new BadRequestException('User already exists');}   
    const user = await this.usersService.create(signUpDto);
    const id = user._id;
    const log = await this.log.create({
      user: id,
      type: typeAuth.REGISTER,
      status: statusAuth.SUCCESS,
      method: methodAuth.PASSWORD,
      result: { message: 'Sign up succesfull' },
    });

    this.usersService.addLog(user._id, log._id);
    const payload = { sub: id, username: user.username, role: user.rol };

    const access_token = await this.jwtService.signAsync(payload);
    this.usersService.update(user.id, {token: access_token});
    
    return {
      access_token
    };
    
  }


}
