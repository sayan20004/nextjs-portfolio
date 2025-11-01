export { default } from "next-auth/middleware";

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
    "/api/upload"
  ],
};