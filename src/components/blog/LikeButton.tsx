"use client";

import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  slug: string;
  initialLikes: number;
}

export default function LikeButton({ slug, initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (liked || isLoading) return;

    setIsLoading(true);
    setLiked(true); // Optimistic UI update
    setLikes((prev) => prev + 1);

    try {
      const res = await fetch(`/api/posts/${slug}/like`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to like post");
      }

      const data = await res.json();
      setLikes(data.data.likes); // Sync with server
      toast.success("Thanks for the like!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
      setLiked(false); // Revert optimistic update on error
      setLikes((prev) => prev - 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={liked ? "default" : "outline"}
      size="icon"
      className="fixed bottom-24 right-6 z-50 h-16 w-16 rounded-full shadow-lg"
      onClick={handleLike}
      disabled={isLoading}
      aria-label="Like post"
    >
      <Heart
        className={`size-6 transition-all ${
          liked ? "fill-primary-foreground" : "fill-transparent"
        }`}
      />
    </Button>
  );
}