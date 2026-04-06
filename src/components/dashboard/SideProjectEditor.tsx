"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function SideProjectEditor({ project }: { project?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<string[]>(project?.images || []);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      link: project?.link || "",
      usersOnline: project?.usersOnline || 0,
      showOnHomepage: project?.showOnHomepage !== false,
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.url || data.data?.url;
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("Failed to upload image");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        setImages([...images, url]);
        toast.success("Image uploaded!");
      } catch (error) {
        // Error already shown
      }
    }
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const onSubmit = async (data: any) => {
    try {
      // Combine form data with images
      const cleanedData = {
        ...data,
        images: images,
        usersOnline: Number(data.usersOnline),
      };

      startTransition(async () => {
        try {
          const url = project?.id
            ? `/api/side-projects/${project.id}`
            : "/api/side-projects";
          const method = project?.id ? "PUT" : "POST";

          const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cleanedData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save project");
          }

          toast.success(
            `Side project ${project?.id ? "updated" : "created"} successfully!`
          );
          router.refresh();
          if (!project?.id) {
            // Reset form on create
            router.push("/dashboard/side-projects");
          }
        } catch (error) {
          toast.error("Failed to save project.");
          console.error("Error:", error);
        }
      });
    } catch (error) {
      // Error already shown
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Project Title</label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="e.g., Snappy"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title?.message as string}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Brief description of your side project"
              rows={4}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description?.message as string}
              </p>
            )}
          </div>

          {/* Link */}
          <div>
            <label className="text-sm font-medium">Project Link (URL)</label>
            <Input
              {...register("link", {
                required: "Link is required",
                pattern: {
                  value:
                    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                  message: "Please enter a valid URL",
                },
              })}
              placeholder="https://example.com"
            />
            {errors.link && (
              <p className="text-xs text-red-500 mt-1">
                {errors.link?.message as string}
              </p>
            )}
          </div>

          {/* Users Online */}
          <div>
            <label className="text-sm font-medium">Users Online</label>
            <Input
              type="number"
              {...register("usersOnline", {
                valueAsNumber: true,
              })}
              placeholder="0"
              min="0"
            />
          </div>

          {/* Show on Homepage Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("showOnHomepage")}
              className="w-4 h-4 cursor-pointer"
            />
            <label className="text-sm font-medium cursor-pointer">
              Show on Homepage
            </label>
          </div>

          {/* Images Upload */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Project Images (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageAdd}
              disabled={isUploading}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-secondary file:text-foreground
                hover:file:bg-secondary/80
                cursor-pointer"
            />

            {/* Display uploaded images */}
            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-32 h-32 rounded-lg overflow-hidden border"
                  >
                    <img
                      src={img}
                      alt={`Project image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending || isUploading}
            className="w-full"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                {project?.id ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{project?.id ? "Update Project" : "Create Project"}</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
