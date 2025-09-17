import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Demo user giả định (thực tế sẽ lấy từ DB)
  private users = [
    { id: 1, email: 'test@example.com', password: '$2b$10$abcdefghi1234567890abcdEfGhIJklmnopqrstuv' }
  ];

  constructor(private jwtService: JwtService) {}

  // ✅ Kiểm tra user + mật khẩu
  async validateUser(email: string, pass: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Nếu muốn test thực tế thì lưu hash bcrypt vào users và dùng compare
    // const isPasswordValid = await bcrypt.compare(pass, user.password);
    const isPasswordValid = pass === '123456';
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;
    return result;
  }

  // ✅ Tạo token khi login thành công
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'demo_secret',
        expiresIn: '1h',
      }),
      user,
    };
  }
}
