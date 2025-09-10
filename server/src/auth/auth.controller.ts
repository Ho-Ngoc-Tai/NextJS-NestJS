import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (email === 'test@example.com' && password === '123456') {
      return { message: 'Login success!', token: 'fake-jwt-token' };
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    return { message: 'User registered!', user: body };
  }

  @Get('ping')
  ping() {
    return { message: 'Auth API is working!' };
  }
}
