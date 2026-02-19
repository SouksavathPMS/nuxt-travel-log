import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  if (event.path.startWith("/dashboard")) {
    const session = await auth.api.getSession({
      headers: getHeaders(event),
    });

    if (!session) {
      await sendRedirect(event, "/", 302);
    }
  }
});
