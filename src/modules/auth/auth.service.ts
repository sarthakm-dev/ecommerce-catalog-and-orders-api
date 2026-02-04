import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../../config/env';
import { UserRepository } from '../user/user.repository';
import { RefreshTokenRepository } from './refresh-token.repository';
import crypto from 'node:crypto';
export class AuthService {
  static async login(data: any) {
    const { email, password } = data;

    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new Error('Invalid credentials');

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user.id, role: user.role }, env.REFRESH_SECRET, {
      expiresIn: '7d',
    });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await RefreshTokenRepository.create(user.id, refreshToken, expiresAt);

    return { accessToken, refreshToken };
  }

  static async refresh(refreshToken: string) {
    let payload: JwtPayload;

    try {
      payload = jwt.verify(refreshToken, env.REFRESH_SECRET) as JwtPayload;
    } catch {
      throw new Error('Invalid refresh token');
    }

    const stored = await RefreshTokenRepository.find(refreshToken);
    if (!stored) {
      throw new Error('Invalid refresh token');
    }

    if (new Date(stored.expiresAt) < new Date()) {
      await RefreshTokenRepository.deleteByUserId(stored.userId);
      throw new Error('Refresh token expired');
    }

    const user = await UserRepository.findById(stored.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, {
      expiresIn: '15m',
    });

    return accessToken;
  }

  static async logout(refreshToken: string) {
    console.log('LOGOUT SERVICE TOKEN', refreshToken);
    const stored = await RefreshTokenRepository.find(refreshToken);
    console.log('FOUND IN DB', stored);
    if (!stored) return;
    await RefreshTokenRepository.deleteByUserId(stored.userId);
    console.log('deleting refresh token:', refreshToken);
    const stillThere = await RefreshTokenRepository.find(refreshToken);
    console.log('Still Exists?', stillThere);
  }
}
