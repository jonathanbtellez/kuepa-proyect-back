import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MessageModule], 
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
