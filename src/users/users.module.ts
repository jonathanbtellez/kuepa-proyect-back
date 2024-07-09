import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { User, UserSchema} from './schema/user.schema'
import { EncryptModule } from 'src/encrypt/encrypt.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    { 
      name: User.name, 
      useFactory: () => {
        const schema = UserSchema;
        schema.plugin(require('mongoose-autopopulate'));
        return schema;
      }
    }]),
  EncryptModule,
  LogModule
],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}