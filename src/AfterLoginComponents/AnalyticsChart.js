import React, { useState } from 'react';

function AnalyticsChart() {
    const [chartFilter, setChartFilter] = useState('Last 7 days');

    return (
        <div className="bg-[#1E212B] border border-[#262A36] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-[#F4F5F6]">Resolution Trends</h2>
                <div className="relative">
                    <select
                        value={chartFilter}
                        onChange={(e) => setChartFilter(e.target.value)}
                        className="bg-[#14161D] border border-[#262A36] rounded-full px-4 py-1.5 text-xs font-semibold text-[#F4F5F6] outline-none cursor-pointer appearance-none pr-8 focus:border-[#38DFFF]/50"
                    >
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-[#9A9FA5]">keyboard_arrow_down</span>
                </div>
            </div>

            <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#38DFFF] tracking-tight">$10.2m</span>
                <p className="text-xs text-[#9A9FA5]">Estimated value of items successfully returned to verified owners</p>
            </div>

            {/* Custom Bar Chart Visualization */}
            <div className="pt-4 flex items-end justify-between gap-3 h-48 sm:h-56">
                <div className="flex-1 bg-[#14161D] border border-[#262A36] rounded-t-xl h-[40%] hover:bg-[#1B1E27] transition-all"></div>
                <div className="flex-1 bg-[#14161D] border border-[#262A36] rounded-t-xl h-[65%] hover:bg-[#1B1E27] transition-all"></div>
                <div className="flex-1 bg-[#14161D] border border-[#262A36] rounded-t-xl h-[50%] hover:bg-[#1B1E27] transition-all"></div>
                <div className="flex-1 bg-[#14161D] border border-[#262A36] rounded-t-xl h-[80%] hover:bg-[#1B1E27] transition-all"></div>

                {/* Highlighted Active Bar */}
                <div className="flex-1 relative flex flex-col items-center h-full justify-end">
                    <div className="absolute -top-7 bg-[#38DFFF] text-[#0D0E12] px-2 py-0.5 rounded-md text-[10px] font-extrabold shadow-[0_0_10px_rgba(56,223,255,0.4)]">
                        2.2m
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9D] border-2 border-[#1E212B] mb-2 shadow-xs"></div>
                    <div className="w-full bg-gradient-to-t from-[#38DFFF] to-[#00B2FE] rounded-t-xl h-[90%] shadow-[0_0_15px_rgba(56,223,255,0.25)]"></div>
                </div>

                <div className="flex-1 bg-[#14161D] border border-[#262A36] rounded-t-xl h-[60%] hover:bg-[#1B1E27] transition-all"></div>
                <div className="flex-1 bg-[#14161D] border border-[#262A36] rounded-t-xl h-[75%] hover:bg-[#1B1E27] transition-all"></div>
                <div className="flex-1 bg-[#14161D] border border-[#262A36] rounded-t-xl h-[45%] hover:bg-[#1B1E27] transition-all"></div>
            </div>
        </div>
    );
}

export default AnalyticsChart;
