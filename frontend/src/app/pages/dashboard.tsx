import { DollarSign, TrendingDown, Sparkles } from "lucide-react";
import { MetricCard } from "../components/metric-card";
import { SpendingChart } from "../components/spending-chart";
import { AIRecommendations } from "../components/ai-recommendations";
import { InfrastructureGraph } from "../components/infrastructure-graph";
import { CarbonFootprint } from "../components/carbon-footprint";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface DashboardData {
  totalCost: number;
  potentialSavings: number;
  activeAnomalies: number;
  optimizedResources: number;
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL || '';
    fetch(`${API_BASE}/api/dashboard`)
      .then(res => res.json())
      .then((json: DashboardData) => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch dashboard data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl text-foreground font-semibold mb-2">Command Center</h1>
        <p className="text-muted-foreground">Real-time overview of your cloud infrastructure</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Cloud Spend"
          value={`$${data?.totalCost.toLocaleString() || '0'}`}
          change="-12.4%"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6" />}
          accentColor="purple"
          loading={loading}
        />
        <MetricCard
          title="AI-Detected Waste"
          value={`$${data?.potentialSavings.toLocaleString() || '0'}`}
          change="+3.2%"
          changeType="negative"
          icon={<TrendingDown className="w-6 h-6" />}
          accentColor="red"
          loading={loading}
        />
        <MetricCard
          title="Optimized Resources"
          value={`${data?.optimizedResources || 0}`}
          change="+28.7%"
          changeType="positive"
          icon={<Sparkles className="w-6 h-6" />}
          accentColor="green"
          loading={loading}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 grid grid-cols-3 gap-6"
      >
        <div className="col-span-2">
          <SpendingChart />
        </div>
        
        {/* Beautiful Empty State for Recent Anomalies */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-card/80 backdrop-blur-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl text-white mb-1">Recent Anomalies</h3>
            <p className="text-muted-foreground text-sm">Real-time threat & waste detection</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-xl bg-white/5">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-4 border border-[#10B981]/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <Sparkles className="w-8 h-8 text-[#10B981]" />
            </motion.div>
            <h4 className="text-foreground font-medium mb-1">All Systems Optimized</h4>
            <p className="text-muted-foreground text-sm">No new cost anomalies or infrastructure waste detected.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-6 mb-8"
      >
        <div className="col-span-2">
          <AIRecommendations />
        </div>
        <CarbonFootprint />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <InfrastructureGraph />
      </motion.div>
    </div>
  );
}
