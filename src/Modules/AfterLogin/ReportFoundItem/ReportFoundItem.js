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
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import './ReportFoundItem.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
};

const CATEGORIES = ['Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const FIELD_SX = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'rgba(0,0,0,0.23)' },
        '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.87)' },
        '& input': { color: '#1a1a2e' },
        '& textarea': { color: '#1a1a2e' },
    },
    '& .MuiInputLabel-root': { color: '#555555' },
    '& .MuiSelect-select': { color: '#1a1a2e' },
    '& .MuiSvgIcon-root': { color: '#555555' },
};

const recentReports = [
    { id: 'FOUND-2018', title: 'Black Wallet', category: 'Bags', location: 'Riverside Park', date: '2024-06-11', status: 'Active' },
    { id: 'FOUND-2015', title: 'Silver Watch', category: 'Jewelry', location: 'Coffee Shop on 5th Ave', date: '2024-06-09', status: 'Active' },
    { id: 'FOUND-2009', title: 'iPhone 15', category: 'Electronics', location: 'Union Square Station', date: '2024-06-06', status: 'Active' },
    { id: 'FOUND-2004', title: 'Blue Denim Jacket', category: 'Clothing', location: 'Gym Locker Room', date: '2024-06-03', status: 'Active' },
];

function ReportFoundItem() {
    const { currentUser } = useAuth();
    const [successMsg, setSuccessMsg] = React.useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = () => {
        const reportId = Math.floor(1000 + Math.random() * 9000);
        setSuccessMsg(`Report #FOUND-${reportId} submitted successfully! The owner will be notified if they search for this item.`);
        reset();
    };

    return (
        <Box className="report-found-root">
            <Box className="report-found-hero">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <FindInPageIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                            <Box>
                                <Typography variant="h4" className="report-found-hero-title">Report Found Item</Typography>
                                <Typography variant="body1" className="report-found-hero-subtitle">
                                    Found something? Help reunite it with its owner by submitting a report.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                    <Card className="report-found-form-card" elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" className="report-found-section-title">Found Item Details</Typography>
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
                                            sx={FIELD_SX}
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
                                            sx={FIELD_SX}
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
                                            sx={FIELD_SX}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Found Location"
                                            fullWidth
                                            {...register('location', { required: 'Location is required' })}
                                            error={!!errors.location}
                                            helperText={errors.location?.message}
                                            sx={FIELD_SX}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Date Found"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            {...register('dateFound', { required: 'Date is required' })}
                                            error={!!errors.dateFound}
                                            helperText={errors.dateFound?.message}
                                            sx={FIELD_SX}
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
                                            sx={FIELD_SX}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Contact Phone"
                                            fullWidth
                                            {...register('contactPhone')}
                                            sx={FIELD_SX}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="success" size="large" sx={{ fontWeight: 600 }}>
                                            Submit Report
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
                    <Card className="report-found-table-card" elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" className="report-found-section-title">Recent Found Item Reports</Typography>
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
                                                    <Chip label={row.status} color="success" size="small" />
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

export default ReportFoundItem;
