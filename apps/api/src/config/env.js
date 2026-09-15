/**
 * Centralized Environment Configuration Module
 * Validates and provides typed access to environment variables using Zod.
 */
const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (typeof val === "number") return val;
      return val ? parseInt(val, 10) : 3000;
    }),
  TURSO_URL: z.string().optional(),
  TURSO_TOKEN: z.string().optional(),
  DB_PATH: z.string().optional(),
  JWT_SECRET: z
    .string()
    .default("dev-secret-key-change-in-production"),
  AUTH_TOKEN_SECRET: z.string().optional(),
  UPLOADS_DIR: z.string().optional(),
});

function parseEnv(rawEnv = process.env) {
  const result = envSchema.safeParse(rawEnv);
  if (!result.success) {
    if (process.env.NODE_ENV !== "test") {
      const formatted = result.error.format();
      console.error("❌ Invalid environment variables configuration:", formatted);
    }
    throw new Error("Invalid environment configuration");
  }
  const data = result.data;
  return {
    ...data,
    IS_PROD: data.NODE_ENV === "production",
    IS_DEV: data.NODE_ENV === "development",
    IS_TEST: data.NODE_ENV === "test",
    JWT_SECRET: data.AUTH_TOKEN_SECRET || data.JWT_SECRET,
  };
}

const env = parseEnv(process.env);

module.exports = {
  env,
  parseEnv,
  envSchema,
};
