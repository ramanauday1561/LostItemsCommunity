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
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import './ManagePosts.css';

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
    { id: 'POST-087', title: 'Found: House Keys on 8th Ave', author: 'peter.n', category: 'Found', date: '2024-06-06', status: 'Active' },
    { id: 'POST-080', title: 'Best apps to find lost items?', author: 'laura.j', category: 'Tips', date: '2024-06-04', status: 'Resolved' },
];

const statusColors = { Active: 'primary', Resolved: 'success', Flagged: 'error' };

function PostsTable({ rows, onEdit, onDelete, textColor, subTextColor, cardBorder }) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow sx={{ borderBottom: `2px solid ${cardBorder}` }}>
                        <TableCell sx={{ color: textColor, fontWeight: 700 }}>ID</TableCell>
                        <TableCell sx={{ color: textColor, fontWeight: 700 }}>Title</TableCell>
                        <TableCell sx={{ color: textColor, fontWeight: 700 }}>Author</TableCell>
                        <TableCell sx={{ color: textColor, fontWeight: 700 }}>Category</TableCell>
                        <TableCell sx={{ color: textColor, fontWeight: 700 }}>Date</TableCell>
                        <TableCell sx={{ color: textColor, fontWeight: 700 }}>Status</TableCell>
                        <TableCell sx={{ color: textColor, fontWeight: 700 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: `1px solid ${cardBorder}` }}>
                            <TableCell sx={{ fontSize: '0.8rem', color: subTextColor, fontWeight: 600 }}>{row.id}</TableCell>
                            <TableCell sx={{ maxWidth: 200, color: textColor, fontWeight: 600 }}>{row.title}</TableCell>
                            <TableCell sx={{ color: textColor }}>{row.author}</TableCell>
                            <TableCell sx={{ color: textColor }}>{row.category}</TableCell>
                            <TableCell sx={{ color: subTextColor }}>{row.date}</TableCell>
                            <TableCell>
                                <Chip label={row.status} color={statusColors[row.status]} size="small" sx={{ fontWeight: 700 }} />
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button size="small" variant="outlined" color="primary" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }} onClick={() => onEdit(row)}>Edit</Button>
                                    <Button size="small" variant="outlined" color="error" sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }} onClick={() => onDelete(row)}>Delete</Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    React.useEffect(() => {
        if (!currentUser || currentUser.role !== 'superadmin') {
            navigate('/dashboard', { replace: true });
        }
    }, [currentUser, navigate]);

    const textColor = '#1A1D1F';
    const subTextColor = '#6F767E';
    const cardBg = '#ffffff';
    const cardBorder = 'rgba(0, 0, 0, 0.08)';

    const allRows = [...lostPosts, ...foundPosts, ...forumPosts];
    const stats = {
        total: allRows.length,
        active: allRows.filter(r => r.status === 'Active').length,
        resolved: allRows.filter(r => r.status === 'Resolved').length,
        flagged: allRows.filter(r => r.status === 'Flagged').length,
    };

    const currentRows = tab === 0 ? lostPosts : tab === 1 ? foundPosts : forumPosts;
    const setCurrentRows = tab === 0 ? setLostPosts : tab === 1 ? setFoundPosts : setForumPosts;

    const handleEdit = (row) => {
        setEditTarget(row);
        reset({ title: row.title, category: row.category, status: row.status });
        setEditSuccess(false);
    };

    const handleEditSubmit = (data) => {
        setCurrentRows((prev) => prev.map((r) => r.id === editTarget.id ? { ...r, ...data } : r));
        setEditSuccess(true);
        setTimeout(() => { setEditTarget(null); setEditSuccess(false); }, 1500);
    };

    const handleDelete = (row) => setDeleteTarget(row);

    const confirmDelete = () => {
        setCurrentRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
        setDeleteTarget(null);
    };

    const statCards = [
        { label: 'Total Posts', value: stats.total, icon: <ArticleIcon sx={{ color: '#1976d2', fontSize: 32 }} />, color: '#1976d2' },
        { label: 'Active Posts', value: stats.active, icon: <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 32 }} />, color: '#4caf50' },
        { label: 'Resolved Posts', value: stats.resolved, icon: <CheckCircleIcon sx={{ color: '#9c27b0', fontSize: 32 }} />, color: '#9c27b0' },
        { label: 'Flagged Posts', value: stats.flagged, icon: <FlagIcon sx={{ color: '#f44336', fontSize: 32 }} />, color: '#f44336' },
    ];

    return (
        <AfterLoginLayout pageTitle="Manage All Posts">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {statCards.map((stat, i) => (
                        <Grid item xs={6} md={3} key={stat.label}>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                                <Card sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '20px' }} elevation={0}>
                                    <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                                        {stat.icon}
                                        <Box>
                                            <Typography variant="h4" fontWeight={800} sx={{ color: stat.color }}>{stat.value}</Typography>
                                            <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 600 }}>{stat.label}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Table Card with Explicit Dark/Light Text Styling */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                    <Card sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px' }} elevation={0}>
                        <CardContent sx={{ p: 3 }}>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                sx={{
                                    mb: 3,
                                    borderBottom: 1,
                                    borderColor: cardBorder,
                                    '& .MuiTab-root': {
                                        color: subTextColor,
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        fontSize: '0.95rem',
                                        '&.Mui-selected': { color: textColor },
                                    },
                                }}
                            >
                                <Tab label="Lost Items Reports" />
                                <Tab label="Found Items Reports" />
                                <Tab label="Community Forum Posts" />
                            </Tabs>
                            <PostsTable
                                rows={currentRows}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                textColor={textColor}
                                subTextColor={subTextColor}
                                cardBorder={cardBorder}
                            />
                        </CardContent>
                    </Card>
                </motion.div>
            </Container>

            {/* Edit Dialog */}
            <Dialog
                open={!!editTarget}
                onClose={() => setEditTarget(null)}
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
                <DialogTitle sx={{ fontWeight: 700, color: textColor }}>Edit Post Moderation</DialogTitle>
                <DialogContent>
                    {editSuccess ? (
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                            <Typography variant="h6" color="success.main" fontWeight={700}>✅ Post updated successfully!</Typography>
                        </Box>
                    ) : (
                        <Box component="form" id="edit-post-form" onSubmit={handleSubmit(handleEditSubmit)} sx={{ pt: 1, spaceY: 2 }}>
                            <TextField
                                label="Title"
                                fullWidth
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': { '& input': { color: textColor } },
                                    '& .MuiInputLabel-root': { color: subTextColor },
                                }}
                                {...register('title', { required: 'Title is required' })}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                            <TextField
                                select
                                label="Category"
                                fullWidth
                                sx={{
                                    mb: 2,
                                    '& .MuiSelect-select': { color: textColor },
                                    '& .MuiInputLabel-root': { color: subTextColor },
                                }}
                                defaultValue={editTarget?.category || ''}
                                {...register('category', { required: 'Category is required' })}
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            >
                                {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                            </TextField>
                            <TextField
                                select
                                label="Status"
                                fullWidth
                                defaultValue={editTarget?.status || 'Active'}
                                sx={{
                                    '& .MuiSelect-select': { color: textColor },
                                    '& .MuiInputLabel-root': { color: subTextColor },
                                }}
                                {...register('status')}
                            >
                                {['Active', 'Resolved', 'Flagged'].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                            </TextField>
                        </Box>
                    )}
                </DialogContent>
                {!editSuccess && (
                    <DialogActions sx={{ p: 2.5, gap: 1 }}>
                        <Button onClick={() => setEditTarget(null)} variant="outlined" sx={{ borderRadius: '12px' }}>Cancel</Button>
                        <Button type="submit" form="edit-post-form" variant="contained" color="primary" sx={{ fontWeight: 700, borderRadius: '12px' }}>Save Changes</Button>
                    </DialogActions>
                )}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                maxWidth="xs"
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
                <DialogTitle sx={{ fontWeight: 700, color: textColor }}>Confirm Post Deletion</DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: textColor }}>
                        Are you sure you want to delete post <strong>"{deleteTarget?.title}"</strong>? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <Button onClick={() => setDeleteTarget(null)} variant="outlined" sx={{ borderRadius: '12px' }}>Cancel</Button>
                    <Button onClick={confirmDelete} variant="contained" color="error" sx={{ fontWeight: 700, borderRadius: '12px' }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </AfterLoginLayout>
    );
}

export default ManagePosts;

