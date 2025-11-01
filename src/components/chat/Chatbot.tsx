"use client";

import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
// Corrected React import
import React, { useRef, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { ChatIcon } from "./ChatIcon";
import { ChatMessage } from "./ChatMessage";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Chat Bubble Toggle */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        <ChatIcon isOpen={isOpen} />
      </Button>

      {/* Chat Window */}
      <Card
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md transform transition-all duration-300 ease-in-out",
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <CardHeader>
          <CardTitle>Saya-AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[50vh] flex-col">
          {/* Message List */}
          <div
            ref={chatContainerRef}
            className="flex-1 space-y-4 overflow-y-auto pr-2"
          >
            {messages.length > 0 ? (
              messages.map((m) => <ChatMessage key={m.id} message={m} />)
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                Ask me anything about Sayan!
              </p>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about projects, skills..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
            >
              <PaperPlaneIcon className="size-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}