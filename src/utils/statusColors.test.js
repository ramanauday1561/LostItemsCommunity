import { statusColor, statusBg } from './statusColors';

describe('statusColors', () => {
    it('gives one status exactly one colour', () => {
        expect(statusColor('Active')).toBe('#6B7280');
        expect(statusColor('Flagged')).toBe('#B42318');
        expect(statusColor('Resolved')).toBe(statusColor('Reunited'));
    });

    it('never lets success and danger collide', () => {
        expect(statusColor('Resolved')).not.toBe(statusColor('Flagged'));
        expect(statusColor('Active')).not.toBe(statusColor('Resolved'));
    });

    it('falls back to muted grey for an unknown status', () => {
        expect(statusColor('SomethingNew')).toBe('#9CA3AF');
    });

    it('derives the chip background from the same colour', () => {
        expect(statusBg('Flagged')).toBe('rgba(180, 35, 24, 0.15)');
        expect(statusBg('Resolved', 0.3)).toBe('rgba(21, 127, 61, 0.3)');
    });
});
