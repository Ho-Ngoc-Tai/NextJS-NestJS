import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepo: UsersRepository) {}

  async login(email: string, password: string) {
    const user = await this.usersRepo.findByEmail(email);
    if (!user || user.password !== password) { // demo (chưa hash)
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user: { id: user.id, email: user.email },
      token: "fake-jwt-token-" + user.id,
    };
  }
}
