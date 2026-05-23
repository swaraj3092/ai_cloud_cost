import { TrendingUp, Zap, DollarSign, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const baselineData = [
  { month: "Jun", cost: 34892 },
  { month: "Jul", cost: 36200 },
  { month: "Aug", cost: 38100 },
  { month: "Sep", cost: 39800 },
  { month: "Oct", cost: 41500 },
  { month: "Nov", cost: 43200 },
];

export function WhatIfSimulator() {
  const [trafficMultiplier, setTrafficMultiplier] = useState(1);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const projectedData = baselineData.map(item => ({
    ...item,
    projected: Math.round(item.cost * trafficMultiplier),
    optimized: Math.round(item.cost * trafficMultiplier * 0.72),
  }));

  const currentCost = projectedData[projectedData.length - 1].projected;
  const optimizedCost = projectedData[projectedData.length - 1].optimized;
  const potentialSavings = currentCost - optimizedCost;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTrafficMultiplier(value);
    setShowRecommendations(value > 1.5);
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl text-white mb-2">What-If Simulator</h1>
        <p className="text-slate-400">Predict future costs and get proactive recommendations</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#6366F1]" />
            <span className="text-slate-400 text-sm">Traffic Multiplier</span>
          </div>
          <div className="text-3xl text-[#6366F1] font-semibold">{trafficMultiplier}x</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#EF4444]/20 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#EF4444]" />
            <span className="text-slate-400 text-sm">Projected Cost</span>
          </div>
          <div className="text-3xl text-[#EF4444] font-semibold">${currentCost.toLocaleString()}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#10B981]/20 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-[#10B981]" />
            <span className="text-slate-400 text-sm">With AI Optimization</span>
          </div>
          <div className="text-3xl text-[#10B981] font-semibold">${optimizedCost.toLocaleString()}</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6 mb-8"
      >
        <div className="mb-6">
          <h3 className="text-xl text-white mb-4">Adjust Traffic Scenario</h3>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 text-sm min-w-[100px]">0.5x (50%)</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={trafficMultiplier}
              onChange={handleSliderChange}
              className="flex-1 h-3 bg-slate-700 rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${((trafficMultiplier - 0.5) / 2.5) * 100}%, #475569 ${((trafficMultiplier - 0.5) / 2.5) * 100}%, #475569 100%)`,
              }}
            />
            <span className="text-slate-400 text-sm min-w-[100px] text-right">3x (300%)</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={projectedData} id="what-if-projection-chart">
            <defs>
              <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="optimizedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid key="grid-whatif" strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis key="xaxis-whatif" dataKey="month" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
            <YAxis key="yaxis-whatif" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              key="tooltip-whatif"
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "0.75rem",
                color: "#E2E8F0",
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Area key="area-projected" type="monotone" dataKey="projected" stroke="#EF4444" strokeWidth={3} fill="url(#projectedGrad)" name="Projected Cost" />
            <Area key="area-optimized" type="monotone" dataKey="optimized" stroke="#10B981" strokeWidth={3} fill="url(#optimizedGrad)" name="AI-Optimized Cost" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {showRecommendations && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl border border-[#F59E0B]/30 backdrop-blur-xl bg-gradient-to-br from-[#F59E0B]/10 to-transparent p-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/30">
              <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="text-xl text-white mb-2">Proactive AI Recommendations</h3>
              <p className="text-slate-400">Based on {trafficMultiplier}x traffic increase scenario</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/30 border border-white/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">Switch to Reserved Instances NOW</h4>
                  <p className="text-slate-400 text-sm mb-2">
                    Lock in 1-year Reserved Instances for your core infrastructure before traffic spikes
                  </p>
                  <div className="text-[#10B981] font-semibold">Save $3,240/mo compared to On-Demand</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#6366F1] hover:bg-[#5558E3] text-white transition-all duration-300 hover:scale-105">
                  Apply
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/30 border border-white/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">Enable Auto-Scaling for Web Tier</h4>
                  <p className="text-slate-400 text-sm mb-2">
                    Configure horizontal scaling to handle traffic bursts efficiently
                  </p>
                  <div className="text-[#10B981] font-semibold">Prevent over-provisioning, save $1,820/mo</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#6366F1] hover:bg-[#5558E3] text-white transition-all duration-300 hover:scale-105">
                  Configure
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/30 border border-white/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">Implement CloudFront CDN Caching</h4>
                  <p className="text-slate-400 text-sm mb-2">
                    Reduce origin load by 60% and improve global response times
                  </p>
                  <div className="text-[#10B981] font-semibold">Save $2,100/mo on bandwidth and compute</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#6366F1] hover:bg-[#5558E3] text-white transition-all duration-300 hover:scale-105">
                  Enable
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold mb-1">Total Potential Savings</div>
                <div className="text-slate-400 text-sm">If you apply all recommendations now</div>
              </div>
              <div className="text-3xl font-bold text-[#10B981]">${potentialSavings.toLocaleString()}/mo</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
