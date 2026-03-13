import React from 'react';
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
    Avatar,
    Divider,
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import './Forum.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
    }),
};

const CATEGORY_COLORS = {
    'General': 'default',
    'Tips': 'info',
    'Success Story': 'success',
    'Lost': 'error',
    'Found': 'warning',
};

const threads = [
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
    const [selectedThread, setSelectedThread] = React.useState(null);
    const [newPostOpen, setNewPostOpen] = React.useState(false);
    const [postSuccess, setPostSuccess] = React.useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmitPost = () => {
        setPostSuccess(true);
        reset();
        setTimeout(() => {
            setNewPostOpen(false);
            setPostSuccess(false);
        }, 2000);
    };

    return (
        <Box className="forum-root">
            <Box className="forum-hero">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <ForumIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
                                <Box>
                                    <Typography variant="h4" className="forum-hero-title">Community Forum</Typography>
                                    <Typography variant="body1" className="forum-hero-subtitle">
                                        Connect, share tips, and celebrate reunions with the community.
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}
                                onClick={() => setNewPostOpen(true)}
                                sx={{ fontWeight: 600 }}
                            >
                                New Post
                            </Button>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Typography variant="h6" className="forum-section-title">Recent Discussions</Typography>
                {threads.map((thread, i) => (
                    <motion.div key={thread.id} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
                        <Card className="forum-thread-card" elevation={2} onClick={() => setSelectedThread(thread)}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Chip label={thread.category} color={CATEGORY_COLORS[thread.category]} size="small" />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a2e', mb: 0.5 }}>
                                            {thread.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                            <Typography variant="caption" color="text.secondary">
                                                By <strong>{thread.author}</strong>
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">{thread.date}</Typography>
                                            <Typography variant="caption" color="text.secondary">💬 {thread.replies} replies</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </Container>

            {/* Thread Detail Dialog */}
            <Dialog open={!!selectedThread} onClose={() => setSelectedThread(null)} maxWidth="md" fullWidth>
                {selectedThread && (
                    <>
                        <DialogTitle>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label={selectedThread.category} color={CATEGORY_COLORS[selectedThread.category]} size="small" />
                                <Typography variant="h6" fontWeight={700}>{selectedThread.title}</Typography>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.9rem' }}>
                                        {selectedThread.author[0].toUpperCase()}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight={600}>{selectedThread.author}</Typography>
                                    <Typography variant="caption" color="text.secondary">{selectedThread.date}</Typography>
                                </Box>
                                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>{selectedThread.content}</Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
                                Replies ({selectedThread.replyList.length})
                            </Typography>
                            {selectedThread.replyList.map((reply, idx) => (
                                <Box key={idx} className="forum-reply-card">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: '0.8rem' }}>
                                            {reply.author[0].toUpperCase()}
                                        </Avatar>
                                        <Typography variant="body2" fontWeight={600}>{reply.author}</Typography>
                                        <Typography variant="caption" color="text.secondary">{reply.date}</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ pl: 4.5 }}>{reply.text}</Typography>
                                </Box>
                            ))}
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={() => setSelectedThread(null)} variant="outlined">Close</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* New Post Dialog */}
            <Dialog open={newPostOpen} onClose={() => { setNewPostOpen(false); setPostSuccess(false); reset(); }} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>Create New Post</DialogTitle>
                <DialogContent>
                    {postSuccess ? (
                        <Box sx={{ py: 3, textAlign: 'center' }}>
                            <Typography variant="h6" color="success.main">✅ Post published successfully!</Typography>
                        </Box>
                    ) : (
                        <Box component="form" id="new-post-form" onSubmit={handleSubmit(onSubmitPost)} sx={{ pt: 1 }}>
                            <TextField
                                label="Post Title"
                                fullWidth
                                sx={{ mb: 2 }}
                                {...register('postTitle', { required: 'Title is required' })}
                                error={!!errors.postTitle}
                                helperText={errors.postTitle?.message}
                            />
                            <TextField
                                label="Content"
                                fullWidth
                                multiline
                                rows={5}
                                {...register('postContent', { required: 'Content is required' })}
                                error={!!errors.postContent}
                                helperText={errors.postContent?.message}
                            />
                        </Box>
                    )}
                </DialogContent>
                {!postSuccess && (
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <Button onClick={() => { setNewPostOpen(false); reset(); }} variant="outlined">Cancel</Button>
                        <Button type="submit" form="new-post-form" variant="contained" color="secondary" sx={{ fontWeight: 600 }}>Publish</Button>
                    </DialogActions>
                )}
            </Dialog>
        </Box>
    );
}

export default Forum;
