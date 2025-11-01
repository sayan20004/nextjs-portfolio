import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { BotIcon, UserIcon } from "lucide-react";

interface Props {
  message: Message;
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="size-8 border">
          <AvatarFallback>
            <BotIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-xs rounded-lg px-4 py-2 sm:max-w-md",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <Markdown className="prose prose-sm max-w-full text-pretty text-inherit dark:prose-invert prose-p:my-0 prose-headings:my-0">
          {message.content}
        </Markdown>
      </div>
      {isUser && (
        <Avatar className="size-8 border">
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}