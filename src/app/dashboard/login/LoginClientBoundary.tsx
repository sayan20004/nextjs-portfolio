// src/app/dashboard/login/LoginClientBoundary.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginClientBoundary() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "AccessDenied") {
      toast.error("Access Denied. Only the site owner can log in.");
    }
  }, [error]);

  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-6">
      <h1 className="title">Dashboard Login</h1>
      <p className="text-muted-foreground">Please sign in to continue.</p>
      <Button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
        Sign in with GitHub
      </Button>
    </div>
  );
}