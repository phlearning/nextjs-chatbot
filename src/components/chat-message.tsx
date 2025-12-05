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
      "flex w-full max-w-full items-start gap-2 p-3 md:gap-4 md:p-4", 
      isUser ? "bg-muted/50" : "bg-background"
      )}>
      <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow md:size-8">
        {isUser ? <User className="size-3 md:size-4" /> : <Bot className="size-3 md:size-4" />}
      </div>
      <div className="min-w-0 flex-1 break-words">
        <div className="prose prose-sm max-w-none break-words dark:prose-invert prose-p:leading-relaxed prose-p:break-words prose-pre:p-0 prose-pre:max-w-full prose-pre:overflow-x-auto prose-code:break-all prose-li:break-words md:prose-base">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
