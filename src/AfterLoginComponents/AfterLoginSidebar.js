import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AfterLoginSidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const isSuperAdmin = currentUser?.role === 'superadmin';

    const handleNavClick = (path) => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
        navigate(path);
    };

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        if (isActive) {
            return 'bg-gradient-to-r from-[#38DFFF] to-[#00B2FE] text-[#0D0E12] font-extrabold shadow-[0_0_15px_rgba(56,223,255,0.35)]';
        }
        return 'text-[#9A9FA5] hover:text-[#F4F5F6] hover:bg-[#1B1E27]';
    };

    return (
        <>
            {/* Mobile Sidebar Overlay Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed md:relative top-0 left-0 h-full w-64 bg-[#14161D] text-[#F4F5F6] md:bg-transparent flex flex-col justify-between p-6 z-50 transition-transform duration-300 border-r border-[#262A36] md:border-r-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="space-y-8">
                    {/* Brand Logo */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('/dashboard')}>
                            <div className="w-10 h-10 bg-gradient-to-br from-[#38DFFF] to-[#00B2FE] text-[#0D0E12] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(56,223,255,0.3)]">
                                <span className="material-symbols-outlined text-xl font-bold">token</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#F4F5F6]">TrustFound</span>
                        </div>
                        <button className="md:hidden p-1.5 rounded-full hover:bg-white/10 text-[#9A9FA5]" onClick={() => setIsSidebarOpen(false)}>
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-1.5">
                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/dashboard')}`}
                            onClick={() => handleNavClick('/dashboard')}
                        >
                            <span className="material-symbols-outlined text-xl">grid_view</span>
                            <span>Dashboard</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/search-lost')}`}
                            onClick={() => handleNavClick('/search-lost')}
                        >
                            <span className="material-symbols-outlined text-xl">view_in_ar</span>
                            <span>Lost Items</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/search-found')}`}
                            onClick={() => handleNavClick('/search-found')}
                        >
                            <span className="material-symbols-outlined text-xl">storefront</span>
                            <span>Found Items</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/forum')}`}
                            onClick={() => handleNavClick('/forum')}
                        >
                            <span className="material-symbols-outlined text-xl">chat_bubble_outline</span>
                            <span>Community</span>
                        </button>

                        {isSuperAdmin && (
                            <>
                                <button
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/admin/conversation-analysis')}`}
                                    onClick={() => handleNavClick('/admin/conversation-analysis')}
                                >
                                    <span className="material-symbols-outlined text-xl">analytics</span>
                                    <span>Analysis</span>
                                </button>
                                <button
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/admin/manage-posts')}`}
                                    onClick={() => handleNavClick('/admin/manage-posts')}
                                >
                                    <span className="material-symbols-outlined text-xl">pie_chart_outline</span>
                                    <span>Moderation</span>
                                </button>
                            </>
                        )}

                        {!isSuperAdmin && (
                            <button
                                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/contact')}`}
                                onClick={() => handleNavClick('/contact')}
                            >
                                <span className="material-symbols-outlined text-xl">support_agent</span>
                                <span>Contact Support</span>
                            </button>
                        )}
                    </nav>
                </div>

                {/* Bottom Controls */}
                <div className="pt-6 space-y-3 border-t border-[#262A36]">
                    <div className="flex flex-col gap-2">
                        <button
                            className="w-10 h-10 rounded-full border border-[#262A36] flex items-center justify-center cursor-pointer bg-[#1E212B] text-[#9A9FA5] hover:text-[#38DFFF] hover:border-[#38DFFF]/40 transition-all"
                            onClick={() => handleNavClick('/forum')}
                            title="Community Chat"
                        >
                            <span className="material-symbols-outlined text-lg">forum</span>
                        </button>
                    </div>

                    {currentUser && (
                        <div className="flex flex-col gap-1 pt-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#F4F5F6] truncate max-w-[120px]">{currentUser.displayName}</span>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full capitalize ${isSuperAdmin ? 'bg-[#38DFFF]/20 text-[#38DFFF]' : 'bg-[#00FF9D]/20 text-[#00FF9D]'}`}>
                                    {isSuperAdmin ? 'Super Admin' : 'User'}
                                </span>
                            </div>
                            <button
                                className="text-left text-xs font-bold text-[#FF5376] hover:underline cursor-pointer"
                                onClick={() => { logout(); navigate('/login'); }}
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

export default AfterLoginSidebar;
