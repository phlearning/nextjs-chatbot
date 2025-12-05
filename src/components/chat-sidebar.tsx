"use client";

import { useChatStore } from "@/lib/hooks/use-chat-store";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Plus, Settings, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { ThemeToggle } from "./theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const { chats, activeChat, createChat, deleteChat, clearChats, setActiveChat, updateChatTitle } = useChatStore();

  // Helper function to close only on mobile
  const handleMobileClose = () => {
    if (window.innerWidth < 768) {
      onClose?.();
    }
  };

  const handleCreateChat = () => {
    createChat();
    toast.success("New chat created");
    handleMobileClose(); // Close sidebar only on mobile after creating chat
  };

  const handleDeleteChat = (id: string) => {
    deleteChat(id);
    toast.success("Chat deleted");
  };

  const handleClearChats = () => {
    clearChats();
    toast.success("All chats cleared");
    handleMobileClose(); // Close sidebar only on mobile after clearing chats
  };

  const handleEditTitle = (id: string, currentTitle: string) => {
    setEditingChatId(id);
    setNewTitle(currentTitle);
  };

  const handleSaveTitle = (id: string) => {
    if (newTitle.trim()) {
      updateChatTitle(id, newTitle.trim());
      toast.success("Chat title updated");
    }
    setEditingChatId(null);
    setNewTitle("");
  };

  return (
    <div className={`${
      isOpen ? "opacity-100 visible" : "opacity-0 invisible"
    } h-full border-r bg-card p-3 transition-opacity duration-300 md:p-4`}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-xl">Chats</h1>
        <Button variant="outline" size="icon" onClick={handleCreateChat}>
          <Plus className="size-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between rounded-lg p-2 ${
                activeChat === chat.id
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted/50"
              }`}
            >
              {editingChatId === chat.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveTitle(chat.id);
                  }}
                  className="flex-1 mr-2"
                >
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur={() => handleSaveTitle(chat.id)}
                    autoFocus
                  />
                </form>
              ) : (
                <button
                  className="flex-1 text-left truncate text-sm md:text-base"
                  onClick={() => {
                    setActiveChat(chat.id);
                    handleMobileClose(); // Close sidebar only on mobile after selecting chat
                  }}
                  onDoubleClick={() => handleEditTitle(chat.id, chat.title)}
                >
                  {chat.title}
                </button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => handleDeleteChat(chat.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="absolute bottom-3 left-3 flex w-[calc(100%-1.5rem)] items-center justify-between md:bottom-4 md:left-4 md:w-56">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleClearChats}>
              Clear all chats
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}