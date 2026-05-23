import { ArrowDown, ArrowUp, MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import { Skeleton } from "./skeleton";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  accentColor: "green" | "red" | "purple";
  loading?: boolean;
}

export function MetricCard({ title, value, change, changeType, icon, accentColor, loading = false }: MetricCardProps) {
  const accentBorders = {
    green: "border-[#10B981]/20 hover:border-[#10B981]/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    red: "border-[#EF4444]/20 hover:border-[#EF4444]/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]",
    purple: "border-[#0284C7]/20 hover:border-[#0284C7]/60 hover:shadow-[0_0_30px_rgba(2,132,199,0.25)]",
  };

  const iconColors = {
    green: "text-[#10B981]",
    red: "text-[#EF4444]",
    purple: "text-[#0284C7]",
  };

  const glowColors = {
    green: "shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-[#10B981]/10",
    red: "shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-[#EF4444]/10",
    purple: "shadow-[0_0_20px_rgba(2,132,199,0.15)] bg-[#0284C7]/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-card/80 backdrop-blur-2xl transition-all duration-300 ${accentBorders[accentColor]} p-6 cursor-pointer group shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]`}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Progressive Disclosure Action Button */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 pr-6">
          <span className="text-muted-foreground tracking-wide font-medium">{title}</span>
          <div className={`${iconColors[accentColor]} ${glowColors[accentColor]} rounded-lg p-2 transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
        </div>

        <div className="mb-2">
          {loading ? (
            <Skeleton className="h-10 w-32 mb-1" />
          ) : (
            <div className={`text-4xl font-semibold text-foreground tracking-tight`}>{value}</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {loading ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            <>
              {changeType === "positive" ? (
                <ArrowDown className="w-4 h-4 text-[#10B981]" />
              ) : changeType === "negative" ? (
                <ArrowUp className="w-4 h-4 text-[#EF4444]" />
              ) : null}
              <span className={`${changeType === "positive" ? "text-[#10B981]" : changeType === "negative" ? "text-[#EF4444]" : "text-muted-foreground"} font-medium`}>
                {change}
              </span>
              <span className="text-muted-foreground/70 text-sm">vs last month</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
