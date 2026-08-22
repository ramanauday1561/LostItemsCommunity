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

// AfterLogin runs its own minimalist light theme: one accent, hairline borders,
// no elevation, and phone touch-target minimums. Kept separate from the shared
// light/dark themes so the BeforeLogin pages are untouched.
const PHONE = '@media (max-width:599.95px)';

export const afterLoginTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#0B6BCB' },
        success: { main: '#157F3D' },
        error: { main: '#B42318' },
        divider: '#E6E5E1',
        background: { default: '#FAFAF9', paper: '#FFFFFF' },
        text: { primary: '#16181F', secondary: '#6B7280' },
    },
    typography: {
        ...sharedTypography,
        fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui, "Helvetica Neue", sans-serif',
    },
    shape: { borderRadius: 8 },
    components: {
        MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
        MuiCard: {
            styleOverrides: {
                root: { border: '1px solid #E6E5E1', boxShadow: 'none', backgroundColor: '#FFFFFF' },
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: { textTransform: 'none', fontWeight: 500, boxShadow: 'none', [PHONE]: { minHeight: 44 } },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: { backgroundColor: '#FFFFFF', [PHONE]: { minHeight: 44 } },
                notchedOutline: { borderColor: '#E6E5E1' },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: { [PHONE]: { '&.MuiChip-clickable': { height: 44, borderRadius: 22 } } },
                label: { [PHONE]: { fontSize: '0.75rem' } },
            },
        },
        MuiIconButton: { styleOverrides: { root: { [PHONE]: { minWidth: 44, minHeight: 44 } } } },
        MuiTableCell: {
            styleOverrides: {
                root: { color: '#16181F', borderColor: '#F1F0EE' },
                head: { color: '#6B7280', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.07em', textTransform: 'uppercase' },
            },
        },
        MuiDialog: { styleOverrides: { paper: { border: '1px solid #E6E5E1', boxShadow: 'none' } } },
        MuiTab: { styleOverrides: { root: { textTransform: 'none', [PHONE]: { minHeight: 44 } } } },
    },
});

// Default export kept for backward compatibility
const customTheme = darkTheme;
export default customTheme;