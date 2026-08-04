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
        <div className="bg-[#F4F5F6] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#1A1D1F]">Overview</h2>
                <div className="relative">
                    <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="bg-white border border-black/5 rounded-full px-4 py-1.5 text-xs font-semibold text-[#1A1D1F] outline-none cursor-pointer appearance-none pr-8"
                    >
                        <option>Last month</option>
                        <option>Last 7 days</option>
                        <option>This year</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-[#6F767E]">keyboard_arrow_down</span>
                </div>
            </div>

            {/* Metric Sub-Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Active Lost Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-black/5 space-y-3">
                    <div className="flex items-center gap-2 text-[#6F767E] text-xs font-semibold">
                        <span className="material-symbols-outlined text-base">person_search</span>
                        <span>Active Lost Reports</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1A1D1F]">1,293</h3>
                        <span className="bg-[#FFEBEB] text-[#FF6A55] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5">
                            <span>↓ 36.8%</span>
                            <span className="text-[10px] text-[#FF6A55]/70 font-normal">vs last month</span>
                        </span>
                    </div>
                </div>

                {/* Found & Recovered Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-black/5 space-y-3">
                    <div className="flex items-center gap-2 text-[#6F767E] text-xs font-semibold">
                        <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                        <span>Found & Recovered</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1A1D1F]">256k</h3>
                        <span className="bg-[#EAF8F0] text-[#83BF6E] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5">
                            <span>↑ 36.8%</span>
                            <span className="text-[10px] text-[#83BF6E]/70 font-normal">vs last month</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Active Scouts Row */}
            <div className="pt-2">
                <h4 className="text-sm font-bold text-[#1A1D1F]">857 new community scouts today!</h4>
                <p className="text-xs text-[#6F767E] mt-0.5 mb-4">Send a welcome message to all new scouts joining the recovery network.</p>

                <div className="flex flex-wrap items-center gap-4">
                    {communityScouts.map((scout, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xs group-hover:scale-105 transition-transform">
                                <img className="w-full h-full object-cover" src={scout.avatar} alt={scout.name} />
                            </div>
                            <span className="text-xs font-medium text-[#6F767E] group-hover:text-[#1A1D1F]">{scout.name}</span>
                        </div>
                    ))}

                    <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#1A1D1F] shadow-xs group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </div>
                        <span className="text-xs font-medium text-[#6F767E]">View all</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverviewSection;
