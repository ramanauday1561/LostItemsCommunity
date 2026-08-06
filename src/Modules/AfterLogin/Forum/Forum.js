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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import './Forum.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' },
    }),
};

const CATEGORY_COLORS = {
    'General': 'default',
    'Tips': 'info',
    'Success Story': 'success',
    'Lost': 'error',
    'Found': 'warning',
};

const initialThreads = [
    {
        id: 1,
        title: 'Tips for Finding Lost Items in Public Places',
        author: 'Sarah M.',
        date: '2024-06-10',
        replies: 14,
        category: 'Tips',
        content: 'I have reunited with many lost items over the years. Here are my top tips: 1) Always check lost & found immediately. 2) Post on local Facebook groups. 3) Contact the venue directly. 4) Check nearby areas — items often get moved. 5) Use this community platform!',
        replyList: [
            { author: 'John D.', date: '2024-06-10', text: 'Great tips Sarah! I would also add to check with nearby businesses — they often pick up items left on the street.' },
            { author: 'Mike T.', date: '2024-06-11', text: 'Number 5 is why I love this platform! I found my wallet thanks to a post here last month.' },
            { author: 'Anna K.', date: '2024-06-11', text: 'Tip #4 is so underrated. My phone was actually 2 benches over from where I thought I left it.' },
        ],
    },
    {
        id: 2,
        title: 'I found my lost passport thanks to this community! 🎉',
        author: 'Carlos R.',
        date: '2024-06-09',
        replies: 22,
        category: 'Success Story',
        content: 'Just wanted to share that I recovered my passport that I lost at JFK Airport last week! Someone posted it as a found item and I was able to contact them. Flying out tomorrow — cannot thank this community enough!',
        replyList: [
            { author: 'Lisa P.', date: '2024-06-09', text: 'That is amazing! So happy for you Carlos. This is exactly why this community exists.' },
            { author: 'Tom W.', date: '2024-06-10', text: 'Wonderful news! Safe travels!' },
            { author: 'superadmin', date: '2024-06-10', text: 'So glad the platform helped! We love hearing success stories like this. 🎉' },
        ],
    },
    {
        id: 3,
        title: 'How should we handle unclaimed found items?',
        author: 'superadmin',
        date: '2024-06-08',
        replies: 9,
        category: 'General',
        content: 'Community discussion: What should happen to found items that go unclaimed after 30 days? Should we partner with local charities? Should the finder be allowed to keep them? Let us hear your thoughts.',
        replyList: [
            { author: 'Rachel G.', date: '2024-06-08', text: 'I think donating to local charities after 60 days is the most ethical approach.' },
            { author: 'David L.', date: '2024-06-09', text: 'Agree with charity donation. Maybe give the original poster an option to extend the window.' },
            { author: 'Nina S.', date: '2024-06-09', text: 'Could we have a "donate" button on the post after 30 days?' },
        ],
    },
    {
        id: 4,
        title: 'Lost: Vintage Polaroid Camera near Times Square',
        author: 'Emily C.',
        date: '2024-06-07',
        replies: 5,
        category: 'Lost',
        content: 'I lost my vintage Polaroid 600 camera near Times Square on June 6th. It has a rainbow strip on the front. It belonged to my grandmother and is very sentimental. Please reach out if you have seen it!',
        replyList: [
            { author: 'Mark B.', date: '2024-06-07', text: 'So sorry Emily! I will keep an eye out. I work near Times Square.' },
            { author: 'Jen H.', date: '2024-06-08', text: 'I saw someone turn in a camera to the souvenir shop on 44th and Broadway. Might be worth checking.' },
            { author: 'Emily C.', date: '2024-06-08', text: 'Thank you Jen! I am going to check right now!' },
        ],
    },
    {
        id: 5,
        title: 'Found: Set of House Keys with Red Keychain on 8th Ave',
        author: 'Peter N.',
        date: '2024-06-06',
        replies: 3,
        category: 'Found',
        content: 'Found a set of house keys with a distinctive red bottle-opener keychain on 8th Ave near the park entrance this morning. Also has a small USB drive attached. Please message me to describe the keys and claim them.',
        replyList: [
            { author: 'Alice M.', date: '2024-06-06', text: 'Good on you for posting this Peter! Hope the owner sees it soon.' },
            { author: 'Bob F.', date: '2024-06-07', text: 'I think I know who this belongs to — sharing this post now.' },
            { author: 'Peter N.', date: '2024-06-07', text: 'Thanks everyone. Still have them safely. The owner can contact me anytime.' },
        ],
    },
    {
        id: 6,
        title: 'Best apps to help find lost items?',
        author: 'Laura J.',
        date: '2024-06-04',
        replies: 17,
        category: 'Tips',
        content: 'Besides this platform, what other tools or apps do you use to track down lost belongings? I have been thinking about getting an AirTag for my keys but wanted to hear community experiences.',
        replyList: [
            { author: 'Steve K.', date: '2024-06-04', text: 'AirTags are fantastic! Got one for my wallet and it has already saved me twice.' },
            { author: 'Maria V.', date: '2024-06-05', text: 'Tile is great too and works across Android and iOS. More community members = better coverage.' },
            { author: 'Chris O.', date: '2024-06-05', text: 'Also check NextDoor — local neighbors often post about found items there as well.' },
        ],
    },
];

