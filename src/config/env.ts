import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || "0.0.0.0",
  DB_USER: process.env.DB_USER || "secretaria_user",
  DB_PASS: process.env.DB_PASS || "senha123",
  DB_NAME: process.env.DB_NAME || "secretaria_db",
  DB_DIALECT: (process.env.DB_DIALECT as any) || "mysql",
  SWAGGER_ENABLED: process.env.SWAGGER_ENABLED === "true",
  JWT_SECRET: process.env.JWT_SECRET || "ffddb3759aca70db2ee91963cee26082a8bf46903e37baf5624962f5e9035170",
  NODE_ENV: process.env.NODE_ENV || "development",
};
