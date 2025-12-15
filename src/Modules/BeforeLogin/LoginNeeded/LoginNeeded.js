import {
    Container,
    Grid,
    Box,
    Typography,
    Button
} from '@mui/material';
import { useNavigate } from "react-router";

import "./LoginNeeded.css";

function LoginNeeded() {
    const navigate = useNavigate();

    return (
        <Box class="LoginSignup" sx={{ position: 'relative', py: { xs: 4, md: 8 }, overflow: 'hidden' }}>
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${"images/Background2.webp"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.82,
                    zIndex: 0,
                    transform: 'scaleX(-1)'
                }}
            />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="center" justifyContent="space-evenly">
                    <Grid item xs={12} md={6} sx={{ maxWidth: 520 }}>
                        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                            <Box component="span" color="primary.main">Unlock</Box> exclusive content by <Box component="span" color="secondary.main">Signing</Box> in!
                        </Typography>
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button variant="outlined" color="primary" onClick={() => navigate('/login')} size="large">Login</Button>
                            <Button onClick={() => navigate('/signup')} variant="contained" color="secondary" size="large">Signup</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ maxWidth: 500 }}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <Box
                                component="img"
                                src="images/LoginNeeded.webp"
                                alt="Illustration of login needed"
                                loading="lazy"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    width: { xs: '80%', md: '100%' },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default LoginNeeded;