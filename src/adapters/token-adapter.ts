import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

export interface Tokenizer {
  verifyToken(token: string): JwtPayload;
  verifyRefreshToken(token: string): JwtPayload;
  generateToken(payload: object): string;
  generateRefreshToken(payload: object): string;
}

export class TokenAdapter implements Tokenizer {
  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as JwtPayload;
  }
  verifyToken(token: string): JwtPayload {
    const secret = ENV.JWT_SECRET;
    return jwt.verify(token, secret) as JwtPayload;
  }
  generateToken(payload: object): string {
    const secret = ENV.JWT_SECRET;
    const expiresIn = (ENV.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "15m";
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, secret, options);
  }
  generateRefreshToken(payload: object): string {
    const secret = ENV.JWT_REFRESH_SECRET;
    const expiresIn =
      (ENV.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) || "7d";
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, secret, options);
  }
}