function Forum() {
    const { currentUser } = useAuth();

    const [threads, setThreads] = useState(initialThreads);
    const [selectedThread, setSelectedThread] = useState(null);
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [postSuccess, setPostSuccess] = useState(false);
    const [replyText, setReplyText] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const textColor = '#1A1D1F';
    const subTextColor = '#6F767E';
    const cardBg = '#ffffff';
    const cardBorder = 'rgba(0, 0, 0, 0.08)';

    const onSubmitPost = (data) => {
        const newThread = {
            id: Date.now(),
            title: data.postTitle,
            category: data.postCategory || 'General',
            author: currentUser?.displayName || 'Community Scout',
            date: new Date().toISOString().split('T')[0],
            replies: 0,
            content: data.postContent,
            replyList: [],
        };
        setThreads([newThread, ...threads]);
        setPostSuccess(true);
        reset();
        setTimeout(() => {
            setNewPostOpen(false);
            setPostSuccess(false);
        }, 1500);
    };

    const handleAddReply = () => {
        if (!replyText.trim() || !selectedThread) return;
        const newReply = {
            author: currentUser?.displayName || 'Community Scout',
            date: 'Just now',
            text: replyText.trim(),
        };

        const updatedThread = {
            ...selectedThread,
            replies: selectedThread.replies + 1,
            replyList: [...selectedThread.replyList, newReply],
        };

        setSelectedThread(updatedThread);
        setThreads(threads.map(t => t.id === updatedThread.id ? updatedThread : t));
        setReplyText('');
    };

    return (
        <AfterLoginLayout pageTitle="Community Forum">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                {/* Header Action Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: textColor }}>
                        Recent Community Discussions
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={() => setNewPostOpen(true)}
                        sx={{ fontWeight: 700, borderRadius: '14px', textTransform: 'none', px: 3, py: 1 }}
                    >
                        Create New Post
                    </Button>
                </Box>

                {/* Thread Cards List */}
                <Box sx={{ spaceY: 2 }}>
                    {threads.map((thread, i) => (
                        <motion.div key={thread.id} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card
                                elevation={0}
                                sx={{
                                    mb: 2,
                                    borderRadius: '20px',
                                    backgroundColor: cardBg,
                                    border: `1px solid ${cardBorder}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.25 ease',
                                    '&:hover': {
                                        borderColor: '#9c27b0',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(156,39,176,0.1)',
                                    },
                                }}
                                onClick={() => setSelectedThread(thread)}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                                <Chip label={thread.category} color={CATEGORY_COLORS[thread.category] || 'default'} size="small" sx={{ fontWeight: 700, borderRadius: '8px' }} />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: textColor, mb: 1, fontSize: '1.1rem' }}>
                                                {thread.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
                                                <Typography variant="caption" sx={{ color: subTextColor }}>
                                                    Posted by <strong style={{ color: textColor }}>{thread.author}</strong>
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: subTextColor }}>{thread.date}</Typography>
                                                <Typography variant="caption" sx={{ color: '#9c27b0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <CommentIcon sx={{ fontSize: 14 }} /> {thread.replies} replies
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </Box>
            </Container>

            {/* Thread Detail Modal Dialog (Fixed Text Contrast) */}
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                <Chip label={selectedThread.category} color={CATEGORY_COLORS[selectedThread.category] || 'default'} size="small" sx={{ fontWeight: 700 }} />
                                <Typography variant="h6" fontWeight={700} sx={{ color: textColor }}>{selectedThread.title}</Typography>
                            </Box>
                        </DialogTitle>
                        <DialogContent dividers sx={{ borderColor: cardBorder }}>
                            {/* Author Info & Main Content */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#9c27b0', fontWeight: 700, fontSize: '1rem' }}>
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
                                {selectedThread.replyList.map((reply, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            p: 2,
                                            mb: 1.5,
                                            borderRadius: '16px',
                                            backgroundColor: '#F4F5F6',
                                            border: `1px solid ${cardBorder}`,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Avatar sx={{ width: 26, height: 26, bgcolor: '#1976d2', fontSize: '0.75rem', fontWeight: 700 }}>
                                                {reply.author[0].toUpperCase()}
                                            </Avatar>
                                            <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{reply.author}</Typography>
                                            <Typography variant="caption" sx={{ color: subTextColor }}>• {reply.date}</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ pl: 4.5, color: textColor, lineHeight: 1.5 }}>
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
                                            backgroundColor: '#ffffff',
                                            '& input': { color: textColor, fontSize: '0.85rem' },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleAddReply}
                                    disabled={!replyText.trim()}
                                    sx={{ borderRadius: '16px', px: 2.5, minWidth: 'auto' }}
                                >
                                    <SendIcon fontSize="small" />
                                </Button>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={() => setSelectedThread(null)} variant="outlined" sx={{ borderRadius: '12px' }}>Close</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* New Post Dialog */}
            <Dialog
                open={newPostOpen}
                onClose={() => { setNewPostOpen(false); setPostSuccess(false); reset(); }}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        backgroundColor: cardBg,
                        color: textColor,
                        border: `1px solid ${cardBorder}`,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 700, color: textColor }}>Create Community Post</DialogTitle>
                <DialogContent>
                    {postSuccess ? (
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                            <Typography variant="h6" color="success.main" fontWeight={700}>✅ Post published successfully!</Typography>
                        </Box>
                    ) : (
                        <Box component="form" id="new-post-form" onSubmit={handleSubmit(onSubmitPost)} sx={{ pt: 1, spaceY: 2 }}>
                            <TextField
                                label="Post Title"
                                fullWidth
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': { '& input': { color: textColor } },
                                    '& .MuiInputLabel-root': { color: subTextColor },
                                }}
                                {...register('postTitle', { required: 'Title is required' })}
                                error={!!errors.postTitle}
                                helperText={errors.postTitle?.message}
                            />
                            <TextField
                                select
                                label="Category"
                                fullWidth
                                defaultValue="General"
                                sx={{
                                    mb: 2,
                                    '& .MuiSelect-select': { color: textColor },
                                    '& .MuiInputLabel-root': { color: subTextColor },
                                }}
                                {...register('postCategory')}
                            >
                                {Object.keys(CATEGORY_COLORS).map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Content"
                                fullWidth
                                multiline
                                rows={4}
                                sx={{
                                    '& .MuiOutlinedInput-root': { '& textarea': { color: textColor } },
                                    '& .MuiInputLabel-root': { color: subTextColor },
                                }}
                                {...register('postContent', { required: 'Content is required' })}
                                error={!!errors.postContent}
                                helperText={errors.postContent?.message}
                            />
                        </Box>
                    )}
                </DialogContent>
                {!postSuccess && (
                    <DialogActions sx={{ p: 2.5, gap: 1 }}>
                        <Button onClick={() => { setNewPostOpen(false); reset(); }} variant="outlined" sx={{ borderRadius: '12px' }}>Cancel</Button>
                        <Button type="submit" form="new-post-form" variant="contained" color="secondary" sx={{ fontWeight: 700, borderRadius: '12px' }}>Publish Post</Button>
                    </DialogActions>
                )}
            </Dialog>
        </AfterLoginLayout>
    );
}

export default Forum;

