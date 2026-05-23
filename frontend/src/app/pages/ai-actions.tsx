import { CheckCircle2, Clock, XCircle, TrendingDown, Zap, Server, Database, HardDrive } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { SuccessOverlay } from "../components/success-overlay";

const allRecommendations = [
  {
    id: 1,
    title: "Terminate 3 Unattached EBS Volumes",
    description: "These volumes have been detached for over 30 days with no activity",
    resource: "us-east-1 • vol-0a1b2c3d, vol-4e5f6g7h, vol-8i9j0k1l",
    savings: 430,
    impact: "high",
    status: "pending",
    icon: HardDrive,
    confidence: 98,
  },
  {
    id: 2,
    title: "Downsize Idle EC2 Instance",
    description: "CPU utilization under 5% for 14 days. Recommended: t3.medium → t3.small",
    resource: "prod-app-server-01 (i-0123456789abcdef)",
    savings: 820,
    impact: "medium",
    status: "pending",
    icon: Server,
    confidence: 94,
  },
  {
    id: 3,
    title: "Remove Unused Load Balancer",
    description: "No traffic detected in the last 60 days",
    resource: "legacy-lb-2023",
    savings: 275,
    impact: "low",
    status: "approved",
    icon: Server,
    confidence: 100,
  },
  {
    id: 4,
    title: "Optimize RDS Instance Size",
    description: "Database running at 30% capacity. Recommended: db.r5.2xlarge → db.r5.xlarge",
    resource: "analytics-db (PostgreSQL 14.2)",
    savings: 1240,
    impact: "high",
    status: "pending",
    icon: Database,
    confidence: 91,
  },
  {
    id: 5,
    title: "Enable S3 Intelligent-Tiering",
    description: "80% of objects haven't been accessed in 90+ days",
    resource: "backup-bucket-2024",
    savings: 680,
    impact: "medium",
    status: "pending",
    icon: HardDrive,
    confidence: 96,
  },
  {
    id: 6,
    title: "Consolidate NAT Gateways",
    description: "Multiple NAT gateways with low utilization can be consolidated",
    resource: "vpc-prod (3 NAT gateways)",
    savings: 540,
    impact: "medium",
    status: "rejected",
    icon: Server,
    confidence: 88,
  },
];

export function AIActions() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [recommendations, setRecommendations] = useState(allRecommendations);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({ savings: 0, title: "" });

  const filteredRecommendations = filter === "all"
    ? recommendations
    : recommendations.filter(rec => rec.status === filter);

  const handleApprove = (id: number) => {
    const rec = recommendations.find(r => r.id === id);
    if (rec) {
      setSuccessData({ savings: rec.savings, title: rec.title });
      setShowSuccess(true);
      setRecommendations(prev => prev.map(r =>
        r.id === id ? { ...r, status: "approved" as const } : r
      ));
    }
  };

  const handleReject = (id: number) => {
    setRecommendations(prev => prev.map(rec =>
      rec.id === id ? { ...rec, status: "rejected" as const } : rec
    ));
  };

  const totalSavings = filteredRecommendations
    .filter(r => r.status === "pending")
    .reduce((sum, rec) => sum + rec.savings, 0);

  const approvedSavings = recommendations
    .filter(r => r.status === "approved")
    .reduce((sum, rec) => sum + rec.savings, 0);

  return (
    <>
      <SuccessOverlay
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        savings={successData.savings}
        actionTitle={successData.title}
      />
      <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">AI Action Center</h1>
        <p className="text-slate-400">Review and approve autonomous optimization recommendations</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#6366F1]/20 to-transparent p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-[#6366F1]" />
            <span className="text-slate-400">Potential Savings</span>
          </div>
          <div className="text-3xl text-[#6366F1] font-semibold">${totalSavings.toLocaleString()}/mo</div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#10B981]/20 to-transparent p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            <span className="text-slate-400">Approved Actions</span>
          </div>
          <div className="text-3xl text-[#10B981] font-semibold">${approvedSavings.toLocaleString()}/mo</div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400">Pending Review</span>
          </div>
          <div className="text-3xl text-white font-semibold">
            {recommendations.filter(r => r.status === "pending").length}
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        {(["all", "pending", "approved", "rejected"] as const).map((status) => (
          <motion.button
            key={status}
            onClick={() => setFilter(status)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              filter === status
                ? "bg-[#6366F1] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                : "bg-slate-800/30 text-slate-400 hover:bg-slate-800/50 border border-white/10"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredRecommendations.map((rec, idx) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition-all duration-300 hover:border-[#6366F1]/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:scale-[1.01]"
          >
            <div className="flex items-start gap-6">
              <div className="mt-1 p-3 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20">
                <rec.icon className="w-6 h-6 text-[#6366F1]" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl text-white mb-2">{rec.title}</h3>
                    <p className="text-slate-400 mb-1">{rec.description}</p>
                    <p className="text-slate-500 text-sm">{rec.resource}</p>
                  </div>
                  {rec.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReject(rec.id)}
                        className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-[#EF4444]/20 text-slate-300 hover:text-[#EF4444] border border-white/10 hover:border-[#EF4444]/30 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(rec.id)}
                        className="px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2 hover:scale-105 active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </button>
                    </div>
                  )}
                  {rec.status === "approved" && (
                    <div className="px-4 py-2 rounded-lg bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Approved
                    </div>
                  )}
                  {rec.status === "rejected" && (
                    <div className="px-4 py-2 rounded-lg bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981] font-semibold">+${rec.savings}/mo</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      rec.impact === "high" ? "bg-[#EF4444]" :
                      rec.impact === "medium" ? "bg-[#F59E0B]" : "bg-[#10B981]"
                    }`} />
                    <span className="text-slate-400 text-sm capitalize">{rec.impact} impact</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#6366F1]" />
                    <span className="text-slate-400 text-sm">{rec.confidence}% confidence</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}
