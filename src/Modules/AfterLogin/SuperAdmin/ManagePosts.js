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
import { statusColor, statusBg } from '../../../utils/statusColors';
import { textColor, subTextColor, cardBg, cardBorder } from '../../../utils/afterLoginTokens';

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
        <Card elevation={0} sx={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E5E1', borderRadius: '24px', p: 1 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: `${color}15`, color }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600 }}>{title}</Typography>
                    <Typography variant="h5" fontWeight={800} sx={{ color: '#16181F' }}>{value}</Typography>
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
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 0, sm: 2 } }}>
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
                            background: '#0B6BCB',
                            color: '#FFFFFF',
                        }}
                    >
                        Conversation Analysis
                    </Button>
                </Box>

                {editSuccess && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(21, 127, 61, 0.15)', color: textColor, border: '1px solid rgba(21, 127, 61, 0.3)' }} onClose={() => setEditSuccess(false)}>
                            Post updated successfully!
                        </Alert>
                    </Box>
                )}

                {/* Metric Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <StatCard title="Total Posts" value={stats.total} icon={<ArticleIcon />} color="#0B6BCB" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <StatCard title="Resolved Claims" value={stats.resolved} icon={<CheckCircleIcon />} color="#157F3D" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <StatCard title="Flagged for Review" value={stats.flagged} icon={<FlagIcon />} color="#B42318" />
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
                                    '&.Mui-selected': { color: '#0B6BCB' },
                                },
                                '& .MuiTabs-indicator': { backgroundColor: '#0B6BCB', height: 3 },
                            }}
                        >
                            <Tab label={`Lost Items (${lostPosts.length})`} />
                            <Tab label={`Found Items (${foundPosts.length})`} />
                            <Tab label={`Forum Posts (${forumPosts.length})`} />
                        </Tabs>
                    </Box>

                    {/* Phones: a 7-column table can't work at 375px, so each row becomes a card. */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1.5, p: 2 }}>
                        {currentList.map((row) => (
                            <Box
                                key={row.id}
                                sx={{
                                    border: `1px solid ${cardBorder}`,
                                    borderRadius: '16px',
                                    bgcolor: '#FFFFFF',
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                                    <Typography sx={{ color: subTextColor, fontWeight: 700, fontSize: '0.75rem' }}>{row.id}</Typography>
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: statusBg(row.status), color: statusColor(row.status) }}
                                    />
                                </Box>
                                <Typography sx={{ color: textColor, fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.35 }}>{row.title}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                    <Chip
                                        label={row.category}
                                        size="small"
                                        sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }}
                                    />
                                    <Typography sx={{ color: subTextColor, fontSize: '0.75rem' }}>
                                        {row.author} &middot; {row.date}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => handleEditOpen(row)}
                                        sx={{ fontWeight: 700, textTransform: 'none', color: '#0B6BCB', borderColor: 'rgba(11, 107, 203, 0.4)', borderRadius: '12px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => setDeleteTarget(row)}
                                        sx={{ fontWeight: 700, textTransform: 'none', color: '#B42318', borderColor: 'rgba(180, 35, 24, 0.4)', borderRadius: '12px' }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* Data Table (tablet and up) */}
                    <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#FFFFFF' }}>
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
                                    <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#F4F3F1' } }}>
                                        <TableCell sx={{ color: textColor, fontWeight: 700, borderColor: cardBorder }}>{row.id}</TableCell>
                                        <TableCell sx={{ color: textColor, fontWeight: 600, borderColor: cardBorder }}>{row.title}</TableCell>
                                        <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.author}</TableCell>
                                        <TableCell sx={{ borderColor: cardBorder }}>
                                            <Chip label={row.category} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }} />
                                        </TableCell>
                                        <TableCell sx={{ color: subTextColor, borderColor: cardBorder }}>{row.date}</TableCell>
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
                                            <Button
                                                size="small"
                                                onClick={() => handleEditOpen(row)}
                                                sx={{ mr: 1, fontWeight: 700, textTransform: 'none', color: '#0B6BCB' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                onClick={() => setDeleteTarget(row)}
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
                                            backgroundColor: '#FFFFFF',
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
                                            backgroundColor: '#FFFFFF',
                                            '& fieldset': { borderColor: cardBorder },
                                            '& .MuiSelect-select': { color: textColor },
                                        },
                                        '& .MuiInputLabel-root': { color: subTextColor },
                                    }}
                                >
                                    {CATEGORIES.map((c) => (
                                        <MenuItem key={c} value={c} sx={{ bgcolor: '#FFFFFF', color: textColor }}>{c}</MenuItem>
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
                                            backgroundColor: '#FFFFFF',
                                            '& fieldset': { borderColor: cardBorder },
                                            '& .MuiSelect-select': { color: textColor },
                                        },
                                        '& .MuiInputLabel-root': { color: subTextColor },
                                    }}
                                >
                                    {['Active', 'Resolved', 'Flagged'].map((s) => (
                                        <MenuItem key={s} value={s} sx={{ bgcolor: '#FFFFFF', color: textColor }}>{s}</MenuItem>
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
                                        background: '#0B6BCB',
                                        color: '#FFFFFF',
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
                                        bgcolor: '#B42318',
                                        color: '#FFFFFF',
                                        '&:hover': { bgcolor: '#B42318' },
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
