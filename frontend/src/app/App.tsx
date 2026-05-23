import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { Dashboard } from "./pages/dashboard";
import { AIActions } from "./pages/ai-actions";
import { Analytics } from "./pages/analytics";
import { Infrastructure } from "./pages/infrastructure";
import { Optimization } from "./pages/optimization";
import { WhatIfSimulator } from "./pages/what-if-simulator";
import { CodeToCost } from "./pages/code-to-cost";
import { Leaderboard } from "./pages/leaderboard";
import { Chat } from "./pages/chat";
import { Settings } from "./pages/settings";
import { MouseGlow } from "./components/mouse-glow";
import { CommandPalette } from "./components/command-palette";

export default function App() {
  return (
    <Router>
      <div className="size-full flex bg-background overflow-hidden relative">
        <MouseGlow />
        <CommandPalette />
        {/* Ambient Glows for Premium Vibe */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <Sidebar />

        <div className="flex-1 overflow-y-auto relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-actions" element={<AIActions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/optimization" element={<Optimization />} />
            <Route path="/what-if" element={<WhatIfSimulator />} />
            <Route path="/code-to-cost" element={<CodeToCost />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}