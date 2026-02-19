import { defineEventHandler, setResponseHeaders, toWebRequest } from "h3";

import { auth } from "../../../app/lib/auth";

export default defineEventHandler(async (event) => {
  const origin = event.headers.get("origin") ?? "";

  if (origin.endsWith(".vercel.app")) {
    setResponseHeaders(event, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
  }

  if (event.method === "OPTIONS") {
    return null;
  }

  return auth.handler(toWebRequest(event));
});
