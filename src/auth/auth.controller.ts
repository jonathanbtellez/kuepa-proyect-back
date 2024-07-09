import {
  BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiHeaders, ApiOperation, ApiResponse, ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
  
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
  
  @ApiBasicAuth()
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Handle login of users'})
    @ApiResponse({status: 201, description: 'autheticate a user'})
    @ApiResponse({status: 400, description: 'credentials not match'})
    @ApiResponse({status: 404, description: 'not found'})
    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto) {
      try {
        return this.authService.signIn(signInDto.username, signInDto.password);
      } catch (error) {
        throw new Error(error)
      }
    }

    @ApiOperation({summary: 'Handle register of users'})
    @ApiResponse({status: 201, description: 'create a user'})
    @ApiResponse({status: 400, description: 'username already exist'})
    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto) {
      try {
        return await this.authService.signUp(signUpDto);
      } catch (error) {
        if(error instanceof BadRequestException){
          throw new BadRequestException(error.message);
        }
        throw new Error(error);
      }
    }
  
    @ApiOperation({ summary: 'Get the user auth data' })
    @ApiResponse({ status: 200, description: 'DUser data' })
    @ApiUnauthorizedResponse({ description: 'Invalid token' })
    @ApiHeaders([{ name: 'Authorization', description: 'Bearer token use with a client like postman', required: true}])
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }