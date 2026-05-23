import { MessageSquare, Bell, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "motion/react";

const slackMessages = [
  {
    time: "2 hours ago",
    channel: "#backend-team",
    message: "🚨 Hey @backend-team, a massive GPU instance (p3.8xlarge) was left running idle overnight. I went ahead and paused it.",
    action: "Paused instance i-0abc123",
    savings: 1240,
    status: "auto",
  },
  {
    time: "5 hours ago",
    channel: "#devops",
    message: "💰 Found 3 unattached EBS volumes in us-east-1 that have been idle for 30+ days. Should I delete them?",
    action: "Awaiting approval",
    savings: 430,
    status: "pending",
  },
  {
    time: "Yesterday",
    channel: "#data-science",
    message: "⚡ Your Redshift cluster has been at 15% CPU utilization for the past week. I can downsize it to save costs.",
    action: "Click to approve",
    savings: 2840,
    status: "pending",
  },
];

export function SlackIntegration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30">
          <MessageSquare className="w-6 h-6 text-[#6366F1]" />
        </div>
        <div>
          <h3 className="text-xl text-white">Slack Integration</h3>
          <p className="text-slate-400 text-sm">AI alerts delivered directly to your team</p>
        </div>
      </div>

      <div className="space-y-3">
        {slackMessages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-xl bg-slate-900/50 border border-white/10 hover:bg-slate-900/70 transition-all duration-300"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded bg-[#6366F1] flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#6366F1] font-semibold">{msg.channel}</span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-slate-500 text-xs">{msg.time}</span>
                </div>
                <p className="text-white text-sm mb-2">{msg.message}</p>
                <div className="flex items-center gap-4">
                  <div className="text-[#10B981] text-sm font-semibold">
                    Save ${msg.savings}/mo
                  </div>
                  {msg.status === "auto" && (
                    <div className="flex items-center gap-1 text-[#10B981] text-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      Auto-executed
                    </div>
                  )}
                  {msg.status === "pending" && (
                    <button className="px-3 py-1 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/30 text-[#6366F1] text-xs hover:bg-[#6366F1]/30 transition-all duration-300 hover:scale-105">
                      Approve in Slack →
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="ml-13 p-3 rounded-lg bg-slate-800/50 border border-white/5">
              <div className="text-slate-400 text-xs mb-1">Action Taken:</div>
              <div className="text-white text-sm">{msg.action}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20">
        <div className="flex items-center justify-between">
          <div className="text-slate-300 text-sm">
            Connected to <span className="text-[#6366F1] font-semibold">#backend-team</span>, <span className="text-[#6366F1] font-semibold">#devops</span>, <span className="text-[#6366F1] font-semibold">#data-science</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white text-sm transition-all duration-300 hover:scale-105">
            Configure Channels
          </button>
        </div>
      </div>
    </motion.div>
  );
}
