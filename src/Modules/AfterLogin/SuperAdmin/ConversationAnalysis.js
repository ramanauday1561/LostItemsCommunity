import React, { useState } from 'react';
import AfterLoginLayout from '../../../AfterLoginComponents/AfterLoginLayout';
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
    TextField,
    MenuItem,
} from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ForumIcon from '@mui/icons-material/Forum';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const initialConversations = [
    { id: 'CONV-8801', topic: 'Tips for Finding Lost Items', author: 'Sarah M.', messagesCount: 14, sentiment: 'Positive', sentimentScore: '98%', status: 'Normal', date: '2024-06-10', snippet: 'Always check nearby lost and found desks immediately...' },
    { id: 'CONV-8794', topic: 'Reunited with lost dog!', author: 'David L.', messagesCount: 23, sentiment: 'Very Positive', sentimentScore: '99%', status: 'Resolved', date: '2024-06-08', snippet: 'My golden retriever slipped his leash... reunited that evening!' },
    { id: 'CONV-8742', topic: 'Dispute over found iPhone 15', author: 'alex.j', messagesCount: 19, sentiment: 'Negative / Flagged', sentimentScore: '42%', status: 'Flagged', date: '2024-06-06', snippet: 'Claimant provided incorrect serial numbers. Needs moderator review.' },
    { id: 'CONV-8690', topic: 'AirTag tracking tool recommendations', author: 'Laura J.', messagesCount: 17, sentiment: 'Neutral', sentimentScore: '85%', status: 'Normal', date: '2024-06-04', snippet: 'Besides this platform, what tools do you recommend?' },
];

