import React, { useState } from 'react';

function AnalyticsChart() {
    const [chartFilter, setChartFilter] = useState('Last 7 days');

    return (
        <div className="bg-[#FFFFFF] border border-[#E6E5E1] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-[#16181F]">Resolution Trends</h2>
                <div className="relative">
                    <select
                        value={chartFilter}
                        onChange={(e) => setChartFilter(e.target.value)}
                        className="min-h-[44px] bg-[#FFFFFF] border border-[#E6E5E1] rounded-full px-4 py-1.5 text-xs font-semibold text-[#16181F] outline-none cursor-pointer appearance-none pr-8 focus:border-[#0B6BCB]/50"
                    >
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                    </select>
                    <span aria-hidden="true" className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-[#6B7280]">keyboard_arrow_down</span>
                </div>
            </div>

            <div className="space-y-1">
                <span className="record-id text-3xl sm:text-4xl font-semibold text-[#16181F] tracking-tight">1,284</span>
                <p className="text-xs text-[#6B7280]">Items returned to a verified owner</p>
            </div>

            {/* Custom Bar Chart Visualization */}
            <div className="pt-4 flex items-end justify-between gap-3 h-48 sm:h-56">
                <div className="flex-1 bg-[#FFFFFF] border border-[#E6E5E1] rounded-t-xl h-[40%] hover:bg-[#F4F3F1] transition-all"></div>
                <div className="flex-1 bg-[#FFFFFF] border border-[#E6E5E1] rounded-t-xl h-[65%] hover:bg-[#F4F3F1] transition-all"></div>
                <div className="flex-1 bg-[#FFFFFF] border border-[#E6E5E1] rounded-t-xl h-[50%] hover:bg-[#F4F3F1] transition-all"></div>
                <div className="flex-1 bg-[#FFFFFF] border border-[#E6E5E1] rounded-t-xl h-[80%] hover:bg-[#F4F3F1] transition-all"></div>

                {/* Highlighted Active Bar */}
                <div className="flex-1 relative flex flex-col items-center h-full justify-end">
                    <div className="absolute -top-7 bg-[#0B6BCB] text-white px-2 py-0.5 rounded-md text-xs sm:text-[10px] font-extrabold">
                        2.2m
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#157F3D] border-2 border-[#FFFFFF] mb-2 shadow-xs"></div>
                    <div className="w-full bg-[#0B6BCB] rounded-t-xl h-[90%]"></div>
                </div>

                <div className="flex-1 bg-[#FFFFFF] border border-[#E6E5E1] rounded-t-xl h-[60%] hover:bg-[#F4F3F1] transition-all"></div>
                <div className="flex-1 bg-[#FFFFFF] border border-[#E6E5E1] rounded-t-xl h-[75%] hover:bg-[#F4F3F1] transition-all"></div>
                <div className="flex-1 bg-[#FFFFFF] border border-[#E6E5E1] rounded-t-xl h-[45%] hover:bg-[#F4F3F1] transition-all"></div>
            </div>
        </div>
    );
}

export default AnalyticsChart;
