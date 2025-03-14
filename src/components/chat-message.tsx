import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex w-full items-start gap-4 p-4", isUser ? "bg-muted/50" : "bg-background"
      )}>
      <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div className="flex-1 space-y-2">
        <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
