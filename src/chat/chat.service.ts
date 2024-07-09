import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';


interface client {
    username: string, 
    rol: string
}

@Injectable()
export class ChatService {
    constructor(private readonly messageService: MessageService){
    }

    async getAllMessages(){
        return await this.messageService.findAll()
    }
}
