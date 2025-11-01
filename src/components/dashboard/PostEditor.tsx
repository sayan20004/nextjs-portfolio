"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/Card";

// Slugify function
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const postSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  thumbnail: z.string().url("Must be a valid URL.").min(1, "Thumbnail is required."),
  content: z.string().min(10, "Content is too short."),
});
type PostInputs = z.infer<typeof postSchema>;

export default function PostEditor() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostInputs>({
    resolver: zodResolver(postSchema),
  });

  const title = watch("title");
  const slug = title ? slugify(title) : "";

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slug }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      toast.success("Post created successfully!");
      reset();
      router.refresh(); // Refresh server components to show new post in stats
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input id="title" placeholder="Post Title" {...register("title")} />
            {errors.title && (
              <p className="input-error">{errors.title.message}</p>
            )}
            {slug && (
              <p className="mt-1 text-xs text-muted-foreground">
                Slug: /blog/{slug}
              </p>
            )}
          </div>
          <div>
            <Input
              id="description"
              placeholder="Short Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="input-error">{errors.description.message}</p>
            )}
          </div>
          <div>
            <Input
              id="thumbnail"
              placeholder="Thumbnail Image URL (e.g., Unsplash)"
              {...register("thumbnail")}
            />
            {errors.thumbnail && (
              <p className="input-error">{errors.thumbnail.message}</p>
            )}
          </div>
          <div>
            <Textarea
              id="content"
              placeholder="Write your post content here (MDX supported)..."
              rows={15}
              {...register("content")}
            />
            {errors.content && (
              <p className="input-error">{errors.content.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <ReloadIcon className="mr-2 animate-spin" />}
            Publish Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}