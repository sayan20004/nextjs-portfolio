import PostEditor from "@/components/dashboard/PostEditor";
import dbConnect from "@/lib/db";
import { Post, type PlainPost } from "@/lib/models";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

async function getPostToEdit(id: string): Promise<PlainPost | null> {
  await dbConnect();
  try {
    const post = await Post.findById(id).lean();
    if (!post) {
      return null;
    }
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Failed to fetch post for editing:", error);
    return null;
  }
}

export default async function EditPostPage({ params }: PageProps) {
  const post = await getPostToEdit(params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">Edit Post</h1>
      {/* Pass the post data to the editor */}
      <PostEditor postToEdit={post} />
    </article>
  );
}