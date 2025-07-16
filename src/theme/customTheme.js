import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#38DFFF',
        },
        secondary: {
            main: '#FF9900',
        },
        background: {
            primary: '#020014',
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#020014',
            secondary: '#555555',
        },
        color: {
            white: '#FFFFFF',
        }
    },
    typography: {
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
    },
});

export default customTheme;