"use client";

import { Button } from "@/components/ui/Button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  postId: string;
}

export default function DeletePostButton({ postId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this post? This action is permanent."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/posts/manage/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      toast.success("Post deleted.");
      router.refresh(); // Refresh the dashboard page
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={isLoading}
      aria-label="Delete post"
    >
      <TrashIcon className="size-4" />
    </Button>
  );
}