import PostEditor from "@/components/dashboard/PostEditor";
import StatsCard from "@/components/dashboard/StatsCard";
import AnalyticsPanel from "@/components/dashboard/AnalyticsPanel";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/db";
import { Post, type PlainPost } from "@/lib/models";

async function getPosts(): Promise<PlainPost[]> {
  try {
    await dbConnect();
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("commentCount")
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const posts = await getPosts();

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">
        Welcome, {session?.user?.name || "Admin"}.
      </h1>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="title mb-4 text-3xl">New Post</h2>
          <PostEditor />
        </div>
        <div>
          <h2 className="title mb-4 text-3xl">Stats</h2>
          <StatsCard posts={posts} />
        </div>
      </section>

      <section>
        <h2 className="title mb-4 text-3xl">Visitor Analytics</h2>
        <AnalyticsPanel />
      </section>
    </article>
  );
}