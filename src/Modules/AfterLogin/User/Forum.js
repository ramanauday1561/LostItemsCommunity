import React, { useState } from 'react';
import AfterLoginLayout from '../../../AfterLoginComponents/AfterLoginLayout';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Avatar,
    Divider,
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' },
    }),
};

const initialThreads = [
    {
        id: 1,
        title: 'Tips for Finding Lost Items in Public Places',
        author: 'Sarah M.',
        date: '2024-06-10',
        replies: 3,
        category: 'Tips',
        content: 'I have reunited with many lost items over the years. Here are my top tips: 1) Always check lost & found immediately. 2) Post on local Facebook groups. 3) Contact the venue directly. 4) Check nearby areas — items often get moved. 5) Use this community platform!',
        replyList: [
            { id: 101, author: 'John D.', date: '2024-06-10', text: 'Great tips Sarah! I would also add to check with nearby businesses — they often pick up items left on the street.' },
            { id: 102, author: 'Mike T.', date: '2024-06-11', text: 'Number 5 is why I love this platform! I found my wallet thanks to a post here last month.' },
            { id: 103, author: 'Anna K.', date: '2024-06-11', text: 'Tip #4 is so underrated. My phone was actually 2 benches over from where I thought I left it.' },
        ],
    },
    {
        id: 2,
        title: 'Reunited with my lost dog thanks to TrustFound community!',
        author: 'David L.',
        date: '2024-06-08',
        replies: 2,
        category: 'Success Story',
        content: 'I wanted to share a quick thank you to everyone in this community. My golden retriever slipped his leash in Central Park 3 days ago. A fellow community scout posted a photo here within 2 hours, and we were reunited that evening! Forever grateful.',
        replyList: [
            { id: 201, author: 'Emily R.', date: '2024-06-08', text: 'So happy for you David! This is what community is all about ❤️' },
            { id: 202, author: 'Carlos S.', date: '2024-06-09', text: 'Incredible story! I saw that scout post. Glad your dog is home safe.' },
        ],
    },
    {
        id: 3,
        title: 'What tracking tags or tools do you recommend for keys & bags?',
        author: 'Laura J.',
        date: '2024-06-04',
        replies: 3,
        category: 'Tips',
        content: 'Besides this platform, what other tools or apps do you use to track down lost belongings? I have been thinking about getting an AirTag for my keys but wanted to hear community experiences.',
        replyList: [
            { id: 301, author: 'Steve K.', date: '2024-06-04', text: 'AirTags are fantastic! Got one for my wallet and it has already saved me twice.' },
            { id: 302, author: 'Maria V.', date: '2024-06-05', text: 'Tile is great too and works across Android and iOS. More community members = better coverage.' },
            { id: 303, author: 'Chris O.', date: '2024-06-05', text: 'Also check NextDoor — local neighbors often post about found items there as well.' },
        ],
    },
];

