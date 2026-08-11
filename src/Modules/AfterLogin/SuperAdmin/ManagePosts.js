import React from 'react';
import AfterLoginLayout from '../../../AfterLoginComponents/AfterLoginLayout';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Alert,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';

const CATEGORIES = ['Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const initialLostPosts = [
    { id: 'LOST-1042', title: 'Blue Laptop Bag', author: 'john.doe', category: 'Bags', date: '2024-06-10', status: 'Active' },
    { id: 'LOST-1039', title: 'Gold Bracelet', author: 'mary.smith', category: 'Jewelry', date: '2024-06-08', status: 'Active' },
    { id: 'LOST-1031', title: 'Samsung Galaxy S24', author: 'alex.j', category: 'Electronics', date: '2024-06-05', status: 'Flagged' },
    { id: 'LOST-1027', title: 'Passport', author: 'traveler99', category: 'Documents', date: '2024-06-02', status: 'Active' },
    { id: 'LOST-1022', title: 'Red Winter Jacket', author: 'fit.life', category: 'Clothing', date: '2024-05-30', status: 'Resolved' },
    { id: 'LOST-1019', title: 'Airpods Pro', author: 'tk.music', category: 'Electronics', date: '2024-05-27', status: 'Active' },
];

const initialFoundPosts = [
    { id: 'FOUND-2018', title: 'Black Wallet', author: 'finder01', category: 'Bags', date: '2024-06-11', status: 'Active' },
    { id: 'FOUND-2015', title: 'Silver Watch', author: 'goodsam', category: 'Jewelry', date: '2024-06-09', status: 'Active' },
    { id: 'FOUND-2009', title: 'iPhone 15', author: 'subway.finder', category: 'Electronics', date: '2024-06-06', status: 'Flagged' },
    { id: 'FOUND-2004', title: 'Blue Denim Jacket', author: 'gym.staff', category: 'Clothing', date: '2024-06-03', status: 'Active' },
    { id: 'FOUND-1998', title: 'Car Keys', author: 'lot.attendant', category: 'Other', date: '2024-05-31', status: 'Resolved' },
    { id: 'FOUND-1990', title: 'Student ID Card', author: 'college.admin', category: 'Documents', date: '2024-05-28', status: 'Active' },
];

const initialForumPosts = [
    { id: 'POST-101', title: 'Tips for Finding Lost Items', author: 'sarah.m', category: 'Tips', date: '2024-06-10', status: 'Active' },
    { id: 'POST-099', title: 'Found my passport thanks to this community!', author: 'carlos.r', category: 'General', date: '2024-06-09', status: 'Active' },
    { id: 'POST-095', title: 'How to handle unclaimed found items?', author: 'superadmin', category: 'General', date: '2024-06-08', status: 'Active' },
    { id: 'POST-091', title: 'Lost: Vintage Polaroid Camera', author: 'emily.c', category: 'Lost', date: '2024-06-07', status: 'Flagged' },
];

