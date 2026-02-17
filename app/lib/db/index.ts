import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { configEnv } from "../env";
import * as schema from "./schema";

const client = createClient({
  url: configEnv.TURSO_DATABASE_URL,
  authToken: configEnv.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, {
  casing: "snake_case",
  schema,
});
