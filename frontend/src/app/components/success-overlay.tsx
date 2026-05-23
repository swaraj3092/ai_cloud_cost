import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, TrendingDown, Sparkles } from "lucide-react";
import { useEffect } from "react";

interface SuccessOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  savings: number;
  actionTitle: string;
}

export function SuccessOverlay({ isVisible, onClose, savings, actionTitle }: SuccessOverlayProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative overflow-hidden rounded-3xl border-2 border-[#10B981]/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 shadow-[0_0_100px_rgba(16,185,129,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/20 via-transparent to-[#6366F1]/20" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 200 }}
              className="relative z-10 mb-6 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-[#10B981] blur-2xl"
                />
                <div className="relative rounded-full bg-[#10B981] p-6 shadow-[0_0_60px_rgba(16,185,129,0.8)]">
                  <CheckCircle2 className="w-16 h-16 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 text-3xl font-semibold text-white text-center mb-2"
            >
              Action Approved!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 text-slate-400 text-center mb-6 max-w-md"
            >
              {actionTitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", damping: 20 }}
              className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 border border-[#10B981]/30"
            >
              <TrendingDown className="w-6 h-6 text-[#10B981]" />
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", damping: 10 }}
                  className="text-3xl font-bold text-[#10B981]"
                >
                  ${savings.toLocaleString()}
                </motion.div>
                <div className="text-sm text-slate-400">saved per month</div>
              </div>
              <Sparkles className="w-6 h-6 text-[#10B981]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative z-10 mt-6 text-center text-sm text-slate-500"
            >
              Changes will be applied within 24 hours
            </motion.div>

            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={{
                  y: -300,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  delay: 0.5 + Math.random() * 0.5,
                  duration: 1.5 + Math.random(),
                  ease: "easeOut",
                }}
                className="absolute w-2 h-2 rounded-full bg-[#10B981]"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${50 + Math.random() * 30}%`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
