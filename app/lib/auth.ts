import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "./db/index";
import { configEnv } from "./env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  socialProviders: {
    github: {
      clientId: configEnv.AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: configEnv.AUTH_GITHUB_CLIENT_SECRET as string,
    },
  },
});
