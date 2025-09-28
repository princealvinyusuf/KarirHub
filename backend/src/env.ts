export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  JWT_SECRET: String(process.env.JWT_SECRET ?? "dev_secret_change_me"),
  DATABASE_URL: String(process.env.DATABASE_URL ?? ""),
  CORS_ORIGIN: String(process.env.CORS_ORIGIN ?? "http://localhost:8100"),
};


