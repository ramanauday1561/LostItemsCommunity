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
import { textColor, subTextColor, cardBg, cardBorder } from '../../../utils/afterLoginTokens';

// Three near-identical stat cards collapsed into data. Labels are short enough
// to survive a 110px-wide column, so no per-breakpoint copy is needed.
const activitySummary = [
    { label: 'Active Reports', value: '2', icon: <ReportProblemIcon />, color: '#0B6BCB', tint: 'rgba(11, 107, 203, 0.15)' },
    { label: 'Reunited', value: '1', icon: <CheckCircleIcon />, color: '#157F3D', tint: 'rgba(21, 127, 61, 0.15)' },
    { label: 'Forum Posts', value: '4', icon: <ForumIcon />, color: '#0B6BCB', tint: 'rgba(11, 107, 203, 0.15)' },
];

const registryShortcuts = [
    { path: '/search-lost', title: 'Search Lost Items Registry', desc: 'Browse recent lost items reported by community members in your city.', icon: <SearchIcon /> },
    { path: '/search-found', title: 'Search Found Items Registry', desc: 'Check if someone found your item and submitted it to the registry.', icon: <FindInPageIcon /> },
];

function UserDashboard() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const userName = currentUser?.displayName || 'Community Member';

    return (
        <AfterLoginLayout pageTitle="My Dashboard">
            <Container maxWidth="xl" sx={{ py: { xs: 0, sm: 1 }, px: { xs: 0, sm: 2 } }}>
                
                {/* Personalized Welcome Banner */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '28px', mb: { xs: 3, md: 4 } }}>
                    <CardContent sx={{ p: { xs: 2.5, sm: 4 }, '&:last-child': { pb: { xs: 2.5, sm: 4 } } }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                            <Grid size={{ xs: 12, md: 'grow' }} sx={{ minWidth: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                    <Chip label="Community Member" size="small" sx={{ bgcolor: 'rgba(21, 127, 61, 0.15)', color: '#157F3D', fontWeight: 800, borderRadius: '8px' }} />
                                    <Typography variant="caption" sx={{ color: subTextColor }}>TrustFound Network</Typography>
                                </Box>
                                <Typography variant="h4" fontWeight={800} sx={{ color: textColor, mb: 1, fontSize: { xs: '1.375rem', sm: '2.125rem' } }}>
                                    Welcome back, {userName}! 👋
                                </Typography>
                                {/* Phones get this same guidance from the tab bar and the two
                                    navigation cards below, so it only costs a screen of scrolling. */}
                                <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' }, color: subTextColor, lineHeight: 1.6, maxWidth: 650 }}>
                                    Search our community registry to find lost belongings, report items you've found, or connect with members in the forum.
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 'auto' }} sx={{ display: 'flex', gap: 1.5, justifyContent: { md: 'flex-end' }, '& > button': { flex: { xs: 1, md: 'none' } } }}>
                                <Button
                                    variant="contained"
                                    startIcon={<ReportProblemIcon />}
                                    onClick={() => navigate('/report-lost')}
                                    sx={{
                                        borderRadius: '16px',
                                        fontWeight: 800,
                                        px: { xs: 1.5, sm: 3 },
                                        py: 1.2,
                                        whiteSpace: 'nowrap',
                                        textTransform: 'none',
                                        background: '#0B6BCB',
                                        color: '#FFFFFF',
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
                                        px: { xs: 1.5, sm: 3 },
                                        py: 1.2,
                                        whiteSpace: 'nowrap',
                                        textTransform: 'none',
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid #E6E5E1',
                                        color: '#16181F',
                                    }}
                                >
                                    Report Found
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Personal Activity Summary Grid */}
                <Grid container spacing={{ xs: 1.5, sm: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
                    {activitySummary.map((stat) => (
                        <Grid key={stat.label} size={{ xs: 4 }}>
                            <Card elevation={0} sx={{ height: '100%', backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '20px' }}>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, p: { xs: 1.5, sm: 2.5 }, '&:last-child': { pb: { xs: 1.5, sm: 2.5 } }, flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
                                    <Box sx={{ display: 'flex', p: { xs: 1, sm: 1.5 }, borderRadius: '14px', bgcolor: stat.tint, color: stat.color }}>
                                        {stat.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight={800} sx={{ color: textColor, lineHeight: 1.2 }}>{stat.value}</Typography>
                                        <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 600, display: 'block', lineHeight: 1.3 }}>{stat.label}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {/* Quick Navigation Cards */}
                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
                    {registryShortcuts.map((card) => (
                        <Grid key={card.path} size={{ xs: 12, md: 6 }}>
                            <Card
                                elevation={0}
                                component="button"
                                onClick={() => navigate(card.path)}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    textAlign: 'left',
                                    font: 'inherit',
                                    backgroundColor: cardBg,
                                    border: `1px solid ${cardBorder}`,
                                    borderRadius: '24px',
                                    p: { xs: 2, md: 3 },
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { borderColor: '#0B6BCB', transform: 'translateY(-2px)' },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ display: 'flex', flexShrink: 0, p: { xs: 1.25, md: 2 }, borderRadius: '18px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }}>
                                        {card.icon}
                                    </Box>
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography variant="h6" fontWeight={800} sx={{ color: textColor, fontSize: { xs: '0.95rem', md: '1.25rem' }, lineHeight: 1.3 }}>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: subTextColor, mt: 0.5, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                                            {card.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
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
