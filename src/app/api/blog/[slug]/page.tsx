import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { IPost } from "@/lib/models";
import { formatDate } from "@/lib/utils";
import { Eye, Heart, MessageSquare } from "lucide-react";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import LikeButton from "@/components/blog/LikeButton";
import CommentSection from "@/components/blog/CommentSection";
import { MdxComponents } from "@/components/mdx/MdxComponents";

interface PageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<IPost | null> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/posts/${slug}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const commentCount = (post as any).commentCount || 0;

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
                  {formatDate(new Date(post.createdAt).toISOString())}
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

        {/* Comments */}
        <CommentSection slug={post.slug} />
      </article>

      {/* Floating Like Button */}
      <LikeButton slug={post.slug} initialLikes={post.likes} />
    </>
  );
}

// Add a loading skeleton
export function Loading() {
  return (
    <article className="mt-8 flex animate-pulse flex-col gap-8 pb-16">
      <section className="flex flex-col gap-4">
        <div className="h-12 w-3/4 rounded-md bg-muted"></div>
        <div className="h-6 w-full rounded-md bg-muted"></div>
        <div className="h-10 w-1/2 rounded-md bg-muted"></div>
      </section>
      <div className="h-80 w-full rounded-lg bg-muted"></div>
      <section className="flex flex-col gap-4">
        <div className="h-6 w-full rounded-md bg-muted"></div>
        <div className="h-6 w-5/6 rounded-md bg-muted"></div>
        <div className="h-6 w-full rounded-md bg-muted"></div>
      </section>
    </article>
  );
}