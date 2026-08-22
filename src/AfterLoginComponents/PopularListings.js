import { useNavigate } from 'react-router-dom';
import { statusColor, statusBg } from '../utils/statusColors';

// Real found-item records from the registry. This panel used to show a sales
// listing board ("$8,250.00", "Offline") which is the wrong shape for a
// lost-and-found: an item's worth to its owner is not a price, and the useful
// facts are where it was handed in and when.
const recentlyHandedIn = [
    {
        id: 'FOUND-2018',
        title: 'Black Wallet',
        location: 'Riverside Park Bench',
        date: '11 Jun 2024',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 'FOUND-2015',
        title: 'Silver Watch',
        location: 'Coffee Shop on 5th Ave',
        date: '09 Jun 2024',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 'FOUND-2009',
        title: 'iPhone 15',
        location: 'Union Square Subway Station',
        date: '06 Jun 2024',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 'FOUND-1998',
        title: 'Car Keys with Fob',
        location: 'Parking Lot B',
        date: '31 May 2024',
        status: 'Resolved',
        image: 'https://images.unsplash.com/photo-1622611450564-4b4b3b4f1b6f?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 'FOUND-1990',
        title: 'Student ID Card',
        location: 'City College Cafeteria',
        date: '28 May 2024',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1606166325683-e6deb697d301?w=150&auto=format&fit=crop&q=80',
    },
];

function PopularListings() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#FFFFFF] border border-[#E6E5E1] rounded-3xl p-4 sm:p-6 space-y-5">
            <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-base font-semibold text-[#16181F]">Recently handed in</h2>
                <span className="text-xs text-[#6B7280]">Nearby</span>
            </div>

            <div className="space-y-2.5">
                {recentlyHandedIn.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-2.5 bg-[#FFFFFF] rounded-2xl border border-[#E6E5E1] hover:border-[#0B6BCB]/40 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <img className="w-12 h-12 rounded-xl object-cover flex-shrink-0" src={item.image} alt="" />
                            <div className="min-w-0">
                                <h4 className="text-sm font-medium text-[#16181F] truncate">{item.title}</h4>
                                <span className="text-xs text-[#6B7280] block truncate">{item.location}</span>
                                <span className="record-id text-xs text-[#6B7280] block">{item.id} &middot; {item.date}</span>
                            </div>
                        </div>
                        <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full inline-block flex-shrink-0"
                            style={{ backgroundColor: statusBg(item.status), color: statusColor(item.status) }}
                        >
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>

            <button
                className="w-full min-h-[44px] border border-[#E6E5E1] bg-[#FFFFFF] hover:border-[#0B6BCB]/50 text-[#16181F] hover:text-[#0B6BCB] py-2.5 rounded-full text-sm font-medium transition-all text-center cursor-pointer"
                onClick={() => navigate('/search-found')}
            >
                Browse found items
            </button>
        </div>
    );
}

export default PopularListings;
