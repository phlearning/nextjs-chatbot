"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { ExternalLink } from "lucide-react";
import { useChatStore } from "@/lib/hooks/use-chat-store";

export function ApiKeyDialog() {
  const [open, setOpen] = useState(true);
  const apiKey = useChatStore((state) => state.apiKey);

  if (apiKey) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set up your Gemini API Key</DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            <p>
              To use this chat application, you need to set up a Gemini API key. Follow these steps:
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>
                Go to{" "}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 inline-flex items-center gap-1"
                >
                  Google AI Studio
                  <ExternalLink className="size-3" />
                </a>
              </li>
              <li>Creaet a new API key</li>
              <li>Copy your new API key</li>
              <li>Open the <code>.env</code> file in your project</li>
              <li>Replace <code>your_gemini_api_key_here</code> with your actual API key</li>
              <li>Restart the development server</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-4">
              Your API key will be used to interact with the Gemini AI model. Keep it secure and never share it publicly
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}