import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { 
        name: Message.name, 
        useFactory: () => {
          const schema = MessageSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        }
      },
    ]),
    UsersModule
  ],
  controllers: [],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
