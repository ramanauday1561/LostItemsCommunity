import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Divider,
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import './ReportLostItem.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
};

const CATEGORIES = ['Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const recentReports = [
    { id: 'LOST-1042', title: 'Blue Laptop Bag', category: 'Bags', location: 'Central Park, NY', date: '2024-06-10', status: 'Active' },
    { id: 'LOST-1039', title: 'Gold Bracelet', category: 'Jewelry', location: 'Downtown Mall', date: '2024-06-08', status: 'Active' },
    { id: 'LOST-1031', title: 'Samsung Galaxy S24', category: 'Electronics', location: 'Main St Bus Stop', date: '2024-06-05', status: 'Active' },
    { id: 'LOST-1027', title: 'Passport', category: 'Documents', location: 'JFK Airport, Terminal 4', date: '2024-06-02', status: 'Active' },
];

function ReportLostItem() {
    const { currentUser } = useAuth();
    const [successMsg, setSuccessMsg] = React.useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = () => {
        const reportId = Math.floor(1000 + Math.random() * 9000);
        setSuccessMsg(`Report #LOST-${reportId} submitted successfully! Our community will help you find your item.`);
        reset();
    };

    return (
        <Box className="report-lost-root">
            <Box className="report-lost-hero">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ReportProblemIcon sx={{ fontSize: 40, color: '#f44336' }} />
                            <Box>
                                <Typography variant="h4" className="report-lost-hero-title">Report Lost Item</Typography>
                                <Typography variant="body1" className="report-lost-hero-subtitle">
                                    Fill in the details below so the community can help you find your lost item.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                    <Card className="report-lost-form-card" elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" className="report-lost-section-title">Lost Item Details</Typography>
                            {successMsg && (
                                <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMsg('')}>
                                    {successMsg}
                                </Alert>
                            )}
                            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Item Title"
                                            fullWidth
                                            {...register('title', { required: 'Item title is required' })}
                                            error={!!errors.title}
                                            helperText={errors.title?.message}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: 'rgba(0,0,0,0.23)' },
                                                    '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.87)' },
                                                    '& input': { color: '#1a1a2e' },
                                                    '& textarea': { color: '#1a1a2e' },
                                                },
                                                '& .MuiInputLabel-root': { color: '#555555' },
                                                '& .MuiSelect-select': { color: '#1a1a2e' },
                                                '& .MuiSvgIcon-root': { color: '#555555' },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            label="Category"
                                            fullWidth
                                            defaultValue=""
                                            {...register('category', { required: 'Category is required' })}
                                            error={!!errors.category}
                                            helperText={errors.category?.message}
                                        >
                                            {CATEGORIES.map((cat) => (
                                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Description"
                                            fullWidth
                                            multiline
                                            rows={3}
                                            {...register('description', { required: 'Description is required' })}
                                            error={!!errors.description}
                                            helperText={errors.description?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Last Seen Location"
                                            fullWidth
                                            {...register('location', { required: 'Location is required' })}
                                            error={!!errors.location}
                                            helperText={errors.location?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Date Lost"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            {...register('dateLost', { required: 'Date is required' })}
                                            error={!!errors.dateLost}
                                            helperText={errors.dateLost?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Contact Email"
                                            type="email"
                                            fullWidth
                                            defaultValue={currentUser?.email || ''}
                                            {...register('contactEmail', { required: 'Email is required' })}
                                            error={!!errors.contactEmail}
                                            helperText={errors.contactEmail?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Contact Phone"
                                            fullWidth
                                            {...register('contactPhone')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="error" size="large" sx={{ fontWeight: 600 }}>
                                            Submit Report
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
                    <Card className="report-lost-table-card" elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" className="report-lost-section-title">Recent Lost Item Reports</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Report ID</strong></TableCell>
                                            <TableCell><strong>Title</strong></TableCell>
                                            <TableCell><strong>Category</strong></TableCell>
                                            <TableCell><strong>Location</strong></TableCell>
                                            <TableCell><strong>Date</strong></TableCell>
                                            <TableCell><strong>Status</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentReports.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.title}</TableCell>
                                                <TableCell>{row.category}</TableCell>
                                                <TableCell>{row.location}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>
                                                    <Chip label={row.status} color="primary" size="small" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
}

export default ReportLostItem;
