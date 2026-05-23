import { TrendingDown, Calendar, DollarSign, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

const savingsHistory = [
  { week: "Week 1", savings: 1200, cumulative: 1200 },
  { week: "Week 2", savings: 1850, cumulative: 3050 },
  { week: "Week 3", savings: 2100, cumulative: 5150 },
  { week: "Week 4", savings: 1650, cumulative: 6800 },
  { week: "Week 5", savings: 2400, cumulative: 9200 },
  { week: "Week 6", savings: 1980, cumulative: 11180 },
  { week: "Week 7", savings: 2230, cumulative: 13410 },
  { week: "Week 8", savings: 1890, cumulative: 15300 },
];

const optimizations = [
  {
    date: "May 22, 2026",
    action: "Terminated 3 unattached EBS volumes in us-east-1",
    savings: 430,
    status: "completed",
  },
  {
    date: "May 21, 2026",
    action: "Enabled S3 Intelligent-Tiering on backup-bucket-2024",
    savings: 680,
    status: "completed",
  },
  {
    date: "May 20, 2026",
    action: "Downsized EC2 instance prod-app-server-02 (t3.large → t3.medium)",
    savings: 820,
    status: "completed",
  },
  {
    date: "May 18, 2026",
    action: "Removed unused Application Load Balancer legacy-lb-2023",
    savings: 275,
    status: "completed",
  },
  {
    date: "May 17, 2026",
    action: "Consolidated NAT Gateways in vpc-prod (3 → 1)",
    savings: 540,
    status: "completed",
  },
  {
    date: "May 15, 2026",
    action: "Optimized RDS instance analytics-db (db.r5.2xlarge → db.r5.xlarge)",
    savings: 1240,
    status: "completed",
  },
  {
    date: "May 14, 2026",
    action: "Scheduled EC2 instances for dev environment (9AM-6PM only)",
    savings: 920,
    status: "completed",
  },
  {
    date: "May 12, 2026",
    action: "Migrated infrequently accessed S3 data to Glacier",
    savings: 385,
    status: "completed",
  },
];

const upcomingOptimizations = [
  {
    date: "Scheduled: May 24",
    action: "Switch Reserved Instances to Savings Plans for better flexibility",
    savings: 1850,
    status: "scheduled",
  },
  {
    date: "Scheduled: May 25",
    action: "Enable Lambda SnapStart for cold start optimization",
    savings: 420,
    status: "scheduled",
  },
];

export function Optimization() {
  const totalSavings = savingsHistory[savingsHistory.length - 1].cumulative;
  const thisWeekSavings = savingsHistory[savingsHistory.length - 1].savings;
  const completedActions = optimizations.length;

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl text-white mb-2">Optimization Timeline</h1>
        <p className="text-slate-400">Track AI-driven cost savings over time</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#10B981]/20 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-[#10B981]" />
            <span className="text-slate-400 text-sm">Total Savings</span>
          </div>
          <div className="text-2xl text-[#10B981] font-semibold">${totalSavings.toLocaleString()}</div>
          <div className="text-slate-500 text-sm mt-1">Last 8 weeks</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#6366F1]/20 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-[#6366F1]" />
            <span className="text-slate-400 text-sm">This Week</span>
          </div>
          <div className="text-2xl text-[#6366F1] font-semibold">${thisWeekSavings.toLocaleString()}</div>
          <div className="text-slate-500 text-sm mt-1">+18% vs last week</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-slate-400 text-sm">Actions Completed</span>
          </div>
          <div className="text-2xl text-white font-semibold">{completedActions}</div>
          <div className="text-slate-500 text-sm mt-1">Last 30 days</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 text-sm">Avg per Action</span>
          </div>
          <div className="text-2xl text-white font-semibold">${Math.round(totalSavings / completedActions)}</div>
          <div className="text-slate-500 text-sm mt-1">Per optimization</div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6 mb-8">
        <div className="mb-6">
          <h3 className="text-xl text-white mb-1">Cumulative Savings Trend</h3>
          <p className="text-slate-400">Weekly savings accumulation over time</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={savingsHistory} id="cumulative-savings-chart">
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid key="grid-opt" strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis key="xaxis-opt" dataKey="week" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
            <YAxis key="yaxis-opt" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`} />
            <Tooltip
              key="tooltip-opt"
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "0.75rem",
                color: "#E2E8F0",
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Area
              key="area-opt"
              type="monotone"
              dataKey="cumulative"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#savingsGradient)"
              name="Cumulative Savings"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
          <div className="mb-6">
            <h3 className="text-xl text-white mb-1">Recent Optimizations</h3>
            <p className="text-slate-400">AI-executed cost reductions</p>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {optimizations.map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-4 rounded-xl bg-slate-800/30 border border-white/10 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                      <span className="text-slate-400 text-sm">{opt.date}</span>
                    </div>
                    <p className="text-white mb-2">{opt.action}</p>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[#10B981] font-semibold">${opt.savings}/mo saved</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
          <div className="mb-6">
            <h3 className="text-xl text-white mb-1">Upcoming Optimizations</h3>
            <p className="text-slate-400">Scheduled AI actions</p>
          </div>

          <div className="space-y-3">
            {upcomingOptimizations.map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-slate-800/30 border border-[#6366F1]/30 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#6366F1]" />
                      <span className="text-[#6366F1] text-sm">{opt.date}</span>
                    </div>
                    <p className="text-white mb-2">{opt.action}</p>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[#10B981] font-semibold">Est. ${opt.savings}/mo</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-6 p-6 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-[#6366F1]" />
                <h4 className="text-white">AI Optimization Engine</h4>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                The AI continuously monitors your infrastructure and automatically schedules optimization actions based on usage patterns and cost impact.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[#10B981] text-sm">Active and learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
