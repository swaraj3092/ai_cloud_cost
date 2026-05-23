import { useState, useRef, useEffect } from "react";
import { Send, Bot, TrendingUp, Loader2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from 'react-markdown';

const miniChartData = [
  { value: 45 },
  { value: 52 },
  { value: 48 },
  { value: 61 },
  { value: 58 },
  { value: 72 },
  { value: 68 },
];

export function ChatInterface() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your elite AI Cost Optimization Agent. I am connected directly to your live database. Ask me anything about your cloud spending!",
    }
  ]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered a network error. Is the backend running?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6 h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366F1] to-[#10B981]" />

      <div className="mb-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/30">
          <Bot className="w-5 h-5 text-[#6366F1]" />
        </div>
        <div>
          <h3 className="text-white">Ask the Agent</h3>
          <p className="text-slate-400 text-sm">Powered by Groq Llama 3</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        <AnimatePresence>
          {messages.map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-4 ${
                  message.role === "user"
                    ? "bg-[#6366F1] text-white"
                    : "bg-slate-800/50 border border-white/10 text-slate-200"
                }`}
              >
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4 flex items-center gap-3 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin text-[#6366F1]" />
                <span className="text-sm">Analyzing infrastructure data...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about spending, optimizations, or trends..."
          className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366F1] focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all"
        />
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#6366F1] hover:bg-[#5558E3] text-white transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
