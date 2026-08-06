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
            default: '#121316',
            paper: '#1F2128',
        },
        text: {
            primary: '#F4F5F6',
            secondary: '#9A9FA5',
        },
    },
    typography: sharedTypography,
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: '#F4F5F6',
                },
            },
        },
    },
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
            primary: '#1A1D1F',
            secondary: '#6F767E',
        },
    },
    typography: sharedTypography,
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: '#1A1D1F',
                },
            },
        },
    },
});

// Default export kept for backward compatibility
const customTheme = darkTheme;
export default customTheme;