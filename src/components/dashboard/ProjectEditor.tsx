"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/Card";
import { useState, useTransition } from "react";
import { createProject, updateProject } from "@/lib/cms-actions";

export default function ProjectEditor({ projectToEdit }: { projectToEdit?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(projectToEdit?.image || "");
  const isEditMode = !!projectToEdit;

  const { register, control, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      name: projectToEdit?.name || "",
      description: projectToEdit?.description || "",
      href: projectToEdit?.href || "",
      image: projectToEdit?.image || "",
      tags: projectToEdit?.tags?.join(", ") || "",
      links: projectToEdit?.links || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        const url = await uploadImage(file);
        setValue("image", url);
        toast.success("Image uploaded!");
      } catch (error) {
        // Error already shown
      }
    }
  };

  const onSubmit = (data: any) => {
    // Convert tags from comma-separated string to array
    const formattedData = {
      ...data,
      tags: data.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
    };

    startTransition(async () => {
      try {
        if (isEditMode) {
          await updateProject(projectToEdit._id, formattedData);
          toast.success("Project updated!");
          router.push("/dashboard/projects");
        } else {
          await createProject(formattedData);
          toast.success("Project created!");
          reset();
          router.push("/dashboard/projects");
        }
      } catch (error) {
        toast.error("An error occurred.");
      }
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input {...register("name", { required: true })} placeholder="Project Name" />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register("description", { required: true })} placeholder="Short Description" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Project URL</label>
              <Input {...register("href")} placeholder="https://..." />
            </div>
            <div>
              <label className="text-sm font-medium">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isUploading}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-secondary file:text-foreground
                  hover:file:bg-secondary/80
                  cursor-pointer"
              />
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <label className="text-sm font-medium block mb-2">Image Preview</label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Project preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium">Tags (comma separated)</label>
            <Input {...register("tags")} placeholder="React, Next.js, Tailwind" />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Links (e.g. GitHub, Website)</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input {...register(`links.${index}.name` as const, { required: true })} placeholder="Name (e.g. GitHub)" className="mb-2" />
                </div>
                <div className="flex-1">
                  <Input {...register(`links.${index}.href` as const, { required: true })} placeholder="URL" className="mb-2" />
                </div>
                <div className="flex-1">
                  <Input {...register(`links.${index}.icon` as const, { required: true })} placeholder="Icon (e.g. github)" className="mb-2" />
                </div>
                <Button type="button" variant="destructive" onClick={() => remove(index)} className="mb-2">Remove</Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ name: "", href: "", icon: "" })}>
              Add Link
            </Button>
          </div>

          <Button type="submit" disabled={isPending || isUploading} className="mt-4">
            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
            {isEditMode ? "Update Project" : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
