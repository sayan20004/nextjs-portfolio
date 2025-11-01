// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/dashboard/login", // This is your login page
  },
});

// This is the crucial part:
// It specifies which routes to protect.
export const config = {
  matcher: [
    /*
     * Match all dashboard pages
     */
    "/dashboard",
    "/dashboard/:path*",

    /*
     * Match all protected API routes
     */
    "/api/posts/manage/:path*",
    "/api/upload",
  ],
};