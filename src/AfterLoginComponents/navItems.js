// One nav definition shared by the desktop sidebar and the mobile bottom bar,
// so adding a destination is a one-line edit instead of two lists drifting apart.
// `short` is the bottom-bar label — five slots across 375px only fit one word.

export const primaryNav = [
    { path: '/dashboard', icon: 'grid_view', label: 'Dashboard', short: 'Home' },
    { path: '/search-lost', icon: 'view_in_ar', label: 'Lost Items', short: 'Lost' },
    { path: '/search-found', icon: 'storefront', label: 'Found Items', short: 'Found' },
    { path: '/forum', icon: 'chat_bubble_outline', label: 'Community', short: 'Forum' },
];

export const adminNav = [
    { path: '/admin/conversation-analysis', icon: 'analytics', label: 'Analysis' },
    { path: '/admin/manage-posts', icon: 'pie_chart_outline', label: 'Moderation' },
];

export const userNav = [
    { path: '/contact', icon: 'support_agent', label: 'Contact Support' },
];
