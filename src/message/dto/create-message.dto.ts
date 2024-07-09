import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    content: string;
  
    @IsOptional()
    publish_at?: Date = new Date();
}
