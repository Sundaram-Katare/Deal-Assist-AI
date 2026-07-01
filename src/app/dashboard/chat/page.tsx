"use client";

import { useChat } from "ai/react";
import { Message } from "ai";
import { Send, Bot, User, Loader2, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-msg",
        role: "assistant",
        content: "Hello! I am your Sales Copilot. How can I assist you with your deals today?",
      },
    ],
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Helper to trigger predefined prompts
  const triggerAction = (prompt: string) => {
    append({ role: "user", content: prompt });
  };

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
                    ? "bg-[#00c896] text-white rounded-br-none"
                    : "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {/* Check if the message is a tool invocation response */}
                {message.toolInvocations ? (
                  <div className="space-y-2">
                    {message.toolInvocations.map((tool) => (
                      <div key={tool.toolCallId} className="bg-black border border-zinc-800 p-4 rounded-lg">
                        <h4 className="font-bold text-[#00c896] mb-2 flex items-center gap-2">
                          <Zap size={16} /> {tool.toolName} Generated
                        </h4>
                        <pre className="text-xs text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                          {JSON.stringify(tool.args, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900/30 flex gap-2 overflow-x-auto no-scrollbar border-t border-zinc-100 dark:border-zinc-900">
        <Button variant="outline" size="sm" onClick={() => triggerAction("Generate a proposal for Acme Corp.")} className="text-xs rounded-full whitespace-nowrap">
          📄 Generate Proposal
        </Button>
        <Button variant="outline" size="sm" onClick={() => triggerAction("Compare us against Competitor X.")} className="text-xs rounded-full whitespace-nowrap">
          ⚔️ Compare Competitor
        </Button>
        <Button variant="outline" size="sm" onClick={() => triggerAction("Prepare a meeting brief for an upcoming demo with TechNova.")} className="text-xs rounded-full whitespace-nowrap">
          📅 Meeting Prep
        </Button>
        <Button variant="outline" size="sm" onClick={() => triggerAction("How do I handle the objection 'Your price is too high'?")} className="text-xs rounded-full whitespace-nowrap">
          🛡️ Handle Objection
        </Button>
      </div>

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
            className="flex-1 rounded-full px-6 py-6 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#00c896] shadow-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 rounded-full w-10 h-10 bg-[#00c896] hover:bg-[#00a87d] text-white shadow-md transition-all"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </Card>
  );
}
