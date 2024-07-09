import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { userRol } from 'src/common/enums';

export class SignInDto {
  @ApiProperty({ example: "juanpe", required: true, description: 'Username o nickname'})
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: "123456", required: true, description: 'Password user'})
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: "moderador", required: true, description: 'Rol user'})  
  @IsNotEmpty()
  rol: userRol;
}