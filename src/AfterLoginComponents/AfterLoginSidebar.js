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

    return (
        <>
            {/* Mobile Sidebar Overlay Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed md:relative top-0 left-0 h-full w-64 bg-[#F4F5F6] md:bg-transparent flex flex-col justify-between p-6 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="space-y-8">
                    {/* Brand Logo */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('/dashboard')}>
                            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-md">
                                <span className="material-symbols-outlined text-xl">token</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#1A1D1F]">TrustFound</span>
                        </div>
                        <button className="md:hidden p-1.5 rounded-full hover:bg-black/5" onClick={() => setIsSidebarOpen(false)}>
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-1">
                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${location.pathname === '/dashboard' ? 'bg-white text-[#1A1D1F] shadow-sm font-bold' : 'text-[#6F767E] hover:text-[#1A1D1F] hover:bg-white/60'}`}
                            onClick={() => handleNavClick('/dashboard')}
                        >
                            <span className="material-symbols-outlined text-xl">grid_view</span>
                            <span>Dashboard</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${location.pathname === '/search-lost' ? 'bg-white text-[#1A1D1F] shadow-sm font-bold' : 'text-[#6F767E] hover:text-[#1A1D1F] hover:bg-white/60'}`}
                            onClick={() => handleNavClick('/search-lost')}
                        >
                            <span className="material-symbols-outlined text-xl">view_in_ar</span>
                            <span>Lost Items</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${location.pathname === '/search-found' ? 'bg-white text-[#1A1D1F] shadow-sm font-bold' : 'text-[#6F767E] hover:text-[#1A1D1F] hover:bg-white/60'}`}
                            onClick={() => handleNavClick('/search-found')}
                        >
                            <span className="material-symbols-outlined text-xl">storefront</span>
                            <span>Found Items</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${location.pathname === '/forum' ? 'bg-white text-[#1A1D1F] shadow-sm font-bold' : 'text-[#6F767E] hover:text-[#1A1D1F] hover:bg-white/60'}`}
                            onClick={() => handleNavClick('/forum')}
                        >
                            <span className="material-symbols-outlined text-xl">chat_bubble_outline</span>
                            <span>Community</span>
                        </button>

                        {isSuperAdmin && (
                            <button
                                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${location.pathname === '/admin/manage-posts' ? 'bg-white text-[#1A1D1F] shadow-sm font-bold' : 'text-[#6F767E] hover:text-[#1A1D1F] hover:bg-white/60'}`}
                                onClick={() => handleNavClick('/admin/manage-posts')}
                            >
                                <span className="material-symbols-outlined text-xl">pie_chart_outline</span>
                                <span>Moderation</span>
                            </button>
                        )}

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${location.pathname === '/contact' ? 'bg-white text-[#1A1D1F] shadow-sm font-bold' : 'text-[#6F767E] hover:text-[#1A1D1F] hover:bg-white/60'}`}
                            onClick={() => handleNavClick('/contact')}
                        >
                            <span className="material-symbols-outlined text-xl">support_agent</span>
                            <span>Contact Support</span>
                        </button>
                    </nav>
                </div>

                {/* Bottom Controls */}
                <div className="pt-6 space-y-3">
                    <div className="flex flex-col gap-2">
                        <button className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-[#6F767E] hover:text-[#1A1D1F] shadow-xs">
                            <span className="material-symbols-outlined text-lg">forum</span>
                        </button>
                        <div className="w-10 h-20 bg-white rounded-full border border-black/5 flex flex-col items-center justify-between p-1.5 shadow-xs">
                            <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#6F767E] hover:bg-[#F4F5F6]">
                                <span className="material-symbols-outlined text-base">dark_mode</span>
                            </button>
                            <button className="w-7 h-7 bg-[#1A1D1F] text-white rounded-full flex items-center justify-center shadow-xs">
                                <span className="material-symbols-outlined text-base">light_mode</span>
                            </button>
                        </div>
                    </div>

                    {currentUser && (
                        <button
                            className="w-full text-left text-xs font-bold text-red-500 hover:underline pt-2"
                            onClick={() => { logout(); navigate('/login'); }}
                        >
                            Log Out ({currentUser.displayName})
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
}

export default AfterLoginSidebar;
