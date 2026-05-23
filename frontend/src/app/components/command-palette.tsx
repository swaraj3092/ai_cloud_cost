import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, LayoutDashboard, Zap, Activity, Cpu } from "lucide-react";
import { useKeyboardNav } from "../hooks/use-keyboard-nav";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Attach number hotkeys
  useKeyboardNav();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "AI Actions", path: "/ai-actions", icon: <Zap className="w-4 h-4" /> },
    { name: "Analytics", path: "/analytics", icon: <Activity className="w-4 h-4" /> },
    { name: "Infrastructure", path: "/infrastructure", icon: <Cpu className="w-4 h-4" /> },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-card/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-muted-foreground mr-3" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands... (e.g. 'Dashboard')"
                className="flex-1 bg-transparent border-none outline-none text-foreground text-lg placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/5 rounded text-xs text-muted-foreground font-mono border border-white/10">ESC</kbd>
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.path}
                    onClick={() => handleSelect(cmd.path)}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-left text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors focus:outline-none focus:bg-primary/20 focus:text-primary group"
                  >
                    <div className="mr-3 opacity-70 group-hover:opacity-100">{cmd.icon}</div>
                    <span>{cmd.name}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  No commands found for "{search}"
                </div>
              )}
            </div>
            
            <div className="bg-white/5 px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
              <span>Pro Tip: Use <kbd className="px-1 bg-white/10 rounded font-mono">1</kbd>, <kbd className="px-1 bg-white/10 rounded font-mono">2</kbd>, <kbd className="px-1 bg-white/10 rounded font-mono">3</kbd> to jump between tabs anytime.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
