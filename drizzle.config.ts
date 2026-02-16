/* eslint-disable node/no-process-env */
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./app/lib/db/migrations",
  schema: "./app/lib/db/schema/index.ts",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || "file:local.db",
  },
});
