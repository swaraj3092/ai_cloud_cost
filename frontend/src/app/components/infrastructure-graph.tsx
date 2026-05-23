import { Server, Database, Globe, Cpu } from "lucide-react";
import { motion } from "motion/react";

const nodes = [
  { id: 1, name: "prod-app-01", type: "server", status: "optimized", utilization: 78, x: 20, y: 30 },
  { id: 2, name: "prod-app-02", type: "server", status: "idle", utilization: 12, x: 45, y: 20 },
  { id: 3, name: "analytics-db", type: "database", status: "oversize", utilization: 35, x: 70, y: 35 },
  { id: 4, name: "cache-redis", type: "database", status: "optimized", utilization: 82, x: 45, y: 60 },
  { id: 5, name: "cdn-edge", type: "network", status: "optimized", utilization: 91, x: 80, y: 70 },
  { id: 6, name: "load-balancer", type: "network", status: "idle", utilization: 8, x: 15, y: 75 },
];

export function InfrastructureGraph() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimized":
        return "border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.4)]";
      case "idle":
        return "border-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.4)]";
      case "oversize":
        return "border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.4)]";
      default:
        return "border-slate-500";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "server":
        return Server;
      case "database":
        return Database;
      case "network":
        return Globe;
      default:
        return Cpu;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#EF4444]" />

      <div className="mb-6">
        <h3 className="text-xl text-white mb-1">Infrastructure Map</h3>
        <p className="text-slate-400">Real-time resource utilization heatmap</p>
      </div>

      <div className="relative h-80 bg-slate-900/50 rounded-xl border border-white/5 p-4">
        <svg className="absolute inset-0 w-full h-full">
          <line x1="20%" y1="30%" x2="45%" y2="20%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />
          <line x1="45%" y1="20%" x2="70%" y2="35%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />
          <line x1="70%" y1="35%" x2="45%" y2="60%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />
          <line x1="45%" y1="60%" x2="20%" y2="30%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />
          <line x1="45%" y1="60%" x2="80%" y2="70%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />
          <line x1="45%" y1="60%" x2="15%" y2="75%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" />
        </svg>

        {nodes.map((node, idx) => {
          const Icon = getIcon(node.type);
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", damping: 15 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              className={`absolute p-3 rounded-lg border-2 backdrop-blur-lg bg-slate-800/80 ${getStatusColor(node.status)} transition-all cursor-pointer`}
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <Icon className={`w-5 h-5 ${
                node.status === "optimized" ? "text-[#10B981]" :
                node.status === "idle" ? "text-[#EF4444]" :
                "text-[#F59E0B]"
              }`} />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-xs text-white">{node.name}</p>
                <p className="text-xs text-slate-400">{node.utilization}%</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-slate-400 text-sm">Optimized</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          <span className="text-slate-400 text-sm">Oversized</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <span className="text-slate-400 text-sm">Underutilized</span>
        </div>
      </div>
    </div>
  );
}
