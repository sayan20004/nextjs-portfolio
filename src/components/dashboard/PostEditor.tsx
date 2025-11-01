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
import { type PlainPost } from "@/lib/models";
import { slugify } from "@/lib/utils";
import { useState } from "react";
import { UploadIcon } from "lucide-react";

const postSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  thumbnail: z.string().url("Must be a valid URL.").min(1, "Thumbnail is required."),
  content: z.string().min(10, "Content is too short."),
});
type PostInputs = z.infer<typeof postSchema>;

interface Props {
  postToEdit?: PlainPost;
}

export default function PostEditor({ postToEdit }: Props) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  // Check if we are in edit mode
  const isEditMode = !!postToEdit;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue, // We'll use this to set the thumbnail URL
    formState: { errors, isSubmitting },
  } = useForm<PostInputs>({
    resolver: zodResolver(postSchema),
    // Set default values if in edit mode
    defaultValues: {
      title: postToEdit?.title || "",
      description: postToEdit?.description || "",
      thumbnail: postToEdit?.thumbnail || "",
      content: postToEdit?.content || "",
    },
  });

  const title = watch("title");
  const slug = title ? slugify(title) : "";

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    toast.info("Uploading image...");

    try {
      const res = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!res.ok) throw new Error("Upload failed");

      const blob = await res.json();
      setValue("thumbnail", blob.url, { shouldValidate: true });
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    try {
      let res;
      if (isEditMode) {
        // --- UPDATE (PUT) ---
        res = await fetch(`/api/posts/manage/${postToEdit._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, slug }),
        });
      } else {
        // --- CREATE (POST) ---
        res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, slug }),
        });
      }

      if (!res.ok) throw new Error("Failed to save post");

      toast.success(
        isEditMode ? "Post updated successfully!" : "Post created successfully!"
      );

      if (isEditMode) {
        router.push("/dashboard"); // Go back to dashboard
      } else {
        reset(); // Clear form on create
      }
      
      router.refresh(); // Refresh dashboard data
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  const isLoading = isSubmitting || isUploading;

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
          
          {/* --- MODIFIED THUMBNAIL SECTION --- */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                id="thumbnail"
                placeholder="Thumbnail Image URL"
                {...register("thumbnail")}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                asChild
                className="relative cursor-pointer"
              >
                <div>
                  <UploadIcon className="mr-2 size-4" />
                  Upload
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                    disabled={isLoading}
                  />
                </div>
              </Button>
            </div>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 animate-spin" />}
            {isEditMode ? "Update Post" : "Publish Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}