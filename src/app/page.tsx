"use client";

import { ChatInput } from "@/components/chat-input";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatWindow } from "@/components/chat-window";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/lib/hooks/use-chat-store";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { activeChat, addMessage, createChat, chats } = useChatStore();

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      // On mobile (< 768px), close sidebar by default
      // On desktop (>= 768px), open sidebar by default
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();
    setIsMounted(true);

    // Optional: Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Conditionally render to avoid empty space */}
      {isMounted && isSidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 shrink-0 transition-transform duration-300 ease-in-out md:relative md:z-auto">
          <ChatSidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-w-0 max-w-full flex-1 flex-col overflow-hidden">
        <div className="flex w-full items-center border-b p-2 md:p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-2 shrink-0"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeft className="size-4" />
            )}
          </Button>
          <h2 className="min-w-0 truncate text-sm font-medium md:text-lg">
            {activeChat
              ? chats.find((chat) => chat.id === activeChat)?.title
              : "No chat selected"}
          </h2>
        </div>

        <div className="min-w-0 max-w-full flex-1 overflow-hidden">
          <ChatWindow onCreateChat={createChat} />
        </div>

        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
