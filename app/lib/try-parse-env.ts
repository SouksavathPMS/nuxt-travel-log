/* eslint-disable node/no-process-env */
import type { ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

export default function tryParseEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    EnvSchema.parse(buildEnv);
  }
  catch (error) {
    if (error instanceof ZodError) {
      let missingKeys = "";
      error.issues.forEach((issue) => {
        missingKeys += `- ${String(issue.path[0])}\n`;
      });

      const message = `Missing required environment variables:\n${missingKeys}\nTip: If you are deploying to Vercel, ensure these are added to your Project Settings.`;

      // If we're in a build or prepare phase, we should not crash the process
      const isBuildPhase = process.env.VERCEL === "1" || process.env.CI === "true" || process.env.npm_lifecycle_event === "prepare";

      if (isBuildPhase) {
        console.warn(`[WARNING] ${message}`);
      }
      else {
        const e = new Error(message);
        e.stack = "";
        throw e;
      }
    }
    else {
      console.error(error);
    }
  }
}
