import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username or ID", type: "text", placeholder: "wassammmy" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim();
        const password = credentials?.password?.trim();

        if (
          (username === "wassammmy" && password === "sayanwas") ||
          (process.env.ADMIN_USERNAME &&
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD)
        ) {
          return {
            id: "1",
            name: "Sayan Maity",
            email: "sayanmaity600@gmail.com",
          };
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key_sayan_portfolio",
  pages: {
    signIn: "/dashboard/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }
      const githubProfile = profile as any;
      if (githubProfile?.login === "sayan20004") {
        return true;
      }
      return "/dashboard/login?error=AccessDenied";
    },
  },
};