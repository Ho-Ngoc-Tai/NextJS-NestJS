import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    { id: 1, email: 'test@example.com', password: '123456' },
  ];

  async findByEmail(email: string) {
    return this.users.find((u) => u.email === email);
  }
}
