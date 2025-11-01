import BlogCard from "@/components/blog/BlogCard";
// 1. Import the new PlainPost type
import { Post, type PlainPost } from "@/lib/models";
import dbConnect from "@/lib/db";

// 2. This function will now return Promise<PlainPost[]>
async function getPosts(): Promise<PlainPost[]> {
  await dbConnect();
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("commentCount")
      .lean();

    // The data is now plain, just need to stringify/parse for serialization
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my blog.</h1>
      <p className="text-muted-foreground">
        Thoughts on web development, UI/UX, and personal projects.
      </p>

      {posts && posts.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* 3. Map over and type as PlainPost */}
          {posts.map((post: PlainPost) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>
      ) : (
        <p>No posts found.</p>
      )}
    </article>
  );
}