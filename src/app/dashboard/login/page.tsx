// src/app/dashboard/login/page.tsx
import { Suspense } from "react";
import LoginClientBoundary from "./LoginClientBoundary";

// A simple loading component to show while Suspense is waiting
function LoadingFallback() {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-6">
      <h1 className="title">Dashboard Login</h1>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginClientBoundary />
    </Suspense>
  );
}