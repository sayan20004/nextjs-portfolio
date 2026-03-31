"use client";

import { Button } from "@/components/ui/Button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteExperience } from "@/lib/cms-actions";

export default function DeleteExperienceButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this experience record?")) return;

    startTransition(async () => {
      try {
        await deleteExperience(id);
        toast.success("Experience deleted.");
      } catch (error) {
        toast.error("Failed to delete experience.");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete experience"
    >
      <TrashIcon className="size-4" />
    </Button>
  );
}
