import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { env } from '../../config/env';
import { UserRepository } from '../user/user.repository';
import { RefreshTokenRepository } from './auth.repository';
import { SignOptions } from 'jsonwebtoken';
export class AuthService {
  static async login(data: any) {
    const { email, password } = data;

    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error('Invalid credentials');

    await RefreshTokenRepository.deleteByUserId(user.id);

    const accessToken = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ userId: user.id }, env.REFRESH_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    const expiresAt = new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN_MS).toISOString();

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
      await RefreshTokenRepository.deleteByUserId(stored.user_id);
      throw new Error('Refresh token expired');
    }

    const user = await UserRepository.findById(stored.user_id);
    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });

    return accessToken;
  }

  static async logout(refreshToken: string) {
    const stored = await RefreshTokenRepository.find(refreshToken);
    if (!stored) return;
    await RefreshTokenRepository.deleteByUserId(stored.user_id);
  }
}
