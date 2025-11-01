import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { type PlainPost } from "@/lib/models";
import { Eye, Heart, MessageSquare, PencilIcon } from "lucide-react";
import Link from "next/link";
import DeletePostButton from "./DeletePostButton"; // <-- Import new component
import { Button } from "../ui/Button";

interface Props {
  posts: PlainPost[];
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
            <div
              key={post.slug}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium hover:underline"
                >
                  {post.title}
                </Link>
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
              </div>
              <div className="ml-4 flex gap-2">
                {/* --- EDIT BUTTON --- */}
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/edit/${post._id}`}>
                    <PencilIcon className="size-4" />
                  </Link>
                </Button>
                {/* --- DELETE BUTTON --- */}
                <DeletePostButton postId={post._id} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        )}
      </CardContent>
    </Card>
  );
}