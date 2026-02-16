import { defineConfig } from "drizzle-kit";

import { configEnv } from "./app/lib/env";

export default defineConfig({
  out: "./app/lib/db/migrations",
  schema: "./app/lib/db/schema/index.ts",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: configEnv.TURSO_DATABASE_URL,
    authToken: configEnv.TURSO_AUTH_TOKEN,
  },
});
