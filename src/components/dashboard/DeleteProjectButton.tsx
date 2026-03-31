"use client";

import { Button } from "@/components/ui/Button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteProject } from "@/lib/cms-actions";

export default function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    startTransition(async () => {
      try {
        await deleteProject(id);
        toast.success("Project deleted.");
      } catch (error) {
        toast.error("Failed to delete project.");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete project"
    >
      <TrashIcon className="size-4" />
    </Button>
  );
}
