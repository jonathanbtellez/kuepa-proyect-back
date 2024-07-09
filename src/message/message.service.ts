import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, Message as MessageSchema } from './schema/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MessageSchema.name) private messageModel: Model<Message>,
    private readonly userService : UsersService
  ) {}

  async create(createMessageDto: CreateMessageDto, ) {  
    const createdMessage = new this.messageModel(createMessageDto);
    createdMessage.save();
    const user = await this.userService.findByUsername(createMessageDto.username)
    this.userService.addMessage(user.id, createdMessage.id)
  }
  
  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
