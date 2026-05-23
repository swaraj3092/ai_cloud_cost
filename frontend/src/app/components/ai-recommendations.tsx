import { CheckCircle2, AlertTriangle, TrendingDown, Trash2, Server, Database } from "lucide-react";
import { motion } from "motion/react";

const recommendations = [
  {
    id: 1,
    title: "Terminate 3 Unattached EBS Volumes",
    resource: "us-east-1",
    savings: 430,
    impact: "high",
    icon: Database,
  },
  {
    id: 2,
    title: "Downsize Idle EC2 Instance",
    resource: "prod-app-server-01",
    savings: 820,
    impact: "medium",
    icon: Server,
  },
  {
    id: 3,
    title: "Remove Unused Load Balancer",
    resource: "legacy-lb-2023",
    savings: 275,
    impact: "low",
    icon: TrendingDown,
  },
  {
    id: 4,
    title: "Optimize RDS Instance Size",
    resource: "analytics-db",
    savings: 1240,
    impact: "high",
    icon: Database,
  },
];

export function AIRecommendations() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl text-white mb-1">AI Action Center</h3>
          <p className="text-slate-400">Autonomous optimization recommendations</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/30">
          <div className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
          <span className="text-[#6366F1] text-sm">AI Active</span>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-800/30 p-4 hover:bg-slate-800/50 transition-all duration-300 hover:border-[#6366F1]/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:translate-x-1"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20">
                <rec.icon className="w-5 h-5 text-[#6366F1]" />
              </div>

              <div className="flex-1">
                <h4 className="text-white mb-1">{rec.title}</h4>
                <p className="text-slate-400 text-sm mb-3">{rec.resource}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981] font-semibold">+${rec.savings}/mo</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className={`w-3.5 h-3.5 ${
                      rec.impact === "high" ? "text-[#EF4444]" :
                      rec.impact === "medium" ? "text-[#F59E0B]" : "text-[#10B981]"
                    }`} />
                    <span className="text-slate-400 text-sm capitalize">{rec.impact} impact</span>
                  </div>
                </div>
              </div>

              <button className="px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2 hover:scale-105 active:scale-95">
                <CheckCircle2 className="w-4 h-4" />
                Approve
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
