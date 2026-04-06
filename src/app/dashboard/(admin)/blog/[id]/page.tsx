import PostEditor from "@/components/dashboard/PostEditor";
import dbConnect from "@/lib/db";
import { Post } from "@/lib/models";

async function getPost(id: string) {
  try {
    await dbConnect();
    const post = await Post.findById(id).lean();
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="title text-3xl">Edit Blog Post</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Update &quot;{post.title}&quot;
        </p>
      </div>

      <PostEditor postToEdit={post} />
    </div>
  );
}
