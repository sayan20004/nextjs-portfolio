"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/Card";
import { useTransition } from "react";
import { createSocial, updateSocial } from "@/lib/cms-actions";

export default function SocialEditor({ socialToEdit }: { socialToEdit?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditMode = !!socialToEdit;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: socialToEdit?.name || "",
      href: socialToEdit?.href || "",
      icon: socialToEdit?.icon || "",
      order: socialToEdit?.order || 0,
    },
  });

  const onSubmit = (data: any) => {
    startTransition(async () => {
      try {
        if (isEditMode) {
          await updateSocial(socialToEdit._id, data);
          toast.success("Social link updated!");
          router.push("/dashboard/socials");
        } else {
          await createSocial(data);
          toast.success("Social link created!");
          reset();
          router.push("/dashboard/socials");
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
              <label className="text-sm font-medium">Platform Name</label>
              <Input {...register("name", { required: true })} placeholder="Twitter, GitHub, etc." />
            </div>
            <div>
              <label className="text-sm font-medium">URL</label>
              <Input {...register("href", { required: true })} placeholder="https://..." />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Icon name (Lucide)</label>
              <Input {...register("icon", { required: true })} placeholder="twitter, github, linkedin" />
            </div>
            <div>
              <label className="text-sm font-medium">Display Order</label>
              <Input type="number" {...register("order", { valueAsNumber: true })} />
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="mt-4">
            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
            {isEditMode ? "Update Social Link" : "Create Social Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
