import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
// 1. Import the new PlainPost type
import { type PlainPost } from "@/lib/models";
import { Eye, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Props {
  posts: PlainPost[]; // 2. Use PlainPost[] as the prop type
}

export default function StatsCard({ posts }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Posts ({posts.length})</CardTitle>
        <CardDescription>
          Overview of your published articles.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex max-h-[600px] flex-col gap-4 overflow-y-auto">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <h4 className="font-medium">{post.title}</h4>
              <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="size-4" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="size-4" /> {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-4" />{" "}
                  {post.commentCount || 0}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        )}
      </CardContent>
    </Card>
  );
}