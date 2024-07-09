import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface User extends Document {
  _id: ObjectId;
  name: string;
  username: string;
  password: string;
  token: string;
  rol: string;
  logs: ObjectId[];
  messages: ObjectId[];
  isActive: boolean;
}