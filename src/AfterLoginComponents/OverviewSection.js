import React, { useState } from 'react';

const communityScouts = [
    { name: 'Gladyce', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { name: 'Elbert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Dash', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { name: 'Joyce', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { name: 'Marina', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
];

function OverviewSection() {
    const [timeFilter, setTimeFilter] = useState('Last month');

    return (
        <div className="bg-[#1E212B] border border-[#262A36] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-[#F4F5F6]">Overview</h2>
                <div className="relative">
                    <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="bg-[#14161D] border border-[#262A36] rounded-full px-4 py-1.5 text-xs font-semibold text-[#F4F5F6] outline-none cursor-pointer appearance-none pr-8 focus:border-[#38DFFF]/50"
                    >
                        <option>Last month</option>
                        <option>Last 7 days</option>
                        <option>This year</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-[#9A9FA5]">keyboard_arrow_down</span>
                </div>
            </div>

            {/* Metric Sub-Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Active Lost Card */}
                <div className="bg-[#14161D] rounded-2xl p-6 shadow-md border border-[#262A36] space-y-3 hover:border-[#38DFFF]/40 transition-all">
                    <div className="flex items-center gap-2 text-[#9A9FA5] text-xs font-semibold">
                        <span className="material-symbols-outlined text-base text-[#FF5376]">person_search</span>
                        <span>Active Lost Reports</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#F4F5F6]">1,293</h3>
                        <span className="bg-[#FF5376]/15 text-[#FF5376] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5">
                            <span>↓ 36.8%</span>
                            <span className="text-[10px] opacity-75 font-normal">vs last month</span>
                        </span>
                    </div>
                </div>

                {/* Found & Recovered Card */}
                <div className="bg-[#14161D] rounded-2xl p-6 shadow-md border border-[#262A36] space-y-3 hover:border-[#00FF9D]/40 transition-all">
                    <div className="flex items-center gap-2 text-[#9A9FA5] text-xs font-semibold">
                        <span className="material-symbols-outlined text-base text-[#00FF9D]">account_balance_wallet</span>
                        <span>Found & Recovered</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#38DFFF]">256k</h3>
                        <span className="bg-[#00FF9D]/15 text-[#00FF9D] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5">
                            <span>↑ 36.8%</span>
                            <span className="text-[10px] opacity-75 font-normal">vs last month</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Active Scouts Row */}
            <div className="pt-2">
                <h4 className="text-sm font-bold text-[#F4F5F6]">857 new community scouts today!</h4>
                <p className="text-xs text-[#9A9FA5] mt-0.5 mb-4">Send a welcome message to all new scouts joining the recovery network.</p>

                <div className="flex flex-wrap items-center gap-4">
                    {communityScouts.map((scout, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#38DFFF]/40 shadow-xs group-hover:scale-105 group-hover:border-[#38DFFF] transition-all">
                                <img className="w-full h-full object-cover" src={scout.avatar} alt={scout.name} />
                            </div>
                            <span className="text-xs font-medium text-[#9A9FA5] group-hover:text-[#F4F5F6]">{scout.name}</span>
                        </div>
                    ))}

                    <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-[#14161D] border border-[#262A36] flex items-center justify-center text-[#38DFFF] shadow-xs group-hover:scale-105 group-hover:border-[#38DFFF] transition-all">
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </div>
                        <span className="text-xs font-medium text-[#9A9FA5]">View all</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverviewSection;