function Forum() {
    const { currentUser } = useAuth();
    const isSuperAdmin = currentUser?.role === 'superadmin';

    const [threads, setThreads] = useState(initialThreads);
    const [selectedThread, setSelectedThread] = useState(null);
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [postSuccess, setPostSuccess] = useState('');
    const [replyText, setReplyText] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const textColor = '#F4F5F6';
    const subTextColor = '#9A9FA5';
    const cardBg = '#1E212B';
    const cardBorder = '#262A36';

    const canDelete = (authorName) => {
        if (isSuperAdmin) return true;
        if (!currentUser) return false;
        return (
            authorName.toLowerCase() === (currentUser.displayName || '').toLowerCase() ||
            authorName.toLowerCase() === (currentUser.username || '').toLowerCase()
        );
    };

    const handleDeleteThread = (e, threadId) => {
        e.stopPropagation();
        setThreads((prev) => prev.filter((t) => t.id !== threadId));
        if (selectedThread?.id === threadId) setSelectedThread(null);
        setPostSuccess('Discussion thread deleted successfully.');
        setTimeout(() => setPostSuccess(''), 3500);
    };

    const handleDeleteReply = (replyId) => {
        if (!selectedThread) return;
        const updatedList = selectedThread.replyList.filter((r) => r.id !== replyId);
        const updatedThread = {
            ...selectedThread,
            replies: updatedList.length,
            replyList: updatedList,
        };
        setSelectedThread(updatedThread);
        setThreads(threads.map((t) => (t.id === updatedThread.id ? updatedThread : t)));
        setPostSuccess('Reply deleted.');
        setTimeout(() => setPostSuccess(''), 3000);
    };

    const onSubmitPost = (data) => {
        const newThread = {
            id: Date.now(),
            title: data.postTitle,
            category: data.postCategory || 'General',
            author: currentUser?.displayName || 'Simple User',
            date: new Date().toISOString().split('T')[0],
            replies: 0,
            content: data.postContent,
            replyList: [],
        };
        setThreads([newThread, ...threads]);
        reset();
        setNewPostOpen(false);
        setPostSuccess('Discussion thread published successfully!');
        setTimeout(() => setPostSuccess(''), 3500);
    };

    const handleAddReply = () => {
        if (!replyText.trim() || !selectedThread) return;
        const newReply = {
            id: Date.now(),
            author: currentUser?.displayName || 'Simple User',
            date: new Date().toISOString().split('T')[0],
            text: replyText.trim(),
        };
        const updated = {
            ...selectedThread,
            replies: selectedThread.replies + 1,
            replyList: [...selectedThread.replyList, newReply],
        };
        setSelectedThread(updated);
        setThreads(threads.map((t) => (t.id === updated.id ? updated : t)));
        setReplyText('');
    };

    return (
        <AfterLoginLayout pageTitle="Community Forum">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                {/* Header Action Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>
                                Community Discussion Forum
                            </Typography>
                            {isSuperAdmin && (
                                <Chip label="Super Admin Moderation Active" size="small" sx={{ bgcolor: 'rgba(56, 223, 255, 0.2)', color: '#38DFFF', fontWeight: 800 }} />
                            )}
                        </Box>
                        <Typography variant="body2" sx={{ color: subTextColor, mt: 0.5 }}>
                            Connect with fellow scouts, share recovery tips, and celebrate success stories.
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setNewPostOpen(true)}
                        sx={{
                            borderRadius: '16px',
                            fontWeight: 800,
                            px: 3,
                            py: 1.2,
                            textTransform: 'none',
                            fontSize: '0.9rem',
                            background: 'linear-gradient(135deg, #A855F7 0%, #9c27b0 100%)',
                            color: '#FFFFFF',
                            boxShadow: '0 0 15px rgba(168, 85, 247, 0.35)',
                        }}
                    >
                        Start New Discussion
                    </Button>
                </Box>

                {postSuccess && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(0, 255, 157, 0.15)', color: textColor, border: '1px solid rgba(0, 255, 157, 0.3)' }} onClose={() => setPostSuccess('')}>
                            {postSuccess}
                        </Alert>
                    </Box>
                )}

                {/* Threads List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {threads.map((thread, i) => (
                        <motion.div key={thread.id} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card
                                elevation={0}
                                sx={{
                                    backgroundColor: cardBg,
                                    border: `1px solid ${cardBorder}`,
                                    borderRadius: '24px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#A855F7',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(168, 85, 247, 0.2)',
                                    },
                                }}
                                onClick={() => setSelectedThread(thread)}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                                <Chip label={thread.category} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(168, 85, 247, 0.15)', color: '#A855F7', border: '1px solid rgba(168, 85, 247, 0.3)' }} />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: textColor, mb: 1, fontSize: '1.1rem' }}>
                                                {thread.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
                                                <Typography variant="caption" sx={{ color: subTextColor }}>
                                                    Posted by <strong style={{ color: textColor }}>{thread.author}</strong>
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: subTextColor }}>{thread.date}</Typography>
                                                <Typography variant="caption" sx={{ color: '#A855F7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <CommentIcon sx={{ fontSize: 14 }} /> {thread.replies} replies
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        {/* Delete Thread Option (SuperAdmin or Author only) */}
                                        {canDelete(thread.author) && (
                                            <Button
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={(e) => handleDeleteThread(e, thread.id)}
                                                sx={{
                                                    color: '#FF5376',
                                                    fontWeight: 700,
                                                    textTransform: 'none',
                                                    fontSize: '0.8rem',
                                                    '&:hover': { bgcolor: 'rgba(255, 83, 118, 0.1)' }
                                                }}
                                            >
                                                {isSuperAdmin ? 'Delete Thread (Admin)' : 'Delete My Thread'}
                                            </Button>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </Box>
            </Container>

            {/* Thread Detail Modal Dialog */}
            <Dialog
                open={!!selectedThread}
                onClose={() => setSelectedThread(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        backgroundColor: cardBg,
                        color: textColor,
                        border: `1px solid ${cardBorder}`,
                        p: 1,
                    },
                }}
            >
                {selectedThread && (
                    <>
                        <DialogTitle>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Chip label={selectedThread.category} size="small" sx={{ fontWeight: 700, bgcolor: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }} />
                                    <Typography variant="h6" fontWeight={700} sx={{ color: textColor }}>{selectedThread.title}</Typography>
                                </Box>
                                {canDelete(selectedThread.author) && (
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={(e) => handleDeleteThread(e, selectedThread.id)}
                                        sx={{ fontWeight: 700, textTransform: 'none' }}
                                    >
                                        {isSuperAdmin ? 'Delete Thread (Admin)' : 'Delete Thread'}
                                    </Button>
                                )}
                            </Box>
                        </DialogTitle>
                        <DialogContent dividers sx={{ borderColor: cardBorder }}>
                            {/* Author Info & Main Content */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#A855F7', fontWeight: 700, fontSize: '1rem', color: '#FFFFFF' }}>
                                        {selectedThread.author[0].toUpperCase()}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{selectedThread.author}</Typography>
                                        <Typography variant="caption" sx={{ color: subTextColor }}>{selectedThread.date}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body1" sx={{ color: textColor, lineHeight: 1.8, fontSize: '0.95rem' }}>
                                    {selectedThread.content}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2.5, borderColor: cardBorder }} />

                            {/* Replies List */}
                            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: textColor }}>
                                Discussion Replies ({selectedThread.replyList.length})
                            </Typography>

                            <Box sx={{ spaceY: 2, mb: 3 }}>
                                {selectedThread.replyList.map((reply) => (
                                    <Box
                                        key={reply.id}
                                        sx={{
                                            p: 2,
                                            mb: 1.5,
                                            borderRadius: '16px',
                                            backgroundColor: '#14161D',
                                            border: `1px solid ${cardBorder}`,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 26, height: 26, bgcolor: '#38DFFF', color: '#0D0E12', fontSize: '0.75rem', fontWeight: 800 }}>
                                                    {reply.author[0].toUpperCase()}
                                                </Avatar>
                                                <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{reply.author}</Typography>
                                                <Typography variant="caption" sx={{ color: subTextColor }}>• {reply.date}</Typography>
                                            </Box>
                                            {canDelete(reply.author) && (
                                                <Button
                                                    size="small"
                                                    onClick={() => handleDeleteReply(reply.id)}
                                                    sx={{ color: '#FF5376', fontSize: '0.75rem', p: 0, minWidth: 'auto', fontWeight: 700 }}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </Box>
                                        <Typography variant="body2" sx={{ pl: 4.5, color: subTextColor, lineHeight: 1.5 }}>
                                            {reply.text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* Reply Input Field */}
                            <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Write a comment..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddReply()}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: '#14161D',
                                            '& fieldset': { borderColor: cardBorder },
                                            '& input': { color: textColor, fontSize: '0.85rem' },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    onClick={handleAddReply}
                                    sx={{
                                        borderRadius: '16px',
                                        fontWeight: 800,
                                        px: 3,
                                        background: 'linear-gradient(135deg, #A855F7 0%, #9c27b0 100%)',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    Send
                                </Button>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={() => setSelectedThread(null)} sx={{ color: subTextColor }}>Close</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* Create New Post Dialog */}
            <Dialog
                open={newPostOpen}
                onClose={() => setNewPostOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        backgroundColor: cardBg,
                        color: textColor,
                        border: `1px solid ${cardBorder}`,
                        p: 1,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, color: textColor }}>Start New Discussion</DialogTitle>
                <Box component="form" onSubmit={handleSubmit(onSubmitPost)}>
                    <DialogContent sx={{ spaceY: 2.5 }}>
                        <TextField
                            label="Discussion Title *"
                            fullWidth
                            margin="normal"
                            {...register('postTitle', { required: 'Title is required' })}
                            error={!!errors.postTitle}
                            helperText={errors.postTitle?.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                    backgroundColor: '#14161D',
                                    '& fieldset': { borderColor: cardBorder },
                                    '& input': { color: textColor },
                                },
                                '& .MuiInputLabel-root': { color: subTextColor },
                            }}
                        />
                        <TextField
                            select
                            label="Category *"
                            fullWidth
                            defaultValue="General"
                            margin="normal"
                            {...register('postCategory')}
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
                            {['General', 'Tips', 'Success Story', 'Lost', 'Found'].map((cat) => (
                                <MenuItem key={cat} value={cat} sx={{ bgcolor: '#1E212B', color: textColor }}>{cat}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Discussion Details *"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            placeholder="Share your thoughts, advice, or questions with the community..."
                            {...register('postContent', { required: 'Content is required' })}
                            error={!!errors.postContent}
                            helperText={errors.postContent?.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                    backgroundColor: '#14161D',
                                    '& fieldset': { borderColor: cardBorder },
                                    '& textarea': { color: textColor },
                                },
                                '& .MuiInputLabel-root': { color: subTextColor },
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 2.5, gap: 1 }}>
                        <Button onClick={() => setNewPostOpen(false)} sx={{ color: subTextColor }}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                borderRadius: '14px',
                                fontWeight: 800,
                                px: 3,
                                background: 'linear-gradient(135deg, #A855F7 0%, #9c27b0 100%)',
                                color: '#FFFFFF',
                            }}
                        >
                            Publish Thread
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </AfterLoginLayout>
    );
}

export default Forum;
