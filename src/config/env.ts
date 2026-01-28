import dotenv from "dotenv";
import path from "node:path";
import * as z from "zod";

// Carrega o .env específico por ambiente (ex.: .env.test nos testes)
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({
  path: [path.resolve(process.cwd(), envFile), path.resolve(process.cwd(), ".env")],
});

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),

  API_VERSION: z.string().default("v1"),
  SWAGGER_ENABLED: z
    .union([z.string(), z.boolean()])
    .transform((v) => (typeof v === "string" ? v === "true" : Boolean(v)))
    .default(true),

  JWT_SECRET: z.string().min(16, "JWT_SECRET deve ter pelo menos 16 caracteres"),
  JWT_EXPIRES_IN: z.string().default("1h"),
  JWT_REFRESH_SECRET: z.string().min(16, "JWT_REFRESH_SECRET deve ter pelo menos 16 caracteres"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  UPDATE_MODEL: z
    .union([z.string(), z.boolean()])
    .transform((v) => (typeof v === "string" ? v === "true" : Boolean(v)))
    .default(false),

  SALT: z.coerce.number().int().positive().default(10),

  DB_DIALECT: z.enum(["mysql", "mariadb", "postgres", "sqlite"]).default("mysql"),
  DB_HOST: z.string().default("127.0.0.1"),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_DATABASE: z.string().default("db_app"),
  DB_USERNAME: z.string().default("user_app"),
  DB_PASSWORD: z.string().default(""),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Falha ao validar variáveis de ambiente:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const ENV = parsed.data;
