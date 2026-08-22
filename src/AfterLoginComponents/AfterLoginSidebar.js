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
            return 'bg-[#EDF4FC] text-[#0B6BCB] font-semibold';
        }
        return 'text-[#6B7280] hover:text-[#16181F] hover:bg-[#F4F3F1]';
    };

    return (
        <>
            {/* Mobile Sidebar Overlay Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-[#16181F]/30 backdrop-blur-xs z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed md:relative top-0 left-0 h-full w-64 bg-[#FFFFFF] text-[#16181F] flex flex-col justify-between p-6 z-50 transition-transform duration-300 border-r border-[#E6E5E1] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="space-y-8">
                    {/* Brand Logo */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('/dashboard')}>
                            <div className="w-10 h-10 bg-[#0B6BCB] text-white rounded-full flex items-center justify-center">
                                <span aria-hidden="true" className="material-symbols-outlined text-xl font-bold">token</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#16181F]">TrustFound</span>
                        </div>
                        <button aria-label="Close navigation menu" className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] shrink-0 flex items-center justify-center rounded-full hover:bg-[#F4F3F1] text-[#6B7280]" onClick={() => setIsSidebarOpen(false)}>
                            <span aria-hidden="true" className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-1.5">
                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/dashboard')}`}
                            onClick={() => handleNavClick('/dashboard')}
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-xl">grid_view</span>
                            <span>Dashboard</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/search-lost')}`}
                            onClick={() => handleNavClick('/search-lost')}
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-xl">view_in_ar</span>
                            <span>Lost Items</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/search-found')}`}
                            onClick={() => handleNavClick('/search-found')}
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-xl">storefront</span>
                            <span>Found Items</span>
                        </button>

                        <button
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/forum')}`}
                            onClick={() => handleNavClick('/forum')}
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-xl">chat_bubble_outline</span>
                            <span>Community</span>
                        </button>

                        {isSuperAdmin && (
                            <>
                                <button
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/admin/conversation-analysis')}`}
                                    onClick={() => handleNavClick('/admin/conversation-analysis')}
                                >
                                    <span aria-hidden="true" className="material-symbols-outlined text-xl">analytics</span>
                                    <span>Analysis</span>
                                </button>
                                <button
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/admin/manage-posts')}`}
                                    onClick={() => handleNavClick('/admin/manage-posts')}
                                >
                                    <span aria-hidden="true" className="material-symbols-outlined text-xl">pie_chart_outline</span>
                                    <span>Moderation</span>
                                </button>
                            </>
                        )}

                        {!isSuperAdmin && (
                            <button
                                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass('/contact')}`}
                                onClick={() => handleNavClick('/contact')}
                            >
                                <span aria-hidden="true" className="material-symbols-outlined text-xl">support_agent</span>
                                <span>Contact Support</span>
                            </button>
                        )}
                    </nav>
                </div>

                {/* Bottom Controls */}
                <div className="pt-6 space-y-3 border-t border-[#E6E5E1]">
                    <div className="flex flex-col gap-2">
                        <button
                            className="w-11 h-11 rounded-full border border-[#E6E5E1] flex items-center justify-center cursor-pointer bg-[#FFFFFF] text-[#6B7280] hover:text-[#0B6BCB] hover:border-[#0B6BCB]/40 transition-all"
                            onClick={() => handleNavClick('/forum')}
                            aria-label="Community Chat"
                            title="Community Chat"
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-lg">forum</span>
                        </button>
                    </div>

                    {currentUser && (
                        <div className="flex flex-col gap-1 pt-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#16181F] truncate max-w-[120px]">{currentUser.displayName}</span>
                                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full capitalize ${isSuperAdmin ? 'bg-[#0B6BCB]/20 text-[#0B6BCB]' : 'bg-[#157F3D]/20 text-[#157F3D]'}`}>
                                    {isSuperAdmin ? 'Super Admin' : 'User'}
                                </span>
                            </div>
                            <button
                                className="text-left text-xs font-bold text-[#B42318] hover:underline cursor-pointer min-h-[44px] flex items-center"
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
