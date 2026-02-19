import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";

import { db } from "./db/index";
import { configEnv } from "./env";

export const auth = betterAuth({
  baseURL: configEnv.BETTER_AUTH_URL,
  trustedOrigins: [
    "https://nuxt-travel-log-seven-rosy.vercel.app",
    "http://localhost:3000",
  ],
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },
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
