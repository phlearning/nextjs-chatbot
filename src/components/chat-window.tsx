"use client";

import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { Button } from "./ui/button";
import { useChatStore } from "@/lib/hooks/use-chat-store";
import { useEffect, useRef } from "react";

interface ChatMessageProps {
  onCreateChat: () => void;
}

export function ChatWindow({ onCreateChat }: ChatMessageProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chats, activeChat } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  if (!activeChat) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No chat selected</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={onCreateChat}
          >
            Create your first chat
          </Button>
        </div>
      </div>
    );
  }

  const currentChat = chats.find((chat) => chat.id === activeChat);

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-4 p-4">
        {currentChat?.messages.map((message, index) => (
          <ChatMessage 
            key={index}
            message={message.content}
            isUser={message.isUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  )
}
