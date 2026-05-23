import { Leaf, Trees, Zap } from "lucide-react";
import { motion } from "motion/react";

export function CarbonFootprint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-[#10B981]/30 backdrop-blur-xl bg-gradient-to-br from-[#10B981]/20 to-transparent p-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#10B981]/20 to-transparent rounded-full blur-2xl"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#10B981]/20 border border-[#10B981]/30">
            <Leaf className="w-6 h-6 text-[#10B981]" />
          </div>
          <h3 className="text-xl text-white">Green Impact</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-slate-400 text-sm mb-1">CO₂ Saved</div>
            <div className="text-2xl font-semibold text-[#10B981]">2,840 kg</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm mb-1">Energy Saved</div>
            <div className="text-2xl font-semibold text-[#10B981]">4,200 kWh</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
          <Trees className="w-8 h-8 text-[#10B981]" />
          <div>
            <div className="text-white font-semibold">Equivalent to planting</div>
            <div className="text-2xl font-bold text-[#10B981]">127 trees</div>
            <div className="text-slate-400 text-sm">this month</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Carbon efficiency score</span>
            <span className="text-[#10B981] font-semibold">92/100</span>
          </div>
          <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-[#10B981] to-[#059669]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
