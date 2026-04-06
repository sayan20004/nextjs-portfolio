"use client";

import { Button } from "@/components/ui/Button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function DeleteSideProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/side-projects/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete project");
        }

        toast.success("Side project deleted successfully!");
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete project.");
        console.error("Delete error:", error);
      }
    });
  };

  return (
    <div>
      {!showConfirm ? (
        <Button
          onClick={() => setShowConfirm(true)}
          variant="destructive"
          size="sm"
        >
          Delete
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={handleDelete}
            disabled={isPending}
            variant="destructive"
            size="sm"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </Button>
          <Button
            onClick={() => setShowConfirm(false)}
            variant="outline"
            size="sm"
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
