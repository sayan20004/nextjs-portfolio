"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
// 1. Import the new PlainPost type
import { type PlainPost } from "@/lib/models";
import { formatDate } from "@/lib/utils";
import { Eye, Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

interface Props {
  post: PlainPost; // 2. Use PlainPost as the prop type
}

export default function BlogCard({ post }: Props) {
  const commentCount = post.commentCount || 0;

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="flex h-full flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg">
        <CardHeader>
          {post.thumbnail && (
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={500}
              height={300}
              className="h-40 w-full rounded-t-lg object-cover"
            />
          )}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-2">
          <CardTitle>
            <Balancer>{post.title}</Balancer>
          </CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex w-full justify-between text-xs text-muted-foreground">
          {/* 3. This is now safe. post.createdAt is a string.
               formatDate() also expects a string.
          */}
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {formatDate(post.createdAt)}
          </time>
          <div className="flex gap-3">
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
        </CardFooter>
      </Card>
    </Link>
  );
}