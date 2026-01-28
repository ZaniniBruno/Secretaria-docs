import * as z from "zod";
import {
  authResponseSchema,
  loginResponseSchema,
  loginSchema,
  refreshTokenSchema,
} from "../../schemas";

export type LoginDTO = z.infer<typeof loginSchema>;

export type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;

export type AuthResponseDTO = z.infer<typeof authResponseSchema>;

export type LoginResponseDTO = z.infer<typeof loginResponseSchema>;
