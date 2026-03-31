"use client";

import { Button } from "@/components/ui/Button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteSocial } from "@/lib/cms-actions";

export default function DeleteSocialButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this social link?")) return;

    startTransition(async () => {
      try {
        await deleteSocial(id);
        toast.success("Social link deleted.");
      } catch (error) {
        toast.error("Failed to delete social link.");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete social link"
    >
      <TrashIcon className="size-4" />
    </Button>
  );
}
