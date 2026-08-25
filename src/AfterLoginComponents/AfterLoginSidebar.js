import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { primaryNav, adminNav, userNav } from './navItems';

// Desktop only. Phones navigate from BottomNav, so the off-canvas drawer, its
// backdrop, its open/closed state and the slide transition are all gone —
// which also removes the `window.innerWidth` read that broke on rotation.
function AfterLoginSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const isSuperAdmin = currentUser?.role === 'superadmin';

    const items = [...primaryNav, ...(isSuperAdmin ? adminNav : userNav)];

    const getLinkClass = (path) =>
        location.pathname === path
            ? 'bg-[#EDF4FC] text-[#0B6BCB] font-semibold'
            : 'text-[#6B7280] hover:text-[#16181F] hover:bg-[#F4F3F1]';

    return (
        <aside className="hidden md:flex relative w-64 shrink-0 bg-[#FFFFFF] text-[#16181F] flex-col justify-between p-6 border-r border-[#E6E5E1]">
            <div className="space-y-8">
                {/* Brand Logo */}
                <button className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="w-10 h-10 bg-[#0B6BCB] text-white rounded-full flex items-center justify-center">
                        <span aria-hidden="true" className="material-symbols-outlined text-xl font-bold">token</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#16181F]">TrustFound</span>
                </button>

                <nav className="space-y-1.5">
                    {items.map((item) => (
                        <button
                            key={item.path}
                            aria-current={location.pathname === item.path ? 'page' : undefined}
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${getLinkClass(item.path)}`}
                            onClick={() => navigate(item.path)}
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Bottom Controls */}
            {currentUser && (
                <div className="pt-6 space-y-1 border-t border-[#E6E5E1]">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[#16181F] truncate">{currentUser.displayName}</span>
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full shrink-0 ${isSuperAdmin ? 'bg-[#0B6BCB]/20 text-[#0B6BCB]' : 'bg-[#157F3D]/20 text-[#157F3D]'}`}>
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
        </aside>
    );
}

export default AfterLoginSidebar;
