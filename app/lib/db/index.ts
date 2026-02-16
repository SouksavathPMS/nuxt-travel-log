import { drizzle } from "drizzle-orm/singlestore/driver";

import { configEnv } from "../env";
import * as schema from "./schema";

export const db = drizzle({
  connection: {
    path: configEnv.TURSO_DATABASE_URL,
  },
  casing: "snake_case",
  schema,
});
