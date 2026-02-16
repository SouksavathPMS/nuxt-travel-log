import { defineConfig } from "drizzle-kit";

import { configEnv } from "./app/lib/env";

export default defineConfig({
  out: "./app/lib/db/migrations",
  schema: "./app/lib/db/schema/index.ts",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: configEnv.DB_FILE_NAME,
    authToken: configEnv.NODE_ENV === "development" ? undefined : configEnv.TURSO_AUTH_TOKEN,
  },
});
