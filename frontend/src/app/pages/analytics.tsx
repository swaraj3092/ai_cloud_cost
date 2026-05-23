import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";
import { motion } from "motion/react";

const monthlyData = [
  { month: "Jan", compute: 12400, storage: 3200, network: 2100, database: 5300 },
  { month: "Feb", compute: 13800, storage: 3400, network: 2300, database: 5600 },
  { month: "Mar", compute: 11900, storage: 3100, network: 2000, database: 5100 },
  { month: "Apr", compute: 15200, storage: 3600, network: 2500, database: 5900 },
  { month: "May", compute: 16800, storage: 3800, network: 2700, database: 6200 },
  { month: "Jun", compute: 18100, storage: 4100, network: 2900, database: 6500 },
];

const serviceData = [
  { name: "EC2", value: 14200, color: "#6366F1" },
  { name: "RDS", value: 8900, color: "#10B981" },
  { name: "S3", value: 4100, color: "#F59E0B" },
  { name: "Lambda", value: 3200, color: "#EF4444" },
  { name: "CloudFront", value: 2800, color: "#8B5CF6" },
  { name: "Other", value: 1700, color: "#94A3B8" },
];

const utilizationTrend = [
  { hour: "00:00", cpu: 23, memory: 45, network: 12 },
  { hour: "04:00", cpu: 18, memory: 42, network: 8 },
  { hour: "08:00", cpu: 67, memory: 78, network: 45 },
  { hour: "12:00", cpu: 89, memory: 85, network: 62 },
  { hour: "16:00", cpu: 92, memory: 88, network: 71 },
  { hour: "20:00", cpu: 71, memory: 72, network: 53 },
  { hour: "23:59", cpu: 34, memory: 51, network: 21 },
];

export function Analytics() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl text-white mb-2">Analytics & Insights</h1>
        <p className="text-slate-400">Deep dive into your cloud spending patterns</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-6 mb-8"
      >
        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-[#6366F1]" />
            <span className="text-slate-400 text-sm">Avg Utilization</span>
          </div>
          <div className="text-2xl text-white font-semibold">68.4%</div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-[#10B981]" />
            <span className="text-[#10B981] text-sm">+5.2%</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#10B981]" />
            <span className="text-slate-400 text-sm">Cost per GB</span>
          </div>
          <div className="text-2xl text-white font-semibold">$0.084</div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3 text-[#10B981]" />
            <span className="text-[#10B981] text-sm">-12%</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-slate-400 text-sm">Peak Hours</span>
          </div>
          <div className="text-2xl text-white font-semibold">12-6 PM</div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-slate-400 text-sm">Daily avg</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-[#EF4444]" />
            <span className="text-slate-400 text-sm">Idle Resources</span>
          </div>
          <div className="text-2xl text-white font-semibold">14</div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3 text-[#10B981]" />
            <span className="text-[#10B981] text-sm">-6 vs last week</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-6 mb-8"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
          <div className="mb-6">
            <h3 className="text-xl text-white mb-1">Cost Breakdown by Service</h3>
            <p className="text-slate-400">Monthly spending distribution</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} id="cost-breakdown-chart">
              <CartesianGrid key="grid-1" strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis key="xaxis-1" dataKey="month" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
              <YAxis key="yaxis-1" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                key="tooltip-1"
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "0.75rem",
                  color: "#E2E8F0",
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend key="legend-1" wrapperStyle={{ color: "#E2E8F0" }} />
              <Bar key="compute-bar" dataKey="compute" stackId="a" fill="#6366F1" name="Compute Costs" />
              <Bar key="database-bar" dataKey="database" stackId="a" fill="#10B981" name="Database Costs" />
              <Bar key="storage-bar" dataKey="storage" stackId="a" fill="#F59E0B" name="Storage Costs" />
              <Bar key="network-bar" dataKey="network" stackId="a" fill="#8B5CF6" name="Network Costs" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
          <div className="mb-6">
            <h3 className="text-xl text-white mb-1">Service Distribution</h3>
            <p className="text-slate-400">Current month spending by AWS service</p>
          </div>

          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart id="service-distribution-chart">
                <Pie
                  key="service-pie"
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={false}
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  key="tooltip-2"
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    borderRadius: "0.75rem",
                    color: "#E2E8F0",
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 space-y-3">
              {serviceData.map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                    <span className="text-slate-300">{service.name}</span>
                  </div>
                  <span className="text-white font-semibold">${service.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6"
      >
        <div className="mb-6">
          <h3 className="text-xl text-white mb-1">24-Hour Utilization Trend</h3>
          <p className="text-slate-400">Real-time resource usage patterns</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={utilizationTrend} id="utilization-trend-chart">
            <CartesianGrid key="grid-3" strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis key="xaxis-3" dataKey="hour" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
            <YAxis key="yaxis-3" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              key="tooltip-3"
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "0.75rem",
                color: "#E2E8F0",
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Legend key="legend-3" wrapperStyle={{ color: "#E2E8F0" }} />
            <Line key="cpu-line" type="monotone" dataKey="cpu" stroke="#6366F1" strokeWidth={3} dot={{ fill: "#6366F1", r: 4 }} name="CPU Utilization" />
            <Line key="memory-line" type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", r: 4 }} name="Memory Utilization" />
            <Line key="network-line" type="monotone" dataKey="network" stroke="#F59E0B" strokeWidth={3} dot={{ fill: "#F59E0B", r: 4 }} name="Network Usage" />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6366F1]" />
            <span className="text-slate-400">CPU</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-slate-400">Memory</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="text-slate-400">Network</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
