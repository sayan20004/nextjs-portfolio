import { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="w-screen -mx-8 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-8">
      <div className="flex flex-col md:flex-row gap-8 mt-8 pb-16">
        <aside className="w-full md:w-48 shrink-0">
          <h2 className="title mb-4 text-xl">Admin</h2>
          <DashboardNav />
        </aside>
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
