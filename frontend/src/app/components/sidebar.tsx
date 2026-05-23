import { LayoutDashboard, Activity, Cpu, Settings, Zap, TrendingDown, MessageSquare, FlaskConical, GitBranch, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Zap, label: "AI Actions", path: "/ai-actions" },
    { icon: Activity, label: "Analytics", path: "/analytics" },
    { icon: Cpu, label: "Infrastructure", path: "/infrastructure" },
    { icon: TrendingDown, label: "Optimization", path: "/optimization" },
    { icon: FlaskConical, label: "What-If", path: "/what-if" },
    { icon: GitBranch, label: "Code-to-Cost", path: "/code-to-cost" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: MessageSquare, label: "Ask AI", path: "/chat" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-16 bg-sidebar border-r border-border flex flex-col items-center py-6 gap-6 overflow-y-auto">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0284C7] to-[#0ea5e9] flex items-center justify-center cursor-pointer"
      >
        <Zap className="w-6 h-6 text-white" />
      </motion.div>

      <div className="flex-1 flex flex-col gap-2 w-full px-2 overflow-y-auto hidden-scrollbar">
        {navItems.map((item, idx) => (
          <Link key={idx} to={item.path}>
            <motion.div
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(2,132,199,0.3)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <motion.div
                animate={location.pathname === item.path ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
        <span className="text-white text-xs">AI</span>
      </div>
    </div>
  );
}
