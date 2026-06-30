"use client";

import { useChat } from "ai/react";
import { Message } from "ai";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    // Optional: Add an initial system greeting
    initialMessages: [
      {
        id: "welcome-msg",
        role: "assistant",
        content: "Hello! I am your Sales Copilot. How can I assist you with your deals today?",
      },
    ],
  });

  // Ref to automatically scroll to the bottom of the chat
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-4xl mx-auto shadow-lg border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-black dark:bg-zinc-950">
      
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Sales Copilot
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Ask questions, compare competitors, or generate proposals.
          </p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6 pb-4">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="w-8 h-8 border shadow-sm">
                  <AvatarFallback className="bg-blue-600 text-white">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {message.content}
              </div>

              {message.role === "user" && (
                <Avatar className="w-8 h-8 border shadow-sm">
                  <AvatarFallback className="bg-zinc-200 text-zinc-700">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {/* Invisible div to scroll to */}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 relative max-w-4xl mx-auto"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 rounded-full px-6 py-6 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600 shadow-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 rounded-full w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </Card>
  );
}
