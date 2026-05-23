import { Trophy, TrendingDown, Award, Zap, Users } from "lucide-react";
import { motion } from "motion/react";

const teamLeaderboard = [
  { rank: 1, team: "Frontend", members: 8, savings: 4240, efficiency: 94, badge: "gold", approved: 12 },
  { rank: 2, team: "Data Science", members: 6, savings: 3890, efficiency: 91, badge: "silver", approved: 9 },
  { rank: 3, team: "Backend", members: 12, savings: 3120, efficiency: 87, badge: "bronze", approved: 11 },
  { rank: 4, team: "DevOps", members: 4, savings: 2840, efficiency: 89, badge: null, approved: 8 },
  { rank: 5, team: "Mobile", members: 5, savings: 1920, efficiency: 82, badge: null, approved: 6 },
];

const topContributors = [
  { name: "Sarah Chen", team: "Frontend", avatar: "SC", savings: 1840, color: "from-purple-500 to-pink-500" },
  { name: "Mike Rodriguez", team: "Data Science", avatar: "MR", savings: 1620, color: "from-blue-500 to-cyan-500" },
  { name: "Alex Kumar", team: "Backend", avatar: "AK", savings: 1480, color: "from-green-500 to-emerald-500" },
  { name: "Jessica Lee", team: "DevOps", avatar: "JL", savings: 1320, color: "from-orange-500 to-red-500" },
];

export function Leaderboard() {
  const getBadgeIcon = (badge: string | null) => {
    if (badge === "gold") return <Trophy className="w-5 h-5 text-[#FFD700]" />;
    if (badge === "silver") return <Trophy className="w-5 h-5 text-[#C0C0C0]" />;
    if (badge === "bronze") return <Trophy className="w-5 h-5 text-[#CD7F32]" />;
    return null;
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl text-white mb-2">Team Leaderboard</h1>
        <p className="text-slate-400">Gamified cost optimization - may the best team win!</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#FFD700]/20 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-5 h-5 text-[#FFD700]" />
            <span className="text-slate-400 text-sm">Top Team</span>
          </div>
          <div className="text-2xl text-white font-semibold">Frontend</div>
          <div className="text-[#10B981] text-sm">$4,240 saved</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#10B981]/20 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-[#10B981]" />
            <span className="text-slate-400 text-sm">Total Saved</span>
          </div>
          <div className="text-2xl text-[#10B981] font-semibold">$16,010</div>
          <div className="text-slate-400 text-sm">This month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#6366F1]/20 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-[#6366F1]" />
            <span className="text-slate-400 text-sm">Recommendations</span>
          </div>
          <div className="text-2xl text-white font-semibold">46</div>
          <div className="text-[#6366F1] text-sm">Approved this month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 text-sm">Avg Efficiency</span>
          </div>
          <div className="text-2xl text-white font-semibold">88.6%</div>
          <div className="text-slate-400 text-sm">Across all teams</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6"
          >
            <div className="mb-6">
              <h3 className="text-xl text-white mb-1">Team Rankings</h3>
              <p className="text-slate-400">Sorted by total cost savings this month</p>
            </div>

            <div className="space-y-3">
              {teamLeaderboard.map((team, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    team.rank === 1
                      ? "bg-gradient-to-r from-[#FFD700]/10 to-transparent border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]"
                      : team.rank === 2
                      ? "bg-gradient-to-r from-[#C0C0C0]/10 to-transparent border-[#C0C0C0]/30"
                      : team.rank === 3
                      ? "bg-gradient-to-r from-[#CD7F32]/10 to-transparent border-[#CD7F32]/30"
                      : "bg-slate-800/30 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl ${
                      team.rank === 1 ? "bg-[#FFD700]/20 text-[#FFD700]" :
                      team.rank === 2 ? "bg-[#C0C0C0]/20 text-[#C0C0C0]" :
                      team.rank === 3 ? "bg-[#CD7F32]/20 text-[#CD7F32]" :
                      "bg-slate-700 text-slate-400"
                    }`}>
                      {team.rank}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold text-lg">{team.team}</h4>
                        {team.badge && getBadgeIcon(team.badge)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>{team.members} members</span>
                        <span>•</span>
                        <span>{team.approved} recommendations approved</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#10B981] mb-1">
                        ${team.savings.toLocaleString()}
                      </div>
                      <div className="text-slate-400 text-sm mb-2">saved this month</div>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-slate-400 text-sm">Efficiency:</span>
                        <span className="text-[#6366F1] font-semibold">{team.efficiency}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${team.efficiency}%` }}
                      transition={{ duration: 1, delay: 0.7 + idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-slate-800/30 to-transparent p-6 mb-6"
          >
            <div className="mb-6">
              <h3 className="text-xl text-white mb-1">Top Contributors</h3>
              <p className="text-slate-400 text-sm">Individual heroes</p>
            </div>

            <div className="space-y-4">
              {topContributors.map((contributor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${contributor.color} flex items-center justify-center font-bold text-white`}>
                    {contributor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{contributor.name}</div>
                    <div className="text-slate-400 text-sm">{contributor.team}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#10B981] font-semibold">${contributor.savings}</div>
                    <div className="text-slate-500 text-xs">saved</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-[#6366F1]/30 backdrop-blur-xl bg-gradient-to-br from-[#6366F1]/10 to-transparent p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#6366F1]" />
              <h3 className="text-white font-semibold">This Month's Prize</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              The winning team gets a $500 team lunch and bragging rights for the month!
            </p>
            <div className="text-center p-4 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30">
              <div className="text-[#6366F1] text-sm mb-1">Current Leader</div>
              <div className="text-2xl font-bold text-white">Frontend Team</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
