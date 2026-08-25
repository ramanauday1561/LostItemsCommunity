import { useNavigate, useLocation } from 'react-router-dom';
import { primaryNav } from './navItems';

// Mobile-only tab bar. Phones get every primary destination in one thumb-reach
// tap; the drawer it replaces cost two taps and an animation for the same trip.
// Desktop keeps the sidebar and never renders this (`md:hidden`).
function BottomNav({ onCreate }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Create sits between Lost and Found — the two lists you act on most.
    const left = primaryNav.slice(0, 2);
    const right = primaryNav.slice(2);

    const renderTab = (item) => {
        const isActive = location.pathname === item.path;
        return (
            <button
                key={item.path}
                onClick={() => navigate(item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex-1 min-w-0 h-14 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${isActive ? 'text-[#0B6BCB]' : 'text-[#6B7280]'}`}
            >
                <span aria-hidden="true" className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className={`text-[11px] leading-none truncate max-w-full px-0.5 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.short}
                </span>
            </button>
        );
    };

    return (
        <nav
            aria-label="Primary"
            className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFFFFF] border-t border-[#E6E5E1] pb-[env(safe-area-inset-bottom)]"
        >
            <div className="flex items-stretch">
                {left.map(renderTab)}

                <div className="flex-1 min-w-0 flex items-start justify-center">
                    <button
                        onClick={() => onCreate && onCreate('lost')}
                        aria-label="Report an item"
                        className="w-12 h-12 -mt-5 rounded-full bg-[#0B6BCB] text-white flex items-center justify-center border-4 border-[#FAFAF9] active:scale-95 transition-transform cursor-pointer"
                    >
                        <span aria-hidden="true" className="material-symbols-outlined text-2xl">add</span>
                    </button>
                </div>

                {right.map(renderTab)}
            </div>
        </nav>
    );
}

export default BottomNav;
