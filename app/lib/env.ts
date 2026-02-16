import dotenv from "dotenv";
import { z } from "zod";

import tryParseEnv from "./try-parse-env";

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  TURSO_AUTH_TOKEN: z.string().optional(),
  TURSO_DATABASE_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

/* eslint-disable node/no-process-env */
const parsed = EnvSchema.safeParse(process.env);

const isBuildPhase = process.env.VERCEL === "1" || process.env.CI === "true" || process.env.npm_lifecycle_event === "prepare";

export const configEnv = (parsed.success)
  ? parsed.data
  : (isBuildPhase)
      ? (parsed.data || {}) as EnvSchema
      : EnvSchema.parse(process.env);
