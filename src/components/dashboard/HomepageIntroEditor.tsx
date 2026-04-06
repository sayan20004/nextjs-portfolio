"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { updateHomepageIntro } from "@/lib/cms-actions";

export default function HomepageIntroEditor({ intro }: { intro: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(intro?.photo || "/profile.jpg");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState<string>(intro?.cvLink ? intro.cvLink.split("/").pop() : "");
  const [isUploading, setIsUploading] = useState(false);

  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: intro?.name || "Your Name",
      title: intro?.title || "Your Title",
      tagline: intro?.tagline || "",
      photo: intro?.photo || "/profile.jpg",
      cvLink: intro?.cvLink || "",
      bio: intro?.bio || [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bio",
  });

  // Watch form values for preview
  const watchedValues = useWatch({ control });

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvFileName(file.name);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async (file: File): Promise<string> => {
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
      toast.error("Failed to upload file");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      console.log("Form data submitted:", data);
      // Upload photo if a new one was selected
      let photoUrl = data.photo;
      if (photoFile) {
        photoUrl = await uploadPhoto(photoFile);
      }

      // Upload CV if a new one was selected
      let cvUrl = data.cvLink;
      if (cvFile) {
        cvUrl = await uploadPhoto(cvFile);
      }

      const finalData = {
        ...data,
        photo: photoUrl,
        cvLink: cvUrl,
      };

      console.log("Final data to save:", finalData);

      startTransition(async () => {
        try {
          const result = await updateHomepageIntro(finalData);
          console.log("Save result:", result);
          toast.success("Homepage intro updated!");
          setPhotoFile(null);
          setCvFile(null);
          router.refresh();
        } catch (error) {
          toast.error("Failed to update intro.");
          console.error("Update error:", error);
        }
      });
    } catch (error) {
      // Error already shown by uploadPhoto
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Name & Title */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name?.message as string}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Title / Headline</label>
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="Full stack developer"
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title?.message as string}</p>}
            </div>
          </div>

          {/* Tagline & Photo */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Tagline (optional)</label>
              <Input
                {...register("tagline")}
                placeholder="A short description"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {photoFile && <p className="text-xs text-green-500 mt-1">✓ {photoFile.name}</p>}
            </div>
          </div>

          {/* Photo Preview */}
          {photoPreview && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Photo Preview</label>
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-muted-foreground/20">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* CV Link */}
          <div>
            <label className="text-sm font-medium">CV / Resume File (optional)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {cvFile && <p className="text-xs text-green-500 mt-1">✓ {cvFileName}</p>}
          </div>

          {/* Bio Bullet Points */}
          <div className="space-y-4 border-t pt-4">
            <label className="text-sm font-medium block">Bio / About Me (one bullet point per line)</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Textarea
                  {...register(`bio.${index}` as const)}
                  placeholder="Write a bullet point about yourself..."
                  className="flex-1"
                  rows={2}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="h-fit"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append("")}
            >
              Add Bullet Point
            </Button>
          </div>

          {/* Preview */}
          {watchedValues.bio && watchedValues.bio.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Preview</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full bg-slate-400 flex-shrink-0 flex items-center justify-center text-xs text-white overflow-hidden">
                    {photoPreview && photoPreview.startsWith("data:") ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      "Photo"
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{watchedValues.name || "Your Name"}</h2>
                    <p className="text-sm text-muted-foreground">
                      {watchedValues.title || "Your Title"}
                    </p>
                    {watchedValues.tagline && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {watchedValues.tagline}
                      </p>
                    )}
                    <ul className="text-sm mt-3 space-y-1">
                      {watchedValues.bio.map((point: string, idx: number) => (
                        <li key={idx} className="text-muted-foreground">
                          • {point || "(empty)"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" disabled={isPending || isUploading} className="mt-4">
            {(isPending || isUploading) && <ReloadIcon className="mr-2 animate-spin" />}
            {isUploading ? "Uploading..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
