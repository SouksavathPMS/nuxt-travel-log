import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  DB_FILE_NAME: z.string(),
  TURSO_AUTH_TOKEN: z.string().optional(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

/* eslint-disable node/no-process-env */
export const configEnv = EnvSchema.parse(process.env);
