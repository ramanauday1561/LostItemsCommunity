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
                <button className="md:hidden p-2 rounded-xl bg-[#F4F5F6] text-[#1A1D1F]" onClick={toggleSidebar}>
                    <span className="material-symbols-outlined text-xl">menu</span>
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1D1F]">{title}</h1>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end relative">
                {/* Pill Search Field */}
                <div className="relative flex-1 sm:w-72">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9FA5] text-lg">search</span>
                    <input
                        type="text"
                        placeholder="Search anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-none rounded-full pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-black/10 outline-none placeholder:text-[#9A9FA5] bg-[#F4F5F6] text-[#1A1D1F]"
                    />
                </div>

                {/* Black Pill CTA Button */}
                <button
                    className="bg-[#1A1D1F] hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
                    onClick={() => onOpenReportModal && onOpenReportModal('lost')}
                >
                    <span className="material-symbols-outlined text-base">add</span>
                    <span>Create</span>
                </button>

                {/* Header Action Icons */}

                {/* Notification Icon */}
                <div className="relative">
                    <button
                        className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors relative cursor-pointer bg-[#F4F5F6] border-black/5 text-[#1A1D1F] hover:bg-white"
                        onClick={() => togglePopover('notifications')}
                        title="Notifications"
                    >
                        <span className="material-symbols-outlined text-lg">notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                        )}
                    </button>

                    {/* Notifications Popover */}
                    {activePopover === 'notifications' && (
                        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl shadow-2xl border p-4 z-50 transition-all bg-white border-black/10 text-[#1A1D1F]">
                            <div className="flex items-center justify-between pb-3 border-b border-black/10">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-sm">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <span className="bg-red-500/10 text-red-500 text-xs px-2 py-0.5 rounded-full font-bold">{unreadCount} new</span>
                                    )}
                                </div>
                                {unreadCount > 0 && (
                                    <button onClick={handleMarkAllRead} className="text-xs text-blue-500 hover:underline font-semibold cursor-pointer">
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-72 overflow-y-auto space-y-3 pt-3">
                                {notifications.map((n) => (
                                    <div key={n.id} className={`p-2.5 rounded-xl border text-xs space-y-1 transition-colors ${n.unread ? 'bg-blue-50/60 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className="flex justify-between items-center font-bold">
                                            <span>{n.title}</span>
                                            <span className="text-[10px] text-[#9A9FA5]">{n.time}</span>
                                        </div>
                                        <p className="text-[#6F767E] text-[11px] leading-relaxed">{n.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Message Icon */}
                <div className="relative">
                    <button
                        className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer bg-[#F4F5F6] border-black/5 text-[#1A1D1F] hover:bg-white"
                        onClick={() => togglePopover('messages')}
                        title="Messages"
                    >
                        <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                    </button>

                    {/* Messages Popover */}
                    {activePopover === 'messages' && (
                        <div className="absolute right-0 mt-3 w-80 sm:w-90 rounded-2xl shadow-2xl border p-4 z-50 transition-all bg-white border-black/10 text-[#1A1D1F]">
                            <div className="flex items-center justify-between pb-3 border-b border-black/10">
                                <h3 className="font-bold text-sm">Community Messages</h3>
                                <button onClick={() => navigate('/forum')} className="text-xs text-blue-500 hover:underline font-semibold cursor-pointer">
                                    Open Forum
                                </button>
                            </div>
                            <div className="max-h-72 overflow-y-auto space-y-3 pt-3">
                                {messages.map((m) => (
                                    <div key={m.id} className="p-2.5 rounded-xl border flex gap-3 items-center cursor-pointer hover:opacity-90 bg-gray-50 border-gray-100">
                                        <img src={m.avatar} alt={m.sender} className="w-9 h-9 rounded-full object-cover" />
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center text-xs font-bold">
                                                <span>{m.sender}</span>
                                                <span className="text-[10px] text-[#9A9FA5]">{m.time}</span>
                                            </div>
                                            <p className="text-[#6F767E] text-[11px] truncate">{m.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile Avatar */}
                <div className="relative">
                    <div
                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-black/10 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-black/20 transition-all"
                        title={currentUser?.displayName || 'User Profile'}
                        onClick={() => togglePopover('profile')}
                    >
                        <img
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                            alt="Profile"
                        />
                    </div>

                    {/* Profile Popover */}
                    {activePopover === 'profile' && (
                        <div className="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl border p-4 z-50 transition-all bg-white border-black/10 text-[#1A1D1F]">
                            <div className="flex items-center gap-3 pb-3 border-b border-black/10">
                                <img
                                    className="w-11 h-11 rounded-full object-cover border"
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                                    alt="Profile"
                                />
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-sm truncate">{currentUser?.displayName || 'Community Scout'}</h4>
                                    <p className="text-xs text-[#6F767E] truncate">{currentUser?.email || 'user@example.com'}</p>
                                    <span className="inline-block mt-1 bg-green-500/10 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                                        {currentUser?.role || 'Member'}
                                    </span>
                                </div>
                            </div>
                            <div className="pt-3 space-y-2">
                                <button
                                    onClick={() => { setActivePopover(null); navigate('/dashboard'); }}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-[#1A1D1F]"
                                >
                                    <span className="material-symbols-outlined text-base">dashboard</span>
                                    <span>Dashboard</span>
                                </button>
                                <button
                                    onClick={() => { setActivePopover(null); navigate('/contact'); }}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-[#1A1D1F]"
                                >
                                    <span className="material-symbols-outlined text-base">help_outline</span>
                                    <span>Help & Support</span>
                                </button>
                                <button
                                    onClick={() => { setActivePopover(null); logout(); navigate('/login'); }}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-base">logout</span>
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

