import React from 'react';
import { useAuth } from '../context/AuthContext';

function AfterLoginHeader({ toggleSidebar, searchQuery, setSearchQuery, onOpenReportModal, title = "Dashboard" }) {
    const { currentUser } = useAuth();

    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
                <button className="md:hidden p-2 rounded-xl bg-[#F4F5F6]" onClick={toggleSidebar}>
                    <span className="material-symbols-outlined text-xl">menu</span>
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1D1F] tracking-tight">{title}</h1>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {/* Pill Search Field */}
                <div className="relative flex-1 sm:w-72">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9FA5] text-lg">search</span>
                    <input
                        type="text"
                        placeholder="Search anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#F4F5F6] border-none rounded-full pl-10 pr-4 py-2.5 text-sm text-[#1A1D1F] focus:ring-2 focus:ring-black/10 outline-none placeholder:text-[#9A9FA5]"
                    />
                </div>

                {/* Black Pill CTA Button */}
                <button
                    className="bg-[#1A1D1F] hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 shadow-md flex items-center gap-1.5"
                    onClick={() => onOpenReportModal && onOpenReportModal('lost')}
                >
                    <span>Create</span>
                </button>

                {/* Header Action Icons */}
                <button className="w-10 h-10 rounded-full bg-[#F4F5F6] border border-black/5 flex items-center justify-center text-[#1A1D1F] hover:bg-white transition-colors relative">
                    <span className="material-symbols-outlined text-lg">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button className="w-10 h-10 rounded-full bg-[#F4F5F6] border border-black/5 flex items-center justify-center text-[#1A1D1F] hover:bg-white transition-colors">
                    <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                </button>

                {/* User Avatar */}
                <div
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-black/10 flex-shrink-0 cursor-pointer"
                    title={currentUser?.displayName || 'User Profile'}
                >
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                        alt="Profile"
                    />
                </div>
            </div>
        </header>
    );
}

export default AfterLoginHeader;
