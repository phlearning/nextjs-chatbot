import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Message {
  content: string;
  isUser: boolean;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface ChatStore {
  chats: Chat[];
  activeChat: string | null;
  apiKey: string | null;
  createChat: () => void;
  deleteChat: (id: string) => void;
  clearChats: () => void;
  setActiveChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  setApiKey: (key: string) => void;
  updateChatTitle: (id: string, title: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChat: null,
      apiKey: typeof window !== "undefined" ? 
              process.env.NEXT_PUBLIC_GEMINI_API_KEY || null : null,
      createChat: () => {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: `Chat ${get().chats.length + 1}`,
          messages: [],
          createdAt: new Date(),
        };
        set((state) => ({
          chats: [...state.chats, newChat],
          activeChat: newChat.id,
        }));
      },
      deleteChat: (id) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
          activeChat: state.activeChat === id ? null : state.activeChat,
        }));
      },
      clearChats: () => {
        set({ chats: [], activeChat: null });
      },
      setActiveChat: (id) => {
        set({activeChat: id});
      },
      addMessage: (chatId, message) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
          ),
        }));
      },
      setApiKey(key) {
        set({ apiKey: key });
      },
      updateChatTitle: (id, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === id ? { ...chat, title } : chat
          ),
        }));
      },
    }),
    {
      name: 'chat-store',
    }
  )
);
