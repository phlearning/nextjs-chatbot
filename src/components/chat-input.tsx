"use client";

import { SendHorizonal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useChatStore } from "@/lib/hooks/use-chat-store";

interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const { activeChat } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !activeChat) return;

    const message = input.trim();
    setInput("");
    await onSubmit(message);
  };

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          placeholder={
            activeChat
              ? "Type your message..."
              : "Create a chat to start messaging"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading || !activeChat}
        />
        <Button type="submit" disabled={isLoading || !activeChat}>
          <SendHorizonal className="size-4" />
        </Button>
      </form>
    </div>
  );
}
