import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async comparePassword(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }

  static generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, config.JWT_ACCESS_SECRET as string, {
      expiresIn: config.JWT_ACCESS_EXPIRY as any,
    });
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, config.JWT_REFRESH_SECRET as string, {
      expiresIn: config.JWT_REFRESH_EXPIRY as any,
    });
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, config.JWT_ACCESS_SECRET as string) as { userId: string };
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, config.JWT_REFRESH_SECRET as string) as { userId: string };
  }
}
