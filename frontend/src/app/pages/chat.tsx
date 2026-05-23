import { ChatInterface } from "../components/chat-interface";
import { Bot, Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function Chat() {
  return (
    <div className="absolute inset-0 p-8 flex flex-col">
      <div className="mb-4 shrink-0">
        <h1 className="text-3xl text-white mb-1">Ask the AI Agent</h1>
        <p className="text-slate-400 text-sm">Get instant insights about your cloud infrastructure</p>
      </div>

      {/* Restored Top Cards */}
      <div className="grid grid-cols-3 gap-4 mb-4 shrink-0">
        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#6366F1]/20 to-transparent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-[#6366F1]" />
            <span className="text-white font-medium text-sm">AI Assistant</span>
          </div>
          <p className="text-slate-400 text-xs">
            Ask questions about spending patterns, resource utilization, or optimization opportunities
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#10B981]/20 to-transparent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span className="text-white font-medium text-sm">Smart Recommendations</span>
          </div>
          <p className="text-slate-400 text-xs">
            Get actionable suggestions with interactive charts and one-click optimization actions
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-white font-medium text-sm">Real-time Analysis</span>
          </div>
          <p className="text-slate-400 text-xs">
            Instant access to live infrastructure data and cost analytics
          </p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6 min-h-0 pb-4">
        <div className="col-span-2 flex flex-col min-h-0 h-full">
          <ChatInterface />
        </div>

        <div className="space-y-6 overflow-y-auto pr-2 min-h-0 h-full">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#6366F1]" />
              Suggested Questions
            </h3>
            <div className="space-y-3">
              {[
                "Why did our bill spike on Tuesday?",
                "Which resources are underutilized?",
                "Show me our top 5 cost drivers",
                "What's our average daily spend?",
                "Predict next month's costs",
                "Which region costs the most?",
              ].map((question, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-3 rounded-lg bg-slate-800/30 border border-white/10 text-slate-300 hover:bg-slate-800/50 hover:border-[#6366F1]/30 hover:text-white transition-all duration-300 text-sm"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#6366F1]/30 backdrop-blur-xl bg-gradient-to-br from-[#6366F1]/10 to-transparent p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-[#6366F1]" />
              <h3 className="text-white">Pro Tip</h3>
            </div>
            <p className="text-slate-300 text-sm">
              The AI evaluates your live metrics to provide pinpoint accuracy on your current spending. Ask it about anomalies!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
