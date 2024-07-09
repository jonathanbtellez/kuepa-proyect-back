import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { userRol } from 'src/common/enums';
import { Log } from 'src/log/schema/log.schema';
import { Message } from 'src/message/schema/message.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  rol: userRol;
  @Prop({ required: true, unique: true, index: true })
  username: string;
  @Prop({ required: false })
  isActive: boolean;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  token: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }] })
  logs: Log[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  messages: Message[];
}



export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })