import { Controller, Post, Body, Res, Get } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(body.email, body.password)
    if (!user) return { statusCode: 401, message: 'Invalid credentials' }

    const { accessToken, refreshToken, user: safeUser } = await this.authService.login(user)

    // set httpOnly cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    })

    return { accessToken, user: safeUser }
  }

  @Get('profile')
  async profile() {
    return { message: 'This is profile demo endpoint' }
  }
}
