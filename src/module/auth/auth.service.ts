import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken() {
    const payload = { role: 'admin' };
    return this.jwtService.sign(payload);
  }
}
