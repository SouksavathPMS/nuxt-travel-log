import { drizzle } from "drizzle-orm/tursodatabase/database";

import { configEnv } from "../../lib/env";
import * as schema from "./schema";

export const db = drizzle({
  connection: {
    url: configEnv.TURSO_DATABASE_URL,
    authToken: configEnv.TURSO_AUTH_TOKEN,
  },
  casing: "snake_case",
  schema,
});

export default db;
