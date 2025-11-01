import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import { Eye, Heart, MessageSquare } from "lucide-react";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import LikeButton from "@/components/blog/LikeButton";
import CommentSection from "@/components/blog/CommentSection";
import { MdxComponents } from "@/components/mdx/MdxComponents";

// --- START OF CHANGES ---
import dbConnect from "@/lib/db";
import { Post, type PlainPost } from "@/lib/models"; // 1. Import Post model and PlainPost type

interface PageProps {
  params: { slug: string };
}

// 2. This function now talks to the DB directly
async function getPost(slug: string): Promise<PlainPost | null> {
  await dbConnect();
  try {
    const post = await Post.findOneAndUpdate(
      { slug: slug },
      { $inc: { views: 1 } }, // Increment view count
      { new: true }
    )
      .populate("commentCount")
      .lean(); // Use .lean() to get a plain object

    if (!post) {
      return null;
    }
    // 3. Serialize the plain object to pass to client components
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}
// --- END OF CHANGES ---

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  // 4. Use the plain object's commentCount
  const commentCount = post.commentCount || 0;

  return (
    <>
      <article className="mt-8 flex flex-col gap-8 pb-16">
        {/* Header */}
        <section className="flex flex-col gap-4">
          <h1 className="title text-4xl sm:text-5xl">
            <Balancer>{post.title}</Balancer>
          </h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-medium">Sayan Maity</span>
                <span className="text-muted-foreground">
                  {/* 5. Pass the 'createdAt' string to formatDate */}
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="size-4" /> {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="size-4" /> {post.views}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="size-4" /> {commentCount}
              </span>
            </div>
          </div>
        </section>

        {/* Thumbnail */}
        {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={700}
            height={400}
            className="w-full rounded-lg border object-cover shadow-md"
            priority
          />
        )}

        {/* MDX Content */}
        <section className="prose max-w-full dark:prose-invert">
          <MDXRemote source={post.content} components={MdxComponents} />
        </section>

        <hr />

        {/* 6. Pass data to client components */}
        <CommentSection slug={post.slug} />
      </article>

      <LikeButton slug={post.slug} initialLikes={post.likes} />
    </>
  );
}

// This loading.tsx component will be used as a fallback
