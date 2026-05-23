import { Server, Database, Globe, HardDrive, Zap, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

const resources = [
  {
    id: 1,
    name: "prod-app-server-01",
    type: "EC2 Instance",
    region: "us-east-1",
    status: "healthy",
    utilization: 78,
    cost: 420,
    uptime: "99.98%",
    icon: Server,
  },
  {
    id: 2,
    name: "prod-app-server-02",
    type: "EC2 Instance",
    region: "us-east-1",
    status: "idle",
    utilization: 12,
    cost: 420,
    uptime: "99.99%",
    icon: Server,
  },
  {
    id: 3,
    name: "analytics-database",
    type: "RDS PostgreSQL",
    region: "us-east-1",
    status: "overprovisioned",
    utilization: 35,
    cost: 1240,
    uptime: "100%",
    icon: Database,
  },
  {
    id: 4,
    name: "cache-redis-cluster",
    type: "ElastiCache",
    region: "us-east-1",
    status: "healthy",
    utilization: 82,
    cost: 380,
    uptime: "99.97%",
    icon: Database,
  },
  {
    id: 5,
    name: "cdn-cloudfront",
    type: "CloudFront Distribution",
    region: "global",
    status: "healthy",
    utilization: 91,
    cost: 560,
    uptime: "100%",
    icon: Globe,
  },
  {
    id: 6,
    name: "backup-storage",
    type: "S3 Bucket",
    region: "us-west-2",
    status: "healthy",
    utilization: 64,
    cost: 180,
    uptime: "100%",
    icon: HardDrive,
  },
  {
    id: 7,
    name: "legacy-load-balancer",
    type: "Application Load Balancer",
    region: "us-east-1",
    status: "idle",
    utilization: 8,
    cost: 275,
    uptime: "99.95%",
    icon: Zap,
  },
  {
    id: 8,
    name: "logging-storage",
    type: "S3 Bucket",
    region: "us-east-1",
    status: "healthy",
    utilization: 71,
    cost: 95,
    uptime: "100%",
    icon: HardDrive,
  },
];

export function Infrastructure() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "healthy":
        return {
          color: "text-[#10B981]",
          bg: "bg-[#10B981]/10",
          border: "border-[#10B981]/30",
          icon: CheckCircle,
        };
      case "idle":
        return {
          color: "text-[#EF4444]",
          bg: "bg-[#EF4444]/10",
          border: "border-[#EF4444]/30",
          icon: AlertTriangle,
        };
      case "overprovisioned":
        return {
          color: "text-[#F59E0B]",
          bg: "bg-[#F59E0B]/10",
          border: "border-[#F59E0B]/30",
          icon: AlertTriangle,
        };
      default:
        return {
          color: "text-slate-400",
          bg: "bg-slate-800/30",
          border: "border-white/10",
          icon: Clock,
        };
    }
  };

  const healthyCount = resources.filter(r => r.status === "healthy").length;
  const issueCount = resources.filter(r => r.status !== "healthy").length;
  const totalCost = resources.reduce((sum, r) => sum + r.cost, 0);
  const avgUtilization = Math.round(resources.reduce((sum, r) => sum + r.utilization, 0) / resources.length);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Infrastructure Overview</h1>
        <p className="text-slate-400">Monitor and manage your cloud resources</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-5 h-5 text-[#6366F1]" />
            <span className="text-slate-400 text-sm">Total Resources</span>
          </div>
          <div className="text-2xl text-white font-semibold">{resources.length}</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#10B981]/20 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
            <span className="text-slate-400 text-sm">Healthy</span>
          </div>
          <div className="text-2xl text-[#10B981] font-semibold">{healthyCount}</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#EF4444]/20 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            <span className="text-slate-400 text-sm">Needs Attention</span>
          </div>
          <div className="text-2xl text-[#EF4444] font-semibold">{issueCount}</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-slate-400 text-sm">Monthly Cost</span>
          </div>
          <div className="text-2xl text-white font-semibold">${totalCost.toLocaleString()}</div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
        <div className="mb-6">
          <h3 className="text-xl text-white mb-1">Resource Inventory</h3>
          <p className="text-slate-400">Complete list of provisioned infrastructure</p>
        </div>

        <div className="space-y-3">
          {resources.map((resource, idx) => {
            const statusConfig = getStatusConfig(resource.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-800/30 p-5 hover:bg-slate-800/50 transition-all duration-300 hover:border-[#6366F1]/30 cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="p-3 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20">
                    <resource.icon className="w-6 h-6 text-[#6366F1]" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg text-white mb-1">{resource.name}</h4>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-400">{resource.type}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{resource.region}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Utilization</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              resource.utilization > 70
                                ? "bg-[#10B981]"
                                : resource.utilization > 30
                                ? "bg-[#F59E0B]"
                                : "bg-[#EF4444]"
                            }`}
                            style={{ width: `${resource.utilization}%` }}
                          />
                        </div>
                        <span className="text-white text-sm w-10">{resource.utilization}%</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-400 text-sm mb-1">Uptime</div>
                      <div className="text-white">{resource.uptime}</div>
                    </div>

                    <div>
                      <div className="text-slate-400 text-sm mb-1">Cost/mo</div>
                      <div className="text-white font-semibold">${resource.cost}</div>
                    </div>

                    <div className={`px-3 py-1.5 rounded-lg ${statusConfig.bg} border ${statusConfig.border} flex items-center gap-2`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                      <span className={`text-sm capitalize ${statusConfig.color}`}>{resource.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
