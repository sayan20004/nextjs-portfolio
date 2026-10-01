"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";

export default function LoginClientBoundary() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error === "AccessDenied") {
      toast.error("Access Denied. Invalid credentials.");
    }
  }, [error]);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        toast.error("Invalid ID or Password. Please try again.");
      } else {
        toast.success("Successfully logged in!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-6 max-w-md mx-auto w-full px-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your ID and Password to access the CMS dashboard.
        </p>
      </div>

      <form
        onSubmit={handleCredentialsLogin}
        className="w-full flex flex-col gap-4 border border-border p-6 rounded-xl bg-card shadow-sm"
      >
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">
            User ID
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="wassammmy"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-9"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full mt-2">
          {loading ? "Signing in..." : "Sign In to Dashboard"}
        </Button>
      </form>

      <div className="relative w-full flex items-center justify-center my-1">
        <div className="border-t border-border w-full"></div>
        <span className="bg-background px-3 text-xs text-muted-foreground absolute">
          or
        </span>
      </div>

      <Button
        variant="outline"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        className="w-full"
      >
        Sign in with GitHub
      </Button>
    </div>
  );
}