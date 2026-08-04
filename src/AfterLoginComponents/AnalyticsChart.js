import React, { useState } from 'react';

function AnalyticsChart() {
    const [chartFilter, setChartFilter] = useState('Last 7 days');

    return (
        <div className="bg-[#F4F5F6] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#1A1D1F]">Resolution Trends</h2>
                <div className="relative">
                    <select
                        value={chartFilter}
                        onChange={(e) => setChartFilter(e.target.value)}
                        className="bg-white border border-black/5 rounded-full px-4 py-1.5 text-xs font-semibold text-[#1A1D1F] outline-none cursor-pointer appearance-none pr-8"
                    >
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-[#6F767E]">keyboard_arrow_down</span>
                </div>
            </div>

            <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1A1D1F] tracking-tight">$10.2m</span>
                <p className="text-xs text-[#6F767E]">Estimated value of items successfully returned to verified owners</p>
            </div>

            {/* Custom Bar Chart Visualization */}
            <div className="pt-4 flex items-end justify-between gap-3 h-48 sm:h-56">
                <div className="flex-1 bg-[#EBEBEB] rounded-t-xl h-[40%] hover:bg-[#E2E2E2] transition-all"></div>
                <div className="flex-1 bg-[#EBEBEB] rounded-t-xl h-[65%] hover:bg-[#E2E2E2] transition-all"></div>
                <div className="flex-1 bg-[#EBEBEB] rounded-t-xl h-[50%] hover:bg-[#E2E2E2] transition-all"></div>
                <div className="flex-1 bg-[#EBEBEB] rounded-t-xl h-[80%] hover:bg-[#E2E2E2] transition-all"></div>

                {/* Highlighted Active Bar */}
                <div className="flex-1 relative flex flex-col items-center h-full justify-end">
                    <div className="absolute -top-7 bg-[#1A1D1F] text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-md">
                        2.2m
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#83BF6E] border-2 border-white mb-2 shadow-xs"></div>
                    <div className="w-full bg-gradient-to-t from-[#83BF6E] to-[#A3D991] rounded-t-xl h-[90%] shadow-xs"></div>
                </div>

                <div className="flex-1 bg-[#EBEBEB] rounded-t-xl h-[60%] hover:bg-[#E2E2E2] transition-all"></div>
                <div className="flex-1 bg-[#EBEBEB] rounded-t-xl h-[75%] hover:bg-[#E2E2E2] transition-all"></div>
                <div className="flex-1 bg-[#EBEBEB] rounded-t-xl h-[45%] hover:bg-[#E2E2E2] transition-all"></div>
            </div>
        </div>
    );
}

export default AnalyticsChart;
