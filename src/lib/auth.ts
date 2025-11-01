import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Export authOptions from here
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/dashboard/login",
  },
  callbacks: {
    // MODIFIED CALLBACK:
    // We check against the GitHub username ("login") from the "profile" object,
    // as the "user.email" can be null or undefined.
    async signIn({ user, profile }) {
      // Cast profile to 'any' to access provider-specific properties
      const githubProfile = profile as any; 
      
      // Check if the user logging in is you
      if (githubProfile?.login === "sayan20004") {
        return true; // Allow sign-in
      } else {
        // Log the attempted sign-in and deny access
        console.warn(
          `Unauthorized login attempt by GitHub user: ${githubProfile?.login}`
        );
        return "/dashboard/login?error=AccessDenied"; // Redirect to login with error
      }
    },
  },
};