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
import { statusColor, statusBg } from '../../../utils/statusColors';
import { textColor, subTextColor, cardBg, cardBorder } from '../../../utils/afterLoginTokens';

const initialConversations = [
    { id: 'CONV-8801', topic: 'Tips for Finding Lost Items', author: 'Sarah M.', messagesCount: 14, sentiment: 'Positive', sentimentScore: '98%', status: 'Normal', date: '2024-06-10', snippet: 'Always check nearby lost and found desks immediately...' },
    { id: 'CONV-8794', topic: 'Reunited with lost dog!', author: 'David L.', messagesCount: 23, sentiment: 'Very Positive', sentimentScore: '99%', status: 'Resolved', date: '2024-06-08', snippet: 'My golden retriever slipped his leash... reunited that evening!' },
    { id: 'CONV-8742', topic: 'Dispute over found iPhone 15', author: 'alex.j', messagesCount: 19, sentiment: 'Negative / Flagged', sentimentScore: '42%', status: 'Flagged', date: '2024-06-06', snippet: 'Claimant provided incorrect serial numbers. Needs moderator review.' },
    { id: 'CONV-8690', topic: 'AirTag tracking tool recommendations', author: 'Laura J.', messagesCount: 17, sentiment: 'Neutral', sentimentScore: '85%', status: 'Normal', date: '2024-06-04', snippet: 'Besides this platform, what tools do you recommend?' },
];

const sentimentMetrics = [
    { label: 'Total Discussions Analyzed', value: '1,420', color: '#0B6BCB', note: '↑ 18.5% this week', noteColor: '#157F3D' },
    { label: 'Overall Sentiment Score', value: '94.2%', color: '#157F3D', note: 'Healthy & Helpful', noteColor: subTextColor },
    { label: 'Flagged Conversations', value: '3', color: '#B42318', note: 'Requires Admin Attention', noteColor: '#B42318' },
    { label: 'Avg Response Time', value: '8.5m', color: '#0B6BCB', note: 'High Community Velocity', noteColor: subTextColor },
];

function ConversationAnalysis() {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState(initialConversations);
    const [filterSentiment, setFilterSentiment] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [notice, setNotice] = useState('');

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
        <AfterLoginLayout pageTitle="Analysis">
            <Container maxWidth="xl" sx={{ py: { xs: 0, sm: 1 }, px: { xs: 0, sm: 2 } }}>
                
                {/* Module Header */}
                <Box sx={{ mb: { xs: 3, md: 4 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
                        <Box sx={{ p: 1.5, flexShrink: 0, borderRadius: '20px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }}>
                            <AnalyticsIcon sx={{ fontSize: 36 }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>
                                    Conversation & Sentiment Analytics Engine
                                </Typography>
                                <Chip label="Super Admin Only" size="small" sx={{ bgcolor: 'rgba(11, 107, 203, 0.2)', color: '#0B6BCB', fontWeight: 800, borderRadius: '8px' }} />
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
                            width: { xs: '100%', sm: 'auto' },
                            borderRadius: '16px',
                            fontWeight: 800,
                            px: 3,
                            py: 1.2,
                            borderColor: cardBorder,
                            color: textColor,
                            '&:hover': { borderColor: '#0B6BCB', bgcolor: 'rgba(11, 107, 203, 0.1)' },
                        }}
                    >
                        Go to Moderation Center →
                    </Button>
                </Box>

                {notice && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(21, 127, 61, 0.15)', color: textColor, border: '1px solid rgba(21, 127, 61, 0.3)' }} onClose={() => setNotice('')}>
                            {notice}
                        </Alert>
                    </Box>
                )}

                {/* Key Sentiment Metrics Grid — two across on a phone rather than
                    four full-width cards the reader has to scroll past. */}
                <Grid container spacing={{ xs: 1.5, sm: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
                    {sentimentMetrics.map((m) => (
                        <Grid key={m.label} size={{ xs: 6, md: 3 }}>
                            <Card elevation={0} sx={{ height: '100%', backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '20px' }}>
                                <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
                                    <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700, display: 'block', lineHeight: 1.3 }}>{m.label}</Typography>
                                    <Typography variant="h4" fontWeight={800} sx={{ color: m.color, mt: 0.5, fontSize: { xs: '1.6rem', sm: '2.125rem' } }}>{m.value}</Typography>
                                    <Typography variant="caption" sx={{ color: m.noteColor, mt: 1, display: 'block', lineHeight: 1.3 }}>{m.note}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>


                {/* Search & Filter Bar */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', mb: 4, p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 8 }}>
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
                                        backgroundColor: '#FFFFFF',
                                        '& fieldset': { borderColor: cardBorder },
                                        '& input': { color: textColor },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                select
                                fullWidth
                                label="Sentiment Filter"
                                value={filterSentiment}
                                onChange={(e) => setFilterSentiment(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',
                                        backgroundColor: '#FFFFFF',
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
                        <ForumIcon sx={{ color: '#0B6BCB' }} />
                        <Typography variant="h6" fontWeight={800} sx={{ color: textColor }}>
                            Analyzed Community Conversations ({filtered.length})
                        </Typography>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#FFFFFF' }}>
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
                                    <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#F4F3F1' } }}>
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
                                                    bgcolor: row.sentiment.includes('Positive') ? 'rgba(21, 127, 61, 0.15)' : 'rgba(180, 35, 24, 0.15)',
                                                    color: row.sentiment.includes('Positive') ? '#157F3D' : '#B42318',
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
                                                    bgcolor: statusBg(row.status),
                                                    color: statusColor(row.status),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right" sx={{ borderColor: cardBorder }}>
                                            {row.status !== 'Flagged' && (
                                                <Button
                                                    size="small"
                                                    startIcon={<WarningAmberIcon />}
                                                    onClick={() => handleFlagConversation(row.id)}
                                                    sx={{ mr: 1, fontWeight: 700, textTransform: 'none', color: '#0B6BCB' }}
                                                >
                                                    Flag
                                                </Button>
                                            )}
                                            <Button
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteConversation(row.id)}
                                                sx={{ fontWeight: 700, textTransform: 'none', color: '#B42318' }}
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
