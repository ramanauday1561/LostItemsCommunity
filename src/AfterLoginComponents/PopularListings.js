import React from 'react';
import { useNavigate } from 'react-router-dom';

const popularListings = [
    {
        id: 1,
        title: 'Rolex Submariner Watch',
        category: 'Jewelry & Watches',
        value: '$8,250.00',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 2,
        title: 'MacBook Pro 16 M3',
        category: 'Electronics',
        value: '$2,890.00',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 3,
        title: 'Gucci Leather Duffel Bag',
        category: 'Travel Gear',
        value: '$1,500.00',
        status: 'Offline',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 4,
        title: 'Canon EOS R6 Camera',
        category: 'Photography',
        value: '$2,499.00',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 5,
        title: 'Gold Diamond Ring',
        category: 'Jewelry',
        value: '$4,750.00',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=150&auto=format&fit=crop&q=80',
    },
];

function PopularListings() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1E212B] border border-[#262A36] rounded-3xl p-6 space-y-5">
            <h2 className="text-xl font-extrabold text-[#F4F5F6]">Popular listings</h2>

            <div className="space-y-3.5">
                {popularListings.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 p-2 bg-[#14161D] rounded-2xl border border-[#262A36] hover:border-[#38DFFF]/40 transition-all cursor-pointer">
                        <div className="flex items-center gap-3 min-w-0">
                            <img className="w-12 h-12 rounded-xl object-cover flex-shrink-0" src={item.image} alt={item.title} />
                            <div className="min-w-0">
                                <h4 className="text-xs font-bold text-[#F4F5F6] truncate">{item.title}</h4>
                                <span className="text-[10px] text-[#9A9FA5] block truncate">{item.category}</span>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <span className="text-xs font-extrabold text-[#38DFFF] block">{item.value}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${item.status === 'Active' ? 'bg-[#00FF9D]/15 text-[#00FF9D]' : 'bg-[#FF5376]/15 text-[#FF5376]'}`}>
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="w-full border border-[#262A36] bg-[#14161D] hover:border-[#38DFFF]/50 text-[#F4F5F6] hover:text-[#38DFFF] py-2.5 rounded-full text-xs font-bold transition-all text-center cursor-pointer"
                onClick={() => navigate('/search-lost')}
            >
                All listings
            </button>
        </div>
    );
}

export default PopularListings;
