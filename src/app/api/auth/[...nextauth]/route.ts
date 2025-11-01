import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { authOptions } from "@/lib/auth";



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };