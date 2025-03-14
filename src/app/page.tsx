"use client";

import { ChatInput } from "@/components/chat-input";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatWindow } from "@/components/chat-window";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/lib/hooks/use-chat-store";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { activeChat, addMessage, createChat, chats } = useChatStore();

  const handleSubmit = async (message: string) => {
    if (!message.trim()) return;

    addMessage(activeChat!, { content: message, isUser: true });
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      addMessage(activeChat!, { content: data.response, isUser: false });
    } catch (error) {
      console.error("Error:", error);
      addMessage(activeChat!, {
        content: "Sorry, there was an error processing your request. Please try again later.",
        isUser: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } relative transition-all duration-300 ease-in-out`}
      >
        <ChatSidebar isOpen={isSidebarOpen} />
      </div>
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center border-b p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-2"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeft className="size-4" />
            )}
          </Button>
          <h2 className="text-lg font-medium">
            {activeChat
              ? chats.find((chat) => chat.id === activeChat)?.title
              : "No chat selected"}
          </h2>
        </div>

        <div className="flex-1 overflow-hidden">
          <ChatWindow onCreateChat={createChat} />
        </div>

        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
