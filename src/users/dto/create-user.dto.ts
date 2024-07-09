import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsEmail, IsOptional } from 'class-validator';
import { userRol } from 'src/common/enums';

export class CreateUserDto {
    @ApiProperty({ example: "juan perez", required: true, description: 'Name of user'})
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty({ example: "juanpe", required: true, description: 'Username o nickname'})
    @IsNotEmpty()
    @IsEmail()
    username: string;
  
    @ApiProperty({ example: "123456", required: true, description: 'Password user'})
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @ApiProperty({ example: "moderador", required: true, description: 'Rol user'})  
    @IsNotEmpty()
    rol: userRol;
  
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isActive?: boolean = true;
  }