import { Zap, Shield, Activity, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const trustLog = [
  { time: "2 hours ago", action: "Deleted 3 unattached EBS volumes in us-east-1", savings: 430, status: "success" },
  { time: "5 hours ago", action: "Released 2 unused Elastic IPs", savings: 73, status: "success" },
  { time: "Yesterday", action: "Enabled S3 Intelligent-Tiering on backup-bucket-2024", savings: 680, status: "success" },
  { time: "2 days ago", action: "Scheduled dev instances to stop at 6 PM", savings: 320, status: "success" },
];

export function AutoPilotToggle() {
  const [isAutoPilot, setIsAutoPilot] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl transition-all duration-500 ${
              isAutoPilot
                ? "bg-[#10B981]/20 border border-[#10B981]/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                : "bg-slate-800/50 border border-white/10"
            }`}>
              <Zap className={`w-6 h-6 transition-all duration-500 ${
                isAutoPilot ? "text-[#10B981]" : "text-slate-400"
              }`} />
            </div>
            <div>
              <h3 className="text-xl text-white">Auto-Pilot Mode</h3>
              <p className="text-slate-400 text-sm">AI handles low-risk optimizations automatically</p>
            </div>
          </div>

          <button
            onClick={() => setIsAutoPilot(!isAutoPilot)}
            className={`relative w-20 h-10 rounded-full transition-all duration-500 ${
              isAutoPilot
                ? "bg-gradient-to-r from-[#10B981] to-[#059669] shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                : "bg-slate-600"
            }`}
          >
            <motion.div
              animate={{
                x: isAutoPilot ? 42 : 4,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: isAutoPilot ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isAutoPilot ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <Shield className="w-5 h-5 text-slate-400" />
                )}
              </motion.div>
            </motion.div>
          </button>
        </div>

        <AnimatePresence>
          {isAutoPilot && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[#10B981] animate-pulse" />
                  <span className="text-[#10B981] font-semibold">Auto-Pilot Active</span>
                </div>
                <p className="text-slate-300 text-sm">
                  AI is actively monitoring your infrastructure and applying optimizations with &lt;$500/mo impact automatically.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <h4 className="text-white mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#6366F1]" />
          Trust Log
        </h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {trustLog.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-3 rounded-lg bg-slate-800/30 border border-white/10 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <div className="text-slate-400 text-xs mb-1">{log.time}</div>
                  <div className="text-white text-sm mb-1">{log.action}</div>
                  <div className="text-[#10B981] text-sm font-semibold">+${log.savings}/mo saved</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
