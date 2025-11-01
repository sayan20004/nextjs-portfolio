export { default } from "next-auth/middleware";

// This protects the dashboard AND all its sub-routes
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*"
  ],
};