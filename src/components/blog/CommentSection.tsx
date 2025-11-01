"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { IComment } from "@/lib/models";
import { formatDate } from "@/lib/utils";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  slug: string;
}

const commentSchema = z.object({
  body: z.string().min(1, "Comment can't be empty."),
});
type CommentInputs = z.infer<typeof commentSchema>;

export default function CommentSection({ slug }: Props) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentInputs>({
    resolver: zodResolver(commentSchema),
  });

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/posts/${slug}/comments`);
      const data = await res.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      toast.error("Failed to load comments.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const onSubmit: SubmitHandler<CommentInputs> = async (data) => {
    try {
      const res = await fetch(`/api/posts/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();
      setComments([newComment.data, ...comments]); // Add new comment to the top
      toast.success("Comment posted!");
      reset();
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="title text-3xl">Comments</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Textarea
          id="body"
          placeholder="Leave a comment... (posts as Anonymous)"
          rows={3}
          className="resize-none"
          {...register("body")}
        />
        {errors.body && (
          <p className="input-error">{errors.body.message}</p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <ReloadIcon className="mr-2 animate-spin" />
          ) : (
            <PaperPlaneIcon className="mr-2" />
          )}
          Post Comment
        </Button>
      </form>

      {/* Comment List */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p>Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={String(comment._id)} className="flex gap-3">
              <Avatar className="size-8">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-lg border bg-muted/50 px-4 py-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Anonymous</span>
                  <span className="text-muted-foreground">
                    {formatDate(new Date(comment.createdAt).toISOString())}
                  </span>
                </div>
                <p className="mt-2 text-sm">{comment.body}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Be the first to comment!</p>
        )}
      </div>
    </section>
  );
}