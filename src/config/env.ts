import dotenv from 'dotenv';
dotenv.config();
import ms from 'ms';
export const env = {
  PORT: Number(process.env.PORT || 3000),

  JWT_SECRET: process.env.JWT_SECRET!,
  REFRESH_SECRET: process.env.REFRESH_SECRET!,

  ACCESS_TOKEN_EXPIRES_IN: (process.env.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue) ?? '15m',
  REFRESH_TOKEN_EXPIRES_IN: (process.env.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue) ?? '7d',

  REFRESH_TOKEN_EXPIRES_IN_MS:
    Number(process.env.REFRESH_TOKEN_EXPIRES_IN_MS) ?? 7 * 24 * 60 * 60 * 1000,
};
