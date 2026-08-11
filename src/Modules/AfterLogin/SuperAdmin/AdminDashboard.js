import React, { useState } from 'react';
import AfterLoginLayout from '../../../AfterLoginComponents/AfterLoginLayout';
import OverviewSection from '../../../AfterLoginComponents/OverviewSection';
import AnalyticsChart from '../../../AfterLoginComponents/AnalyticsChart';
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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
} from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const initialFlaggedItems = [
    { id: 'LOST-1031', title: 'Samsung Galaxy S24', author: 'alex.j', category: 'Electronics', reason: 'Unverified ownership claim', date: '2024-06-05' },
    { id: 'FOUND-2009', title: 'iPhone 15', author: 'subway.finder', category: 'Electronics', reason: 'Suspicious contact info', date: '2024-06-06' },
    { id: 'POST-091', title: 'Lost: Vintage Polaroid Camera', author: 'emily.c', category: 'Forum', reason: 'Spam / Repeated links', date: '2024-06-07' },
];

function AdminDashboard() {
    const navigate = useNavigate();
    const [flaggedItems, setFlaggedItems] = useState(initialFlaggedItems);
    const [actionMessage, setActionMessage] = useState('');

    const handleDeleteItem = (id) => {
        setFlaggedItems((prev) => prev.filter((item) => item.id !== id));
        setActionMessage(`Item ${id} was permanently deleted by Super Admin.`);
        setTimeout(() => setActionMessage(''), 3500);
    };

    const handleApproveItem = (id) => {
        setFlaggedItems((prev) => prev.filter((item) => item.id !== id));
        setActionMessage(`Item ${id} was approved and unflagged.`);
        setTimeout(() => setActionMessage(''), 3500);
    };

    const textColor = '#F4F5F6';
    const subTextColor = '#9A9FA5';
    const cardBg = '#1E212B';
    const cardBorder = '#262A36';

    return (
        <AfterLoginLayout pageTitle="Super Admin Management Dashboard">
            <Container maxWidth="xl" sx={{ py: 1, px: { xs: 1, sm: 2 } }}>
                {/* Super Admin Control Header */}
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ p: 1.5, borderRadius: '20px', bgcolor: 'rgba(56, 223, 255, 0.15)', color: '#38DFFF' }}>
                            <ShieldIcon sx={{ fontSize: 36 }} />
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>
                                    System Control & Moderation Hub
                                </Typography>
                                <Chip label="Super Admin Authority" size="small" sx={{ bgcolor: 'rgba(56, 223, 255, 0.2)', color: '#38DFFF', fontWeight: 800, borderRadius: '8px' }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: subTextColor, mt: 0.5 }}>
                                Full platform management: conversation analysis, moderation, and content deletion.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button
                            variant="contained"
                            startIcon={<AnalyticsIcon />}
                            onClick={() => navigate('/admin/conversation-analysis')}
                            sx={{
                                borderRadius: '16px',
                                fontWeight: 800,
                                px: 3,
                                py: 1.2,
                                textTransform: 'none',
                                background: 'linear-gradient(135deg, #38DFFF 0%, #00B2FE 100%)',
                                color: '#0D0E12',
                            }}
                        >
                            Conversation Analysis
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/admin/manage-posts')}
                            sx={{
                                borderRadius: '16px',
                                fontWeight: 800,
                                px: 3,
                                py: 1.2,
                                textTransform: 'none',
                                borderColor: cardBorder,
                                color: textColor,
                                '&:hover': { borderColor: '#38DFFF', bgcolor: 'rgba(56, 223, 255, 0.1)' },
                            }}
                        >
                            Moderation Center
                        </Button>
                    </Box>
                </Box>

                {actionMessage && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(0, 255, 157, 0.15)', color: textColor, border: '1px solid rgba(0, 255, 157, 0.3)' }} onClose={() => setActionMessage('')}>
                            {actionMessage}
                        </Alert>
                    </Box>
                )}

                {/* Conversation Analysis & Sentiment Banner Card */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', mb: 4, p: 1 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} lg={8}>
                                <Typography variant="h6" fontWeight={800} sx={{ color: textColor, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AnalyticsIcon sx={{ color: '#38DFFF' }} /> Community Conversation & Sentiment Analysis
                                </Typography>
                                <Typography variant="body2" sx={{ color: subTextColor, lineHeight: 1.6 }}>
                                    Real-time tracking of community forum messages, response velocity, and flagged safety keywords.
                                    Total active discussions: <strong style={{ color: '#F4F5F6' }}>142 threads</strong> | Positive sentiment rate: <strong style={{ color: '#00FF9D' }}>94.2%</strong>
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                                    <Box sx={{ bgcolor: '#14161D', px: 2, py: 1, borderRadius: '12px', border: `1px solid ${cardBorder}` }}>
                                        <Typography variant="caption" sx={{ color: subTextColor }}>Avg Response Velocity</Typography>
                                        <Typography variant="body2" fontWeight={800} sx={{ color: '#38DFFF' }}>12.4 minutes</Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: '#14161D', px: 2, py: 1, borderRadius: '12px', border: `1px solid ${cardBorder}` }}>
                                        <Typography variant="caption" sx={{ color: subTextColor }}>Flagged Keyword Alerts</Typography>
                                        <Typography variant="body2" fontWeight={800} sx={{ color: '#FF5376' }}>3 pending review</Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: '#14161D', px: 2, py: 1, borderRadius: '12px', border: `1px solid ${cardBorder}` }}>
                                        <Typography variant="caption" sx={{ color: subTextColor }}>Active Scouts</Typography>
                                        <Typography variant="body2" fontWeight={800} sx={{ color: '#00FF9D' }}>857 online</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={4} sx={{ textAlign: { lg: 'right' } }}>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/admin/conversation-analysis')}
                                    sx={{
                                        borderRadius: '14px',
                                        fontWeight: 800,
                                        px: 3,
                                        py: 1.2,
                                        background: 'linear-gradient(135deg, #A855F7 0%, #9c27b0 100%)',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    Open Full Analysis Hub
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Flagged Content Quick Action Table */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', mb: 4 }}>
                    <Box sx={{ px: 3, py: 2.5, borderBottom: `1px solid ${cardBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FlagIcon sx={{ color: '#FF5376' }} />
                            <Typography variant="h6" fontWeight={800} sx={{ color: textColor }}>
                                Flagged Content Pending Moderation ({flaggedItems.length})
                            </Typography>
                        </Box>
                        <Button size="small" onClick={() => navigate('/admin/manage-posts')} sx={{ color: '#38DFFF', fontWeight: 700 }}>
                            View All Moderation Records →
                        </Button>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#14161D' }}>
                                <TableRow>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>ID</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Title</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Author</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Flag Reason</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Date</TableCell>
                                    <TableCell align="right" sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Admin Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {flaggedItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 3, color: subTextColor, borderColor: cardBorder }}>
                                            No flagged content pending review. All items clean!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    flaggedItems.map((row) => (
                                        <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#1B1E27' } }}>
                                            <TableCell sx={{ color: textColor, fontWeight: 700, borderColor: cardBorder }}>{row.id}</TableCell>
                                            <TableCell sx={{ color: textColor, fontWeight: 600, borderColor: cardBorder }}>{row.title}</TableCell>
                                            <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.author}</TableCell>
                                            <TableCell sx={{ borderColor: cardBorder }}>
                                                <Chip label={row.reason} size="small" sx={{ fontWeight: 700, bgcolor: 'rgba(255, 83, 118, 0.15)', color: '#FF5376' }} />
                                            </TableCell>
                                            <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.date}</TableCell>
                                            <TableCell align="right" sx={{ borderColor: cardBorder }}>
                                                <Button
                                                    size="small"
                                                    startIcon={<CheckCircleIcon />}
                                                    onClick={() => handleApproveItem(row.id)}
                                                    sx={{ mr: 1, fontWeight: 700, textTransform: 'none', color: '#00FF9D' }}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="small"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDeleteItem(row.id)}
                                                    sx={{ fontWeight: 700, textTransform: 'none', color: '#FF5376' }}
                                                >
                                                    Delete Post
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>

                {/* Dashboard Analytics & Listings Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
                    <div className="lg:col-span-8 space-y-6">
                        <OverviewSection />
                        <AnalyticsChart />
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <PopularListings />
                        <CommunityComments />
                    </div>
                </div>
            </Container>
        </AfterLoginLayout>
    );
}

export default AdminDashboard;
