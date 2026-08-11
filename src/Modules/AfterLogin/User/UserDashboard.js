import React from 'react';
import AfterLoginLayout from '../../../AfterLoginComponents/AfterLoginLayout';
import PopularListings from '../../../AfterLoginComponents/PopularListings';
import CommunityComments from '../../../AfterLoginComponents/CommunityComments';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Chip,
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SearchIcon from '@mui/icons-material/Search';
import ForumIcon from '@mui/icons-material/Forum';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function UserDashboard() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const textColor = '#F4F5F6';
    const subTextColor = '#9A9FA5';
    const cardBg = '#1E212B';
    const cardBorder = '#262A36';

    const userName = currentUser?.displayName || 'Community Member';

    return (
        <AfterLoginLayout pageTitle="My Dashboard">
            <Container maxWidth="xl" sx={{ py: 1, px: { xs: 1, sm: 2 } }}>
                
                {/* Personalized Welcome Banner */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '28px', mb: 4, p: 1 }}>
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                    <Chip label="Community Member" size="small" sx={{ bgcolor: 'rgba(0, 255, 157, 0.15)', color: '#00FF9D', fontWeight: 800, borderRadius: '8px' }} />
                                    <Typography variant="caption" sx={{ color: subTextColor }}>TrustFound Network</Typography>
                                </Box>
                                <Typography variant="h4" fontWeight={800} sx={{ color: textColor, mb: 1 }}>
                                    Welcome back, {userName}! 👋
                                </Typography>
                                <Typography variant="body1" sx={{ color: subTextColor, lineHeight: 1.6, maxWidth: 650 }}>
                                    Search our community registry to find lost belongings, report items you've found, or connect with members in the forum.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { md: 'flex-end' } }}>
                                <Button
                                    variant="contained"
                                    startIcon={<ReportProblemIcon />}
                                    onClick={() => navigate('/report-lost')}
                                    sx={{
                                        borderRadius: '16px',
                                        fontWeight: 800,
                                        px: 3,
                                        py: 1.3,
                                        textTransform: 'none',
                                        background: 'linear-gradient(135deg, #38DFFF 0%, #00B2FE 100%)',
                                        color: '#0D0E12',
                                    }}
                                >
                                    Report Lost
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<FindInPageIcon />}
                                    onClick={() => navigate('/report-found')}
                                    sx={{
                                        borderRadius: '16px',
                                        fontWeight: 800,
                                        px: 3,
                                        py: 1.3,
                                        textTransform: 'none',
                                        background: 'linear-gradient(135deg, #FFB800 0%, #FF9800 100%)',
                                        color: '#0D0E12',
                                    }}
                                >
                                    Report Found
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Personal Activity Summary Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                        <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', p: 1 }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
                                <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: 'rgba(56, 223, 255, 0.15)', color: '#38DFFF' }}>
                                    <ReportProblemIcon />
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700 }}>My Active Reports</Typography>
                                    <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>2 items</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', p: 1 }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
                                <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: 'rgba(0, 255, 157, 0.15)', color: '#00FF9D' }}>
                                    <CheckCircleIcon />
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700 }}>Items Reunited</Typography>
                                    <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>1 item</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', p: 1 }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
                                <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}>
                                    <ForumIcon />
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700 }}>Forum Discussions</Typography>
                                    <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>4 posts</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Quick Navigation Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Card
                            elevation={0}
                            onClick={() => navigate('/search-lost')}
                            sx={{
                                backgroundColor: cardBg,
                                border: `1px solid ${cardBorder}`,
                                borderRadius: '24px',
                                p: 3,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': { borderColor: '#38DFFF', transform: 'translateY(-2px)' },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ p: 2, borderRadius: '20px', bgcolor: 'rgba(56, 223, 255, 0.15)', color: '#38DFFF' }}>
                                    <SearchIcon sx={{ fontSize: 28 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" fontWeight={800} sx={{ color: textColor }}>
                                        Search Lost Items Registry
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: subTextColor, mt: 0.5 }}>
                                        Browse recent lost items reported by community members in your city.
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            elevation={0}
                            onClick={() => navigate('/search-found')}
                            sx={{
                                backgroundColor: cardBg,
                                border: `1px solid ${cardBorder}`,
                                borderRadius: '24px',
                                p: 3,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': { borderColor: '#FFB800', transform: 'translateY(-2px)' },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ p: 2, borderRadius: '20px', bgcolor: 'rgba(255, 184, 0, 0.15)', color: '#FFB800' }}>
                                    <FindInPageIcon sx={{ fontSize: 28 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" fontWeight={800} sx={{ color: textColor }}>
                                        Search Found Items Registry
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: subTextColor, mt: 0.5 }}>
                                        Check if someone found your item and submitted it to the registry.
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Popular Listings & Community Discussion Column */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
                    <div className="lg:col-span-6 space-y-6">
                        <PopularListings />
                    </div>
                    <div className="lg:col-span-6 space-y-6">
                        <CommunityComments />
                    </div>
                </div>
            </Container>
        </AfterLoginLayout>
    );
}

export default UserDashboard;
