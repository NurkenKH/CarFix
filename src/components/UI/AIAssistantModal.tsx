import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AIAssistantModal = ({ open, onOpenChange }: AIAssistantModalProps) => {
  const [language, setLanguage] = useState<"en" | "ru">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const placeholder = language === "en" 
    ? "Do you have any question about any car part?"
    : "У вас есть вопросы о каких-либо автозапчастях?";

  const sendButtonText = language === "en" ? "Send" : "Отправить";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({ 
              role: m.role, 
              content: m.content 
            })),
            language 
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(language === "en" 
            ? "Rate limit exceeded. Please try again later." 
            : "Превышен лимит запросов. Пожалуйста, попробуйте позже.");
        }
        if (response.status === 402) {
          throw new Error(language === "en" 
            ? "Payment required. Please add credits." 
            : "Требуется оплата. Пожалуйста, добавьте кредиты.");
        }
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let assistantMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMsg = newMessages[newMessages.length - 1];
                  
                  if (lastMsg?.role === "assistant") {
                    newMessages[newMessages.length - 1] = {
                      role: "assistant",
                      content: assistantMessage
                    };
                  } else {
                    newMessages.push({
                      role: "assistant",
                      content: assistantMessage
                    });
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip malformed JSON
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Error calling AI assistant:', error);
      toast({
        title: language === "en" ? "Error" : "Ошибка",
        description: error.message || (language === "en" 
          ? "Failed to get response from AI assistant" 
          : "Не удалось получить ответ от AI помощника"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col glass-panel border-border p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gradient-primary flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" />
              AI Assistant
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={language === "en" ? "default" : "outline"}
                onClick={() => setLanguage("en")}
                className="text-xs"
              >
                EN
              </Button>
              <Button
                size="sm"
                variant={language === "ru" ? "default" : "outline"}
                onClick={() => setLanguage("ru")}
                className="text-xs"
              >
                RU
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{placeholder}</p>
              </div>
            )}
            
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 pt-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1 bg-secondary/50 border-border"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};