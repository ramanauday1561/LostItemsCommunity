import { Box, Container, Grid } from "@mui/material";

const ResponsiveContainer = ({ leftContent, rightContent, className="" }) => {
    return (
        <Box className={className} sx={{ position: 'relative', py: { xs: 4, md: 8 }, overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${"images/Background2.png"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1)'
                    }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="center" justifyContent="space-evenly">
                        <Grid item xs={12} md={6} sx={{ maxWidth: 490 }}>
                            {leftContent}
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 600 }}>
                            {rightContent}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
    );
};

export default ResponsiveContainer;