import { Bell, Shield, Zap, DollarSign, Clock, Mail, Smartphone } from "lucide-react";
import { useState } from "react";
import { AutoPilotToggle } from "../components/autopilot-toggle";
import { SlackIntegration } from "../components/slack-integration";

export function Settings() {
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [threshold, setThreshold] = useState(500);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure your AI optimization preferences</p>
      </div>

      <div className="space-y-6">
        <AutoPilotToggle />

        <SlackIntegration />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-[#6366F1]" />
            <h2 className="text-xl text-white">AI Optimization</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white mb-1">Autonomous Optimization</h4>
                <p className="text-slate-400 text-sm">Allow AI to automatically apply low-risk optimizations</p>
              </div>
              <button
                onClick={() => setAutoOptimize(!autoOptimize)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                  autoOptimize ? "bg-[#10B981]" : "bg-slate-600"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
                    autoOptimize ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-white mb-3">Approval Threshold</h4>
              <p className="text-slate-400 text-sm mb-4">
                Actions with potential savings below this amount will be auto-approved
              </p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${((threshold - 100) / 1900) * 100}%, #475569 ${((threshold - 100) / 1900) * 100}%, #475569 100%)`,
                  }}
                />
                <div className="w-24 px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white text-center">
                  ${threshold}/mo
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-white mb-3">Optimization Schedule</h4>
              <p className="text-slate-400 text-sm mb-4">When should AI analyze and optimize resources</p>
              <div className="grid grid-cols-2 gap-3">
                {["Continuous", "Daily at 2 AM", "Weekly (Sundays)", "Manual Only"].map((schedule) => (
                  <button
                    key={schedule}
                    className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 active:scale-95 ${
                      schedule === "Continuous"
                        ? "bg-[#6366F1]/20 border-[#6366F1]/30 text-[#6366F1]"
                        : "bg-slate-800/30 border-white/10 text-slate-400 hover:bg-slate-800/50"
                    }`}
                  >
                    {schedule}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-[#10B981]" />
            <h2 className="text-xl text-white">Notifications</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <h4 className="text-white mb-1">Email Notifications</h4>
                  <p className="text-slate-400 text-sm">Receive daily summaries and alerts via email</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  emailNotifications ? "bg-[#10B981]" : "bg-slate-600"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                    emailNotifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-slate-400" />
                <div>
                  <h4 className="text-white mb-1">Slack Integration</h4>
                  <p className="text-slate-400 text-sm">Send optimization alerts to Slack channel</p>
                </div>
              </div>
              <button
                onClick={() => setSlackNotifications(!slackNotifications)}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  slackNotifications ? "bg-[#10B981]" : "bg-slate-600"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                    slackNotifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-white mb-3">Alert Types</h4>
              <div className="space-y-3">
                {[
                  { label: "Cost anomalies detected", enabled: true },
                  { label: "New optimization opportunities", enabled: true },
                  { label: "Action approvals required", enabled: true },
                  { label: "Weekly savings summary", enabled: false },
                ].map((alert) => (
                  <label key={alert.label} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={alert.enabled}
                      className="w-5 h-5 rounded bg-slate-800/50 border border-white/10 text-[#6366F1] focus:ring-[#6366F1]"
                    />
                    <span className="text-slate-300">{alert.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-xl text-white">Budget Limits</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Monthly Budget</label>
                <input
                  type="text"
                  defaultValue="$50,000"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Alert at</label>
                <select className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-[#6366F1]">
                  <option>80% of budget</option>
                  <option>85% of budget</option>
                  <option>90% of budget</option>
                  <option>95% of budget</option>
                </select>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-[#EF4444]" />
              <h2 className="text-xl text-white">AWS Credentials</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Access Key ID</label>
                <input
                  type="password"
                  defaultValue="AKIAIOSFODNN7EXAMPLE"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Secret Access Key</label>
                <input
                  type="password"
                  defaultValue="••••••••••••••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>
              <button className="w-full px-4 py-2 rounded-lg bg-[#6366F1] hover:bg-[#5558E3] text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                Update Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
