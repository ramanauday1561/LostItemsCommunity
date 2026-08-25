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
import { textColor, subTextColor, cardBg, cardBorder } from '../../../utils/afterLoginTokens';

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

    return (
        <AfterLoginLayout pageTitle="Admin Dashboard">
            <Container maxWidth="xl" sx={{ py: { xs: 0, sm: 1 }, px: { xs: 0, sm: 2 } }}>
                {/* Super Admin Control Header */}
                <Box sx={{ mb: { xs: 3, md: 4 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                        <Box sx={{ p: { xs: 1, sm: 1.5 }, display: 'flex', flexShrink: 0, borderRadius: '20px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }}>
                            <ShieldIcon sx={{ fontSize: { xs: 26, sm: 36 } }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                <Typography variant="h5" fontWeight={800} sx={{ color: textColor, fontSize: { xs: '1.125rem', sm: '1.5rem' } }}>
                                    System Control & Moderation Hub
                                </Typography>
                                <Chip label="Super Admin Authority" size="small" sx={{ display: { xs: 'none', sm: 'flex' }, bgcolor: 'rgba(11, 107, 203, 0.2)', color: '#0B6BCB', fontWeight: 800, borderRadius: '8px' }} />
                            </Box>
                            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, color: subTextColor, mt: 0.5 }}>
                                Full platform management: conversation analysis, moderation, and content deletion.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1.5, width: { xs: '100%', md: 'auto' }, '& > button': { flex: { xs: 1, md: 'none' } } }}>
                        <Button
                            variant="contained"
                            startIcon={<AnalyticsIcon />}
                            onClick={() => navigate('/admin/conversation-analysis')}
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
                            Conversation Analysis
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/admin/manage-posts')}
                            sx={{
                                borderRadius: '16px',
                                fontWeight: 800,
                                px: { xs: 1.5, sm: 3 },
                                py: 1.2,
                                whiteSpace: 'nowrap',
                                textTransform: 'none',
                                borderColor: cardBorder,
                                color: textColor,
                                '&:hover': { borderColor: '#0B6BCB', bgcolor: 'rgba(11, 107, 203, 0.1)' },
                            }}
                        >
                            Moderation Center
                        </Button>
                    </Box>
                </Box>

                {actionMessage && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(21, 127, 61, 0.15)', color: textColor, border: '1px solid rgba(21, 127, 61, 0.3)' }} onClose={() => setActionMessage('')}>
                            {actionMessage}
                        </Alert>
                    </Box>
                )}

                {/* Conversation Analysis & Sentiment Banner Card */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', mb: { xs: 3, md: 4 } }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid size={{ xs: 12, lg: 8 }}>
                                <Typography variant="h6" fontWeight={800} sx={{ color: textColor, mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                    <AnalyticsIcon sx={{ color: '#0B6BCB' }} /> Community Conversation & Sentiment Analysis
                                </Typography>
                                <Typography variant="body2" sx={{ color: subTextColor, lineHeight: 1.6 }}>
                                    Real-time tracking of community forum messages, response velocity, and flagged safety keywords.
                                    Total active discussions: <strong style={{ color: '#16181F' }}>142 threads</strong> | Positive sentiment rate: <strong style={{ color: '#157F3D' }}>94.2%</strong>
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2, overflowX: 'auto', pb: 0.5, '& > *': { flexShrink: 0 } }}>
                                    <Box sx={{ bgcolor: '#FFFFFF', px: 2, py: 1, borderRadius: '12px', border: `1px solid ${cardBorder}` }}>
                                        <Typography variant="caption" sx={{ color: subTextColor }}>Avg Response Velocity</Typography>
                                        <Typography variant="body2" fontWeight={800} sx={{ color: '#0B6BCB' }}>12.4 minutes</Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: '#FFFFFF', px: 2, py: 1, borderRadius: '12px', border: `1px solid ${cardBorder}` }}>
                                        <Typography variant="caption" sx={{ color: subTextColor }}>Flagged Keyword Alerts</Typography>
                                        <Typography variant="body2" fontWeight={800} sx={{ color: '#B42318' }}>3 pending review</Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: '#FFFFFF', px: 2, py: 1, borderRadius: '12px', border: `1px solid ${cardBorder}` }}>
                                        <Typography variant="caption" sx={{ color: subTextColor }}>Active Scouts</Typography>
                                        <Typography variant="body2" fontWeight={800} sx={{ color: '#157F3D' }}>857 online</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 4 }} sx={{ textAlign: { lg: 'right' } }}>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/admin/conversation-analysis')}
                                    sx={{
                                        borderRadius: '14px',
                                        fontWeight: 800,
                                        px: 3,
                                        py: 1.2,
                                        background: '#0B6BCB',
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
                    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2.5, borderBottom: `1px solid ${cardBorder}`, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FlagIcon sx={{ color: '#B42318' }} />
                            <Typography variant="h6" fontWeight={800} sx={{ color: textColor, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                Flagged Content Pending Moderation ({flaggedItems.length})
                            </Typography>
                        </Box>
                        <Button size="small" onClick={() => navigate('/admin/manage-posts')} sx={{ color: '#0B6BCB', fontWeight: 700 }}>
                            View All Moderation Records →
                        </Button>
                    </Box>

                    {/* Phones: a 6-column table can't work at 375px, so each row becomes a card. */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1.5, p: 2 }}>
                        {flaggedItems.length === 0 ? (
                            <Typography sx={{ py: 3, textAlign: 'center', color: subTextColor, fontSize: '0.875rem' }}>
                                No flagged content pending review.
                            </Typography>
                        ) : (
                            flaggedItems.map((row) => (
                                <Box
                                    key={row.id}
                                    sx={{ border: `1px solid ${cardBorder}`, borderRadius: '12px', bgcolor: '#FFFFFF', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                                        <Typography sx={{ color: subTextColor, fontWeight: 600, fontSize: '0.75rem' }}>{row.id}</Typography>
                                        <Chip label={row.reason} size="small" sx={{ fontWeight: 600, bgcolor: 'rgba(180, 35, 24, 0.1)', color: '#B42318' }} />
                                    </Box>
                                    <Typography sx={{ color: textColor, fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.35 }}>{row.title}</Typography>
                                    <Typography sx={{ color: subTextColor, fontSize: '0.75rem' }}>{row.author} &middot; {row.date}</Typography>
                                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleApproveItem(row.id)}
                                            sx={{ fontWeight: 600, textTransform: 'none', color: '#157F3D', borderColor: 'rgba(21, 127, 61, 0.4)', borderRadius: '8px' }}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleDeleteItem(row.id)}
                                            sx={{ fontWeight: 600, textTransform: 'none', color: '#B42318', borderColor: 'rgba(180, 35, 24, 0.4)', borderRadius: '8px' }}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>

                    <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#FFFFFF' }}>
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
                                        <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#F4F3F1' } }}>
                                            <TableCell sx={{ color: textColor, fontWeight: 700, borderColor: cardBorder }}>{row.id}</TableCell>
                                            <TableCell sx={{ color: textColor, fontWeight: 600, borderColor: cardBorder }}>{row.title}</TableCell>
                                            <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.author}</TableCell>
                                            <TableCell sx={{ borderColor: cardBorder }}>
                                                <Chip label={row.reason} size="small" sx={{ fontWeight: 700, bgcolor: 'rgba(180, 35, 24, 0.15)', color: '#B42318' }} />
                                            </TableCell>
                                            <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.date}</TableCell>
                                            <TableCell align="right" sx={{ borderColor: cardBorder }}>
                                                <Button
                                                    size="small"
                                                    startIcon={<CheckCircleIcon />}
                                                    onClick={() => handleApproveItem(row.id)}
                                                    sx={{ mr: 1, fontWeight: 700, textTransform: 'none', color: '#157F3D' }}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="small"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDeleteItem(row.id)}
                                                    sx={{ fontWeight: 700, textTransform: 'none', color: '#B42318' }}
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
