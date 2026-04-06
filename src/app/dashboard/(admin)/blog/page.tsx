import PostEditor from "@/components/dashboard/PostEditor";
import DeletePostButton from "@/components/dashboard/DeletePostButton";
import dbConnect from "@/lib/db";
import { Post, type PlainPost } from "@/lib/models";
import Link from "next/link";

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

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="title text-3xl">Blog Management</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Create and manage your blog posts
        </p>
      </div>

      <section>
        <h2 className="title mb-4 text-xl">Create New Post</h2>
        <PostEditor />
      </section>

      {posts.length > 0 && (
        <section>
          <h2 className="title mb-4 text-xl">Published Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border rounded-lg p-4 bg-muted/30 flex flex-col gap-3"
              >
                <div>
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Views:</span> {post.views}
                  </div>
                  <div>
                    <span className="font-medium">Likes:</span> {post.likes}
                  </div>
                  <div>
                    <span className="font-medium">Comments:</span>{" "}
                    {post.commentCount || 0}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {post.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-32 h-20 object-cover rounded"
                  />
                )}

                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium transition-colors"
                    target="_blank"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/blog/${post._id}`}
                    className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium transition-colors"
                  >
                    Edit
                  </Link>
                  <DeletePostButton postId={post._id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
