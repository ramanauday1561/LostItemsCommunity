
const communityComments = [
    {
        id: 1,
        user: 'Joyce',
        onItem: 'Rolex Submariner',
        time: '09:00 AM',
        text: 'Great news! I think I saw this matching description at the Central Station desk ⚡',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    {
        id: 2,
        user: 'Gladyce',
        onItem: 'MacBook Pro 16',
        time: '08:45 AM',
        text: 'Verified ownership serial number matches! Owner contacted successfully.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
];

function CommunityComments() {
    return (
        <div className="bg-[#FFFFFF] border border-[#E6E5E1] rounded-3xl p-6 space-y-5">
            <h2 className="text-xl font-extrabold text-[#16181F]">Comments</h2>

            <div className="space-y-4">
                {communityComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-3 bg-[#FFFFFF] rounded-2xl border border-[#E6E5E1]">
                        <img className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-[#0B6BCB]/40" src={comment.avatar} alt={comment.user} />
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-baseline">
                                <p className="text-xs font-bold text-[#16181F]">
                                    {comment.user} <span className="font-normal text-[#0B6BCB]">on {comment.onItem}</span>
                                </p>
                                <span className="text-xs sm:text-[10px] text-[#6B7280]">{comment.time}</span>
                            </div>
                            <p className="text-xs text-[#6B7280] leading-relaxed">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommunityComments;