function StatCard({ title, value, icon, color }) {
    return (
        <Card elevation={0} sx={{ backgroundColor: '#1E212B', border: '1px solid #262A36', borderRadius: '24px', p: 1 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: `${color}15`, color }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" sx={{ color: '#9A9FA5', fontWeight: 600 }}>{title}</Typography>
                    <Typography variant="h5" fontWeight={800} sx={{ color: '#F4F5F6' }}>{value}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

function ManagePosts() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [tab, setTab] = React.useState(0);
    const [lostPosts, setLostPosts] = React.useState(initialLostPosts);
    const [foundPosts, setFoundPosts] = React.useState(initialFoundPosts);
    const [forumPosts, setForumPosts] = React.useState(initialForumPosts);
    const [editTarget, setEditTarget] = React.useState(null);
    const [deleteTarget, setDeleteTarget] = React.useState(null);
    const [editSuccess, setEditSuccess] = React.useState(false);
    const { register, handleSubmit, reset } = useForm();

    React.useEffect(() => {
        if (!currentUser || currentUser.role !== 'superadmin') {
            navigate('/dashboard', { replace: true });
        }
    }, [currentUser, navigate]);

    const textColor = '#F4F5F6';
    const subTextColor = '#9A9FA5';
    const cardBg = '#1E212B';
    const cardBorder = '#262A36';

    const allRows = [...lostPosts, ...foundPosts, ...forumPosts];
    const stats = {
        total: allRows.length,
        resolved: allRows.filter((r) => r.status === 'Resolved').length,
        flagged: allRows.filter((r) => r.status === 'Flagged').length,
    };

    const currentList = tab === 0 ? lostPosts : tab === 1 ? foundPosts : forumPosts;

    const handleEditOpen = (item) => {
        setEditTarget(item);
        reset({ title: item.title, category: item.category, status: item.status });
    };

    const onEditSave = (data) => {
        const updater = (list) =>
            list.map((i) => (i.id === editTarget.id ? { ...i, ...data } : i));
        if (tab === 0) setLostPosts(updater);
        else if (tab === 1) setFoundPosts(updater);
        else setForumPosts(updater);

        setEditTarget(null);
        setEditSuccess(true);
        setTimeout(() => setEditSuccess(false), 3000);
    };

    const handleDeleteConfirm = () => {
        const filter = (list) => list.filter((i) => i.id !== deleteTarget.id);
        if (tab === 0) setLostPosts(filter);
        else if (tab === 1) setFoundPosts(filter);
        else setForumPosts(filter);

        setDeleteTarget(null);
    };

    return (
        <AfterLoginLayout pageTitle="Moderation Dashboard">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>
                            System Moderation Center
                        </Typography>
                        <Typography variant="body2" sx={{ color: subTextColor }}>
                            Superadmin controls to manage community submissions, edit listings, and handle flagged content.
                        </Typography>
                    </Box>
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
                            background: 'linear-gradient(135deg, #A855F7 0%, #9c27b0 100%)',
                            color: '#FFFFFF',
                        }}
                    >
                        Conversation Analysis
                    </Button>
                </Box>

                {editSuccess && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(0, 255, 157, 0.15)', color: textColor, border: '1px solid rgba(0, 255, 157, 0.3)' }} onClose={() => setEditSuccess(false)}>
                            Post updated successfully!
                        </Alert>
                    </Box>
                )}

                {/* Metric Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                        <StatCard title="Total Posts" value={stats.total} icon={<ArticleIcon />} color="#38DFFF" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard title="Resolved Claims" value={stats.resolved} icon={<CheckCircleIcon />} color="#00FF9D" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatCard title="Flagged for Review" value={stats.flagged} icon={<FlagIcon />} color="#FF5376" />
                    </Grid>
                </Grid>

                {/* Tabs & Data Table Card Container */}
                <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px' }}>
                    <Box sx={{ borderBottom: `1px solid ${cardBorder}`, px: 3, pt: 2 }}>
                        <Tabs
                            value={tab}
                            onChange={(_, val) => setTab(val)}
                            sx={{
                                '& .MuiTab-root': {
                                    color: subTextColor,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    '&.Mui-selected': { color: '#38DFFF' },
                                },
                                '& .MuiTabs-indicator': { backgroundColor: '#38DFFF', height: 3 },
                            }}
                        >
                            <Tab label={`Lost Items (${lostPosts.length})`} />
                            <Tab label={`Found Items (${foundPosts.length})`} />
                            <Tab label={`Forum Posts (${forumPosts.length})`} />
                        </Tabs>
                    </Box>

                    {/* Data Table */}
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#14161D' }}>
                                <TableRow>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>ID</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Title</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Author</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Category</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Date</TableCell>
                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Status</TableCell>
                                    <TableCell align="right" sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentList.map((row) => (
                                    <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#1B1E27' } }}>
                                        <TableCell sx={{ color: textColor, fontWeight: 700, borderColor: cardBorder }}>{row.id}</TableCell>
                                        <TableCell sx={{ color: textColor, fontWeight: 600, borderColor: cardBorder }}>{row.title}</TableCell>
                                        <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.author}</TableCell>
                                        <TableCell sx={{ borderColor: cardBorder }}>
                                            <Chip label={row.category} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(56, 223, 255, 0.15)', color: '#38DFFF' }} />
                                        </TableCell>
                                        <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.date}</TableCell>
                                        <TableCell sx={{ borderColor: cardBorder }}>
                                            <Chip
                                                label={row.status}
                                                size="small"
                                                sx={{
                                                    fontWeight: 700,
                                                    borderRadius: '8px',
                                                    bgcolor: row.status === 'Active' ? 'rgba(0, 255, 157, 0.15)' : row.status === 'Flagged' ? 'rgba(255, 83, 118, 0.15)' : 'rgba(56, 223, 255, 0.15)',
                                                    color: row.status === 'Active' ? '#00FF9D' : row.status === 'Flagged' ? '#FF5376' : '#38DFFF',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right" sx={{ borderColor: cardBorder }}>
                                            <Button
                                                size="small"
                                                onClick={() => handleEditOpen(row)}
                                                sx={{ mr: 1, fontWeight: 700, textTransform: 'none', color: '#38DFFF' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                onClick={() => setDeleteTarget(row)}
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

                {/* Edit Post Modal Dialog */}
                <Dialog
                    open={!!editTarget}
                    onClose={() => setEditTarget(null)}
                    maxWidth="xs"
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
                    {editTarget && (
                        <Box component="form" onSubmit={handleSubmit(onEditSave)}>
                            <DialogTitle sx={{ fontWeight: 800, color: textColor }}>Edit Post ({editTarget.id})</DialogTitle>
                            <DialogContent sx={{ spaceY: 2 }}>
                                <TextField
                                    label="Post Title"
                                    fullWidth
                                    margin="normal"
                                    {...register('title', { required: true })}
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
                                    label="Category"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={editTarget.category}
                                    {...register('category')}
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
                                    {CATEGORIES.map((c) => (
                                        <MenuItem key={c} value={c} sx={{ bgcolor: '#1E212B', color: textColor }}>{c}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label="Status"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={editTarget.status}
                                    {...register('status')}
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
                                    {['Active', 'Resolved', 'Flagged'].map((s) => (
                                        <MenuItem key={s} value={s} sx={{ bgcolor: '#1E212B', color: textColor }}>{s}</MenuItem>
                                    ))}
                                </TextField>
                            </DialogContent>
                            <DialogActions sx={{ p: 2.5, gap: 1 }}>
                                <Button onClick={() => setEditTarget(null)} sx={{ color: subTextColor }}>Cancel</Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        borderRadius: '14px',
                                        fontWeight: 800,
                                        px: 3,
                                        background: 'linear-gradient(135deg, #38DFFF 0%, #00B2FE 100%)',
                                        color: '#0D0E12',
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </DialogActions>
                        </Box>
                    )}
                </Dialog>

                {/* Delete Confirmation Modal Dialog */}
                <Dialog
                    open={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
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
                    {deleteTarget && (
                        <>
                            <DialogTitle sx={{ fontWeight: 800, color: textColor }}>Confirm Deletion</DialogTitle>
                            <DialogContent>
                                <Typography variant="body2" sx={{ color: subTextColor }}>
                                    Are you sure you want to permanently delete post <strong>{deleteTarget.id}</strong> ("{deleteTarget.title}")? This action cannot be undone.
                                </Typography>
                            </DialogContent>
                            <DialogActions sx={{ p: 2.5, gap: 1 }}>
                                <Button onClick={() => setDeleteTarget(null)} sx={{ color: subTextColor }}>Cancel</Button>
                                <Button
                                    onClick={handleDeleteConfirm}
                                    variant="contained"
                                    sx={{
                                        borderRadius: '14px',
                                        fontWeight: 800,
                                        bgcolor: '#FF5376',
                                        color: '#FFFFFF',
                                        '&:hover': { bgcolor: '#e53935' },
                                    }}
                                >
                                    Delete Post
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Dialog>
            </Container>
        </AfterLoginLayout>
    );
}

export default ManagePosts;
