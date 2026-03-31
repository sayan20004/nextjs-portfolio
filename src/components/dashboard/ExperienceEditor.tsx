"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/Card";
import { useTransition } from "react";
import { createExperience, updateExperience } from "@/lib/cms-actions";

export default function ExperienceEditor({ experienceToEdit }: { experienceToEdit?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditMode = !!experienceToEdit;

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: experienceToEdit?.name || "",
      href: experienceToEdit?.href || "",
      title: experienceToEdit?.title || "",
      logo: experienceToEdit?.logo || "",
      start: experienceToEdit?.start || "",
      end: experienceToEdit?.end || "",
      description: experienceToEdit?.description?.join("\n") || "",
      type: experienceToEdit?.type || "work",
      links: experienceToEdit?.links || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = (data: any) => {
    // Process description (one line = one array item)
    const formattedData = {
      ...data,
      description: data.description.split("\n").map((s: string) => s.trim()).filter(Boolean),
    };

    startTransition(async () => {
      try {
        if (isEditMode) {
          await updateExperience(experienceToEdit._id, formattedData);
          toast.success("Experience updated!");
          router.push("/dashboard/experience");
        } else {
          await createExperience(formattedData);
          toast.success("Experience created!");
          reset();
          router.push("/dashboard/experience");
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Company/School Name</label>
              <Input {...register("name", { required: true })} placeholder="Google, MIT, etc." />
            </div>
            <div>
              <label className="text-sm font-medium">Link</label>
              <Input {...register("href", { required: true })} placeholder="https://..." />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title/Degree</label>
              <Input {...register("title", { required: true })} placeholder="Software Engineer" />
            </div>
            <div>
              <label className="text-sm font-medium">Logo URL</label>
              <Input {...register("logo", { required: true })} placeholder="/logos/google.png or https://..." />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_100px]">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input {...register("start", { required: true })} placeholder="Jan 2020" />
            </div>
            <div>
              <label className="text-sm font-medium">End Date (optional)</label>
              <Input {...register("end")} placeholder="Present" />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                {...register("type", { required: true })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="work">Work</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Description (one bullet point per line)</label>
            <Textarea {...register("description")} placeholder="Developed new features...&#10;Mentored juniors..." rows={5} />
          </div>

          <div className="space-y-4 border-t pt-4">
            <label className="text-sm font-medium">Relevant Links</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input {...register(`links.${index}.name` as const, { required: true })} placeholder="Name" className="mb-2" />
                </div>
                <div className="flex-1">
                  <Input {...register(`links.${index}.href` as const, { required: true })} placeholder="URL" className="mb-2" />
                </div>
                <div className="flex-1">
                  <Input {...register(`links.${index}.icon` as const, { required: true })} placeholder="Icon string" className="mb-2" />
                </div>
                <Button type="button" variant="destructive" onClick={() => remove(index)} className="mb-2">Remove</Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ name: "", href: "", icon: "" })}>
              Add Link
            </Button>
          </div>

          <Button type="submit" disabled={isPending} className="mt-4">
            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
            {isEditMode ? "Update Experience" : "Create Experience"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
