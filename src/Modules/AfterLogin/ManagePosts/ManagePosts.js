import React from 'react';
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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

function PostsTable({ rows, onEdit, onDelete }) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>ID</strong></TableCell>
                        <TableCell><strong>Title</strong></TableCell>
                        <TableCell><strong>Author</strong></TableCell>
                        <TableCell><strong>Category</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell sx={{ fontSize: '0.8rem', color: '#666' }}>{row.id}</TableCell>
                            <TableCell sx={{ maxWidth: 180 }}>{row.title}</TableCell>
                            <TableCell>{row.author}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>
                                <Chip label={row.status} color={statusColors[row.status]} size="small" />
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button size="small" variant="outlined" color="primary" onClick={() => onEdit(row)}>Edit</Button>
                                    <Button size="small" variant="outlined" color="error" onClick={() => onDelete(row)}>Delete</Button>
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
        { label: 'Total Posts', value: stats.total, icon: <ArticleIcon sx={{ color: '#1976d2' }} />, color: '#1976d2' },
        { label: 'Active Posts', value: stats.active, icon: <CheckCircleIcon sx={{ color: '#4caf50' }} />, color: '#4caf50' },
        { label: 'Resolved Posts', value: stats.resolved, icon: <CheckCircleIcon sx={{ color: '#9c27b0' }} />, color: '#9c27b0' },
        { label: 'Flagged Posts', value: stats.flagged, icon: <FlagIcon sx={{ color: '#f44336' }} />, color: '#f44336' },
    ];

    return (
        <Box className="manage-posts-root">
            <Box className="manage-posts-hero">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <AdminPanelSettingsIcon sx={{ fontSize: 40, color: '#7c3aed' }} />
                            <Box>
                                <Typography variant="h4" className="manage-posts-hero-title">Manage All Posts</Typography>
                                <Typography variant="body1" className="manage-posts-hero-subtitle">
                                    Review, edit, and moderate all community posts.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {statCards.map((stat, i) => (
                        <Grid item xs={6} md={3} key={stat.label}>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                                <Card className="manage-posts-stat-card" elevation={2}>
                                    <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                                        {stat.icon}
                                        <Box>
                                            <Typography variant="h5" fontWeight={700} sx={{ color: stat.color }}>{stat.value}</Typography>
                                            <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Table Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                    <Card className="manage-posts-table-card" elevation={3}>
                        <CardContent sx={{ p: 3 }}>
                            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                                <Tab label="Lost Items" />
                                <Tab label="Found Items" />
                                <Tab label="Forum Posts" />
                            </Tabs>
                            <PostsTable rows={currentRows} onEdit={handleEdit} onDelete={handleDelete} />
                        </CardContent>
                    </Card>
                </motion.div>
            </Container>

            {/* Edit Dialog */}
            <Dialog open={!!editTarget} onClose={() => setEditTarget(null)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>Edit Post</DialogTitle>
                <DialogContent>
                    {editSuccess ? (
                        <Box sx={{ py: 3, textAlign: 'center' }}>
                            <Typography variant="h6" color="success.main">✅ Post updated successfully!</Typography>
                        </Box>
                    ) : (
                        <Box component="form" id="edit-post-form" onSubmit={handleSubmit(handleEditSubmit)} sx={{ pt: 1 }}>
                            <TextField
                                label="Title"
                                fullWidth
                                sx={{ mb: 2 }}
                                {...register('title', { required: 'Title is required' })}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                            <TextField
                                select
                                label="Category"
                                fullWidth
                                sx={{ mb: 2 }}
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
                                {...register('status')}
                            >
                                {['Active', 'Resolved', 'Flagged'].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                            </TextField>
                        </Box>
                    )}
                </DialogContent>
                {!editSuccess && (
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <Button onClick={() => setEditTarget(null)} variant="outlined">Cancel</Button>
                        <Button type="submit" form="edit-post-form" variant="contained" sx={{ fontWeight: 600 }}>Save Changes</Button>
                    </DialogActions>
                )}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete <strong>"{deleteTarget?.title}"</strong>? This action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button onClick={() => setDeleteTarget(null)} variant="outlined">Cancel</Button>
                    <Button onClick={confirmDelete} variant="contained" color="error" sx={{ fontWeight: 600 }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ManagePosts;
