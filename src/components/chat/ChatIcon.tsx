import { BotIcon, XIcon } from "lucide-react";
import React from "react";

interface Props {
  isOpen: boolean;
}

export function ChatIcon({ isOpen }: Props) {
  return (
    <div className="relative size-8">
      <BotIcon
        className={`absolute inset-0 size-8 transform transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      />
      <XIcon
        className={`absolute inset-0 size-8 transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
      <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
    </div>
  );
}