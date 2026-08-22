import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AfterLoginHeader({ toggleSidebar, searchQuery, setSearchQuery, onOpenReportModal, title = "Dashboard" }) {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const [activePopover, setActivePopover] = useState(null); // 'notifications', 'messages', 'profile', or null
    const [unreadCount, setUnreadCount] = useState(3);
    const popoverRef = useRef(null);

    // Dummy notification items
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Item Match Found!', desc: 'A black wallet matching your lost item report was found near Central Park.', time: '10m ago', unread: true },
        { id: 2, title: 'New Forum Comment', desc: 'Sarah M. replied to your post: "Tips for Finding Lost Items".', time: '1h ago', unread: true },
        { id: 3, title: 'Post Approved', desc: 'Your report #LOST-1042 has been verified by moderators.', time: '3h ago', unread: true },
    ]);

    // Dummy messages
    const messages = [
        { id: 1, sender: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', message: 'Hi! I think I found your lost laptop bag.', time: '5m ago' },
        { id: 2, sender: 'Community Support', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', message: 'Your claim request has been received.', time: '2h ago' },
    ];

    const togglePopover = (type) => {
        setActivePopover((prev) => (prev === type ? null : type));
    };

    const handleMarkAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
        setUnreadCount(0);
    };

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setActivePopover(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative" ref={popoverRef}>
            <div className="flex items-center gap-3">
                <button aria-label="Open navigation menu" className="md:hidden w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-[#FFFFFF] text-[#16181F] border border-[#E6E5E1]" onClick={toggleSidebar}>
                    <span aria-hidden="true" className="material-symbols-outlined text-xl">menu</span>
                </button>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#16181F]">{title}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end relative">
                {/* Pill Search Field — drops to its own row below the actions on mobile */}
                <div className="relative order-last w-full sm:order-none sm:w-72">
                    <span aria-hidden="true" className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] text-lg">search</span>
                    <input
                        type="text"
                        placeholder="Search anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full min-h-[44px] border border-[#E6E5E1] rounded-full pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B6BCB]/50 outline-none placeholder:text-[#6B7280] bg-[#FFFFFF] text-[#16181F]"
                    />
                </div>

                {/* Electric Cyan Pill CTA Button */}
                <button
                    className="shrink-0 min-h-[44px] bg-[#0B6BCB] text-white px-4 sm:px-5 py-2.5 rounded-full text-sm font-extrabold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer hover:opacity-90"
                    onClick={() => onOpenReportModal && onOpenReportModal('lost')}
                >
                    <span aria-hidden="true" className="material-symbols-outlined text-base">add</span>
                    <span>Create</span>
                </button>

                {/* Header Action Icons */}

                {/* Notification Icon */}
                <div className="shrink-0">
                    <button
                        className="w-11 h-11 shrink-0 rounded-full border border-[#E6E5E1] flex items-center justify-center transition-all relative cursor-pointer bg-[#FFFFFF] text-[#16181F] hover:border-[#0B6BCB]/40"
                        onClick={() => togglePopover('notifications')}
                        title="Notifications"
                    >
                        <span aria-hidden="true" className="material-symbols-outlined text-lg">notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#B42318] rounded-full ring-2 ring-[#FFFFFF]"></span>
                        )}
                    </button>

                    {/* Notifications Popover */}
                    {activePopover === 'notifications' && (
                        <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2.5rem))] sm:w-96 rounded-2xl border p-4 z-50 transition-all bg-[#FFFFFF] border-[#E6E5E1] text-[#16181F]">
                            <div className="flex items-center justify-between pb-3 border-b border-[#E6E5E1]">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-sm text-[#16181F]">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <span className="bg-[#B42318]/15 text-[#B42318] text-xs px-2 py-0.5 rounded-full font-bold">{unreadCount} new</span>
                                    )}
                                </div>
                                {unreadCount > 0 && (
                                    <button onClick={handleMarkAllRead} className="text-xs text-[#0B6BCB] hover:underline font-semibold cursor-pointer">
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-72 overflow-y-auto space-y-3 pt-3">
                                {notifications.map((n) => (
                                    <div key={n.id} className={`p-2.5 rounded-xl border text-xs space-y-1 transition-colors ${n.unread ? 'bg-[#0B6BCB]/10 border-[#0B6BCB]/30' : 'bg-[#FFFFFF] border-[#E6E5E1]'}`}>
                                        <div className="flex justify-between items-center font-bold text-[#16181F]">
                                            <span>{n.title}</span>
                                            <span className="text-xs sm:text-[10px] text-[#6B7280]">{n.time}</span>
                                        </div>
                                        <p className="text-[#6B7280] text-xs sm:text-[11px] leading-relaxed">{n.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Message Icon */}
                <div className="shrink-0">
                    <button
                        className="w-11 h-11 shrink-0 rounded-full border border-[#E6E5E1] flex items-center justify-center transition-all cursor-pointer bg-[#FFFFFF] text-[#16181F] hover:border-[#0B6BCB]/40"
                        onClick={() => togglePopover('messages')}
                        title="Messages"
                    >
                        <span aria-hidden="true" className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                    </button>

                    {/* Messages Popover */}
                    {activePopover === 'messages' && (
                        <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2.5rem))] sm:w-96 rounded-2xl border p-4 z-50 transition-all bg-[#FFFFFF] border-[#E6E5E1] text-[#16181F]">
                            <div className="flex items-center justify-between pb-3 border-b border-[#E6E5E1]">
                                <h3 className="font-bold text-sm text-[#16181F]">Community Messages</h3>
                                <button onClick={() => navigate('/forum')} className="text-xs text-[#0B6BCB] hover:underline font-semibold cursor-pointer">
                                    Open Forum
                                </button>
                            </div>
                            <div className="max-h-72 overflow-y-auto space-y-3 pt-3">
                                {messages.map((m) => (
                                    <div key={m.id} className="p-2.5 rounded-xl border flex gap-3 items-center cursor-pointer hover:opacity-90 bg-[#FFFFFF] border-[#E6E5E1]">
                                        <img src={m.avatar} alt={m.sender} className="w-9 h-9 rounded-full object-cover" />
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center text-xs font-bold text-[#16181F]">
                                                <span>{m.sender}</span>
                                                <span className="text-xs sm:text-[10px] text-[#6B7280]">{m.time}</span>
                                            </div>
                                            <p className="text-[#6B7280] text-xs sm:text-[11px] truncate">{m.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile Avatar */}
                <div className="shrink-0">
                    <button
                        type="button"
                        className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#0B6BCB]/40 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-[#0B6BCB] transition-all"
                        aria-label={`Account menu for ${currentUser?.displayName || 'User'}`}
                        aria-expanded={activePopover === 'profile'}
                        title={currentUser?.displayName || 'User Profile'}
                        onClick={() => togglePopover('profile')}
                    >
                        <img
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                            alt="Profile"
                        />
                    </button>

                    {/* Profile Popover */}
                    {activePopover === 'profile' && (
                        <div className="absolute right-0 mt-3 w-[min(16rem,calc(100vw-2.5rem))] rounded-2xl border p-4 z-50 transition-all bg-[#FFFFFF] border-[#E6E5E1] text-[#16181F]">
                            <div className="flex items-center gap-3 pb-3 border-b border-[#E6E5E1]">
                                <img
                                    className="w-11 h-11 rounded-full object-cover border border-[#E6E5E1]"
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                                    alt="Profile"
                                />
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-sm truncate text-[#16181F]">{currentUser?.displayName || 'Community User'}</h4>
                                    <p className="text-xs text-[#6B7280] truncate">{currentUser?.email || 'user@example.com'}</p>
                                    <span className={`inline-block mt-1 text-xs sm:text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${currentUser?.role === 'superadmin' ? 'bg-[#0B6BCB]/15 text-[#0B6BCB]' : 'bg-[#157F3D]/15 text-[#157F3D]'}`}>
                                        {currentUser?.role === 'superadmin' ? 'Super Admin' : 'Simple User'}
                                    </span>
                                </div>
                            </div>
                            <div className="pt-3 space-y-2">
                                <button
                                    onClick={() => { setActivePopover(null); navigate('/dashboard'); }}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#FFFFFF] text-[#16181F]"
                                >
                                    <span aria-hidden="true" className="material-symbols-outlined text-base">dashboard</span>
                                    <span>Dashboard</span>
                                </button>
                                {currentUser?.role === 'superadmin' && (
                                    <>
                                        <button
                                            onClick={() => { setActivePopover(null); navigate('/admin/conversation-analysis'); }}
                                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#FFFFFF] text-[#0B6BCB]"
                                        >
                                            <span aria-hidden="true" className="material-symbols-outlined text-base">analytics</span>
                                            <span>Conversation Analysis</span>
                                        </button>
                                        <button
                                            onClick={() => { setActivePopover(null); navigate('/admin/manage-posts'); }}
                                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#FFFFFF] text-[#0B6BCB]"
                                        >
                                            <span aria-hidden="true" className="material-symbols-outlined text-base">admin_panel_settings</span>
                                            <span>System Moderation</span>
                                        </button>
                                    </>
                                )}
                                {currentUser?.role !== 'superadmin' && (
                                    <button
                                        onClick={() => { setActivePopover(null); navigate('/contact'); }}
                                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#FFFFFF] text-[#16181F]"
                                    >
                                        <span aria-hidden="true" className="material-symbols-outlined text-base">help_outline</span>
                                        <span>Help & Support</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => { setActivePopover(null); logout(); navigate('/login'); }}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#B42318] hover:bg-[#B42318]/10 flex items-center gap-2 cursor-pointer"
                                >
                                    <span aria-hidden="true" className="material-symbols-outlined text-base">logout</span>
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default AfterLoginHeader;

