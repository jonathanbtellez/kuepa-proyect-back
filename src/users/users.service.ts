import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { User } from './user.interface';
import { User as UserSchema } from './schema/user.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<User>,
    private readonly encrypt : EncryptService,    
  ) {}

  async create(createUserDto: CreateUserDto, ): Promise<User> {  
    createUserDto.password = await this.encrypt.encrypt(createUserDto.password)
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();  
  }
  
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOneLogs(id: string): Promise<User> {
    return this.userModel.findById(id).populate('logs', ['type','status']).exec();
  }
  
  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();  
  }

  async addLog(id: ObjectId, log: ObjectId) {
    return this.userModel.findByIdAndUpdate(id, {$push: {logs: log}}).exec();
  }

  async addMessage(id: ObjectId, message: ObjectId) {
    return this.userModel.findByIdAndUpdate(id, {$push: {messages: message}}).exec();
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();  
  }

  async findByUsername(username: string): Promise<User | null>{
    return await this.userModel.findOne({ username }).exec();
  }

  async getUserInfo(username: string): Promise<User | null>{
    return await this.userModel.findOne({ username }, {username: 1, rol: 1, token: 1}).exec();
  }
}