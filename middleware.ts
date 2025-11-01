export { default } from "next-auth/middleware";

// This protects your dashboard and all its sub-routes
export const config = {
  matcher: "/dashboard/:path*",
};