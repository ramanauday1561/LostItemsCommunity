// Single source of truth for status colours.
// Previously each screen defined its own mapping, so the same status rendered in
// opposite colours (an "Active" report was red on Search Lost and green on Search Found).
//
// Semantics: cyan = open / in progress, green = successfully closed,
//            red = needs admin attention, grey = not in circulation.
const STATUS_COLORS = {
    Active: '#6B7280',
    Normal: '#6B7280',
    Resolved: '#157F3D',
    Reunited: '#157F3D',
    Flagged: '#B42318',
    Offline: '#9CA3AF',
};

const FALLBACK = '#9CA3AF';

/**
 * Foreground colour for a status label.
 * @param {string} status
 * @returns {string} hex colour
 */
export function statusColor(status) {
    return STATUS_COLORS[status] || FALLBACK;
}

/**
 * Matching translucent background for a status chip.
 * @param {string} status
 * @param {number} [alpha=0.15]
 * @returns {string} rgba colour
 */
export function statusBg(status, alpha = 0.15) {
    const hex = statusColor(status);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
