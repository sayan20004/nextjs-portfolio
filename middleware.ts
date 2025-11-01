export { default } from "next-auth/middleware";

// This protects your dashboard route
export const config = { matcher: ["/dashboard"] };