function ConversationAnalysis() {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState(initialConversations);
    const [filterSentiment, setFilterSentiment] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [notice, setNotice] = useState('');

    const textColor = '#F4F5F6';
    const subTextColor = '#9A9FA5';
    const cardBg = '#1E212B';
    const cardBorder = '#262A36';

    const handleDeleteConversation = (id) => {
        setConversations((prev) => prev.filter((c) => c.id !== id));
        setNotice(`Conversation ${id} was deleted by Super Admin.`);
        setTimeout(() => setNotice(''), 3500);
    };

    const handleFlagConversation = (id) => {
        setConversations((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: 'Flagged', sentiment: 'Negative / Flagged' } : c))
        );
        setNotice(`Conversation ${id} marked as Flagged for review.`);
        setTimeout(() => setNotice(''), 3500);
    };

    const filtered = conversations.filter((c) => {
        const matchSearch = c.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.snippet.toLowerCase().includes(searchQuery.toLowerCase());
        const matchSentiment = filterSentiment === 'All' ||
            (filterSentiment === 'Flagged' && c.status === 'Flagged') ||
            (filterSentiment === 'Positive' && c.sentiment.includes('Positive'));
        return matchSearch && matchSentiment;
    });

    return (
        <AfterLoginLayout pageTitle="Conversation & Sentiment Analysis">
            <Container maxWidth="xl" sx={{ py: 1, px: { xs: 1, sm: 2 } }}>
                
                {/* Module Header */}
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ p: 1.5, borderRadius: '20px', bgcolor: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}>
                            <AnalyticsIcon sx={{ fontSize: 36 }} />
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>
                                    Conversation & Sentiment Analytics Engine
                                </Typography>
                                <Chip label="Super Admin Only" size="small" sx={{ bgcolor: 'rgba(168, 85, 247, 0.2)', color: '#A855F7', fontWeight: 800, borderRadius: '8px' }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: subTextColor, mt: 0.5 }}>
                                Deep analysis of community discussion sentiment, message velocity, and flagged safety keywords.
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/manage-posts')}
                        sx={{
                            borderRadius: '16px',
                            fontWeight: 800,
                            px: 3,
                            py: 1.2,
                            borderColor: cardBorder,
                            color: textColor,
                            '&:hover': { borderColor: '#38DFFF', bgcolor: 'rgba(56, 223, 255, 0.1)' },
                        }}
                    >
                        Go to Moderation Center →
                    </Button>
                </Box>

                {notice && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(0, 255, 157, 0.15)', color: textColor, border: '1px solid rgba(0, 255, 157, 0.3)' }} onClose={() => setNotice('')}>
                            {notice}
                        </Alert>
                    </Box>
                )}

                {/* Key Sentiment Metrics Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', p: 1 }}>
                            <CardContent>
                                <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700 }}>Total Discussions Analyzed</Typography>
                                <Typography variant="h4" fontWeight={800} sx={{ color: '#38DFFF', mt: 0.5 }}>1,420</Typography>
                                <Typography variant="caption" sx={{ color: '#00FF9D', mt: 1, display: 'block' }}>↑ 18.5% this week</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', p: 1 }}>
                            <CardContent>
                                <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700 }}>Overall Sentiment Score</Typography>
                                <Typography variant="h4" fontWeight={800} sx={{ color: '#00FF9D', mt: 0.5 }}>94.2%</Typography>
                                <Typography variant="caption" sx={{ color: subTextColor, mt: 1, display: 'block' }}>Healthy & Helpful</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', p: 1 }}>
                            <CardContent>
                                <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700 }}>Flagged Conversations</Typography>
                                <Typography variant="h4" fontWeight={800} sx={{ color: '#FF5376', mt: 0.5 }}>3</Typography>
                                <Typography variant="caption" sx={{ color: '#FF5376', mt: 1, display: 'block' }}>Requires Admin Attention</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', p: 1 }}>
                            <CardContent>
                                <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700 }}>Avg Response Time</Typography>
                                <Typography variant="h4" fontWeight={800} sx={{ color: '#A855F7', mt: 0.5 }}>8.5m</Typography>
                                <Typography variant="caption" sx={{ color: subTextColor, mt: 1, display: 'block' }}>High Community Velocity</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Search & Filter Bar */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', mb: 4, p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                placeholder="Search conversations by title, author, or keyword..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ color: subTextColor, mr: 1 }} />,
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',
                                        backgroundColor: '#14161D',
                                        '& fieldset': { borderColor: cardBorder },
                                        '& input': { color: textColor },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                fullWidth
                                label="Sentiment Filter"
                                value={filterSentiment}
                                onChange={(e) => setFilterSentiment(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',
                                        backgroundColor: '#14161D',
                                        '& fieldset': { borderColor: cardBorder },
                                        '& .MuiSelect-select': { color: textColor },
                                    },
                                    '& .MuiInputLabel-root': { color: subTextColor },
                                }}
                            >
                                <MenuItem value="All" sx={{ bgcolor: cardBg, color: textColor }}>All Conversations</MenuItem>
                                <MenuItem value="Positive" sx={{ bgcolor: cardBg, color: textColor }}>Positive Sentiment</MenuItem>
                                <MenuItem value="Flagged" sx={{ bgcolor: cardBg, color: textColor }}>Flagged / High Risk</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Card>

                {/* Conversation Analysis Table */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px' }}>
                    <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${cardBorder}`, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ForumIcon sx={{ color: '#A855F7' }} />
                        <Typography variant="h6" fontWeight={800} sx={{ color: textColor }}>
                            Analyzed Community Conversations ({filtered.length})
                        </Typography>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#14161D' }}>
                                <TableRow>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>ID</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Topic Title & Snippet</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Author</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Messages</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Sentiment Score</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Status</TableCell>
                                    <TableCell align="right" sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>SuperAdmin Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((row) => (
                                    <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#1B1E27' } }}>
                                        <TableCell sx={{ color: textColor, fontWeight: 700, borderColor: cardBorder }}>{row.id}</TableCell>
                                        <TableCell sx={{ color: textColor, borderColor: cardBorder, maxWidth: 300 }}>
                                            <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{row.topic}</Typography>
                                            <Typography variant="caption" sx={{ color: subTextColor, display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                                                "{row.snippet}"
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.author}</TableCell>
                                        <TableCell sx={{ color: textColor, fontWeight: 700, borderColor: cardBorder }}>{row.messagesCount}</TableCell>
                                        <TableCell sx={{ borderColor: cardBorder }}>
                                            <Chip
                                                label={`${row.sentiment} (${row.sentimentScore})`}
                                                size="small"
                                                sx={{
                                                    fontWeight: 700,
                                                    borderRadius: '8px',
                                                    bgcolor: row.sentiment.includes('Positive') ? 'rgba(0, 255, 157, 0.15)' : 'rgba(255, 83, 118, 0.15)',
                                                    color: row.sentiment.includes('Positive') ? '#00FF9D' : '#FF5376',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ borderColor: cardBorder }}>
                                            <Chip
                                                label={row.status}
                                                size="small"
                                                sx={{
                                                    fontWeight: 700,
                                                    borderRadius: '8px',
                                                    bgcolor: row.status === 'Flagged' ? 'rgba(255, 83, 118, 0.15)' : 'rgba(56, 223, 255, 0.15)',
                                                    color: row.status === 'Flagged' ? '#FF5376' : '#38DFFF',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right" sx={{ borderColor: cardBorder }}>
                                            {row.status !== 'Flagged' && (
                                                <Button
                                                    size="small"
                                                    startIcon={<WarningAmberIcon />}
                                                    onClick={() => handleFlagConversation(row.id)}
                                                    sx={{ mr: 1, fontWeight: 700, textTransform: 'none', color: '#FFB800' }}
                                                >
                                                    Flag
                                                </Button>
                                            )}
                                            <Button
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteConversation(row.id)}
                                                sx={{ fontWeight: 700, textTransform: 'none', color: '#FF5376' }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </AfterLoginLayout>
    );
}

export default ConversationAnalysis;
