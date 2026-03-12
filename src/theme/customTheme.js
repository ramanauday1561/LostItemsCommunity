import { createTheme } from '@mui/material/styles';

const sharedTypography = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 700,
    },
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
    },
};

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#38DFFF',
        },
        secondary: {
            main: '#FF9900',
        },
        background: {
            default: '#030014',
            paper: '#0a0a2e',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.7)',
        },
    },
    typography: sharedTypography,
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#FF9900',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a2e',
            secondary: '#555555',
        },
    },
    typography: sharedTypography,
});

// Default export kept for backward compatibility
const customTheme = darkTheme;
export default customTheme;