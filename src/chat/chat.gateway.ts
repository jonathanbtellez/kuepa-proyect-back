import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({ cors: true })
@Injectable()
export class ChatGateway implements OnModuleInit{

  @WebSocketServer()
  private server: Server
  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {

      socket.on('disconnect', ()=> {
      })
    })
  }

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message: object): void {
    console.log('message', message)

    this.server.emit('received-message', {
      
    })
  }

}
