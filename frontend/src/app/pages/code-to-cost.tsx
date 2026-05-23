import { GitBranch, TrendingUp, AlertTriangle, Code, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const prImpact = [
  {
    pr: "#402",
    title: "Search API Update - Elasticsearch optimization",
    author: "@sarah-dev",
    team: "Backend",
    merged: "3 days ago",
    costImpact: 2840,
    trend: "up",
    description: "New search indexing added N+1 query pattern causing DB CPU to spike 40%",
    files: ["src/api/search.ts", "src/db/queries.ts"],
  },
  {
    pr: "#398",
    title: "Image processing pipeline v2",
    author: "@mike-ml",
    team: "Data Science",
    merged: "1 week ago",
    costImpact: -1240,
    trend: "down",
    description: "Migrated from Lambda to ECS Fargate Spot, reduced cold starts and costs",
    files: ["src/workers/image-processor.py"],
  },
  {
    pr: "#394",
    title: "Add Redis caching layer",
    author: "@alex-backend",
    team: "Backend",
    merged: "2 weeks ago",
    costImpact: -890,
    trend: "down",
    description: "Reduced database queries by 60%, lowered RDS CPU and IOPS costs",
    files: ["src/cache/redis.ts", "src/api/middleware.ts"],
  },
  {
    pr: "#387",
    title: "Enable debug logging in production",
    author: "@junior-dev",
    team: "Frontend",
    merged: "3 weeks ago",
    costImpact: 420,
    trend: "up",
    description: "Accidentally shipped verbose logging, CloudWatch costs increased 35%",
    files: ["src/utils/logger.ts"],
  },
];

const teamData = [
  { team: "Backend", cost: 12400, change: 18 },
  { team: "Data Science", cost: 8900, change: -12 },
  { team: "Frontend", cost: 3200, change: 5 },
  { team: "DevOps", cost: 2100, change: -8 },
];

export function CodeToCost() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl text-white mb-2">Code-to-Cost Mapping</h1>
        <p className="text-slate-400">Track which code changes impact your cloud bill</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="w-5 h-5 text-[#6366F1]" />
            <span className="text-slate-400 text-sm">PRs This Month</span>
          </div>
          <div className="text-2xl text-white font-semibold">47</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#EF4444]/20 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#EF4444]" />
            <span className="text-slate-400 text-sm">Cost Increases</span>
          </div>
          <div className="text-2xl text-[#EF4444] font-semibold">+$3,260</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#10B981]/20 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#10B981] rotate-180" />
            <span className="text-slate-400 text-sm">Cost Reductions</span>
          </div>
          <div className="text-2xl text-[#10B981] font-semibold">-$2,130</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 text-sm">Net Impact</span>
          </div>
          <div className="text-2xl text-[#EF4444] font-semibold">+$1,130</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6 mb-8"
      >
        <div className="mb-6">
          <h3 className="text-xl text-white mb-1">Cost Impact by Team</h3>
          <p className="text-slate-400">Monthly infrastructure costs per engineering team</p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={teamData} id="team-cost-chart">
            <CartesianGrid key="grid-c2c" strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis key="xaxis-c2c" dataKey="team" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
            <YAxis key="yaxis-c2c" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              key="tooltip-c2c"
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "0.75rem",
                color: "#E2E8F0",
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Bar key="bar-c2c" dataKey="cost" fill="#6366F1" name="Team Monthly Cost" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
        <div className="mb-6">
          <h3 className="text-xl text-white mb-1">Recent Pull Requests with Cost Impact</h3>
          <p className="text-slate-400">PRs that significantly affected cloud infrastructure costs</p>
        </div>

        <div className="space-y-4">
          {prImpact.map((pr, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                pr.trend === "up"
                  ? "bg-[#EF4444]/5 border-[#EF4444]/20 hover:border-[#EF4444]/40"
                  : "bg-[#10B981]/5 border-[#10B981]/20 hover:border-[#10B981]/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  pr.trend === "up" ? "bg-[#EF4444]/20" : "bg-[#10B981]/20"
                }`}>
                  <GitBranch className={`w-6 h-6 ${
                    pr.trend === "up" ? "text-[#EF4444]" : "text-[#10B981]"
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-slate-400 font-mono text-sm">{pr.pr}</span>
                    <h4 className="text-white font-semibold">{pr.title}</h4>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <span className="text-slate-400">by <span className="text-[#6366F1]">{pr.author}</span></span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">Team: {pr.team}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{pr.merged}</span>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-lg mb-3 ${
                    pr.trend === "up" ? "bg-[#EF4444]/10" : "bg-[#10B981]/10"
                  }`}>
                    <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                      pr.trend === "up" ? "text-[#EF4444]" : "text-[#10B981]"
                    }`} />
                    <p className="text-slate-300 text-sm">{pr.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-slate-400" />
                      <div className="flex gap-2">
                        {pr.files.map((file, i) => (
                          <span key={i} className="text-xs text-slate-400 font-mono bg-slate-800/50 px-2 py-1 rounded">
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`text-xl font-bold ${
                      pr.trend === "up" ? "text-[#EF4444]" : "text-[#10B981]"
                    }`}>
                      {pr.trend === "up" ? "+" : ""}${Math.abs(pr.costImpact).toLocaleString()}/mo
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
