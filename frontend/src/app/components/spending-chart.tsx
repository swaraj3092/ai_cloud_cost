import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "motion/react";

const data = [
  { month: "Jan", projected: 28400, optimized: 20100 },
  { month: "Feb", projected: 31200, optimized: 21800 },
  { month: "Mar", projected: 29800, optimized: 20500 },
  { month: "Apr", projected: 33500, optimized: 22900 },
  { month: "May", projected: 36200, optimized: 24100 },
  { month: "Jun", projected: 38900, optimized: 25800 },
  { month: "Jul", projected: 42100, optimized: 27200 },
  { month: "Aug", projected: 44800, optimized: 28900 },
  { month: "Sep", projected: 47500, optimized: 30100 },
  { month: "Oct", projected: 51200, optimized: 31800 },
  { month: "Nov", projected: 54300, optimized: 33200 },
  { month: "Dec", projected: 58100, optimized: 34900 },
];

export function SpendingChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-card/80 backdrop-blur-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
    >
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366F1] via-[#10B981] to-[#6366F1]"
        style={{ backgroundSize: "200% 100%" }}
      />

      <div className="mb-6">
        <h3 className="text-xl text-white mb-1">Spending Trends</h3>
        <p className="text-slate-400">AI-optimized vs projected cloud costs</p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis
            dataKey="month"
            stroke="#94A3B8"
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            stroke="#94A3B8"
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "0.75rem",
              color: "#E2E8F0",
            }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend
            wrapperStyle={{ color: "#E2E8F0" }}
            formatter={(value, entry) => value === "projected" ? "Projected Spend" : "AI-Optimized Spend"}
          />
          <Area
            type="monotone"
            dataKey="projected"
            stroke="#EF4444"
            strokeWidth={3}
            fill="url(#projectedGradient)"
            name="projected"
          />
          <Area
            type="monotone"
            dataKey="optimized"
            stroke="#10B981"
            strokeWidth={3}
            fill="url(#optimizedGradient)"
            name="optimized"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
