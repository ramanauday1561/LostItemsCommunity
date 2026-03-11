import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}), { virtual: true });

const mockUseAuth = jest.fn();

jest.mock('../../../context/AuthContext', () => ({
    useAuth: () => mockUseAuth(),
}));

describe('Dashboard role-based rendering', () => {
    test('renders superadmin-specific controls', () => {
        mockUseAuth.mockReturnValue({
            currentUser: { displayName: 'Super Admin', role: 'superadmin' },
        });

        render(<Dashboard />);

        expect(screen.getByText('Super Admin Controls')).toBeInTheDocument();
        expect(screen.getByText('Review Lost Reports')).toBeInTheDocument();
        expect(screen.queryByText('Report Lost Item')).not.toBeInTheDocument();
    });

    test('renders normal user features', () => {
        mockUseAuth.mockReturnValue({
            currentUser: { displayName: 'Apple User', role: 'user' },
        });

        render(<Dashboard />);

        expect(screen.getByText('Available Features')).toBeInTheDocument();
        expect(screen.getByText('Report Lost Item')).toBeInTheDocument();
        expect(screen.queryByText('Review Lost Reports')).not.toBeInTheDocument();
    });
});
