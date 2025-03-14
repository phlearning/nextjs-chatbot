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
  const { activeChat, addMessage, apiKey, createChat, chats } = useChatStore();

  const handleSubmit = async (message: string) => {
    if (!apiKey) {
      addMessage(activeChat!, {
        content: "To use this chat, you need to set up your Gemini API key. You can get one by:\n\n" +
                "1. Going to Google AI Studio (https://makersuite.google.com/app/apikey)\n" +
                "2. Creating a new API key\n" +
                "3. Opening the `.env` file in your project\n" +
                "4. Replacing `your_gemini_api_key_here` with your actual API key\n" +
                "5. Restarting the development server\n\n" +
                "Once you've set up your API key, you can start chatting!",
        isUser: false,
      });
      return;
    }

    addMessage(activeChat!, { content: message, isUser: true });
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to get eresponse");

      const data = await response.json();
      addMessage(activeChat!, { content: data.response, isUser: false });
    } catch (error) {
      console.error("Error: ", error);
      addMessage(activeChat!, {
        content: "Error. Please check your API key and try again",
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
