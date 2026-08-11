import React from 'react';
import AfterLoginLayout from '../../../AfterLoginComponents/AfterLoginLayout';
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
        borderRadius: '16px',
        backgroundColor: '#14161D',
        '& fieldset': { borderColor: '#262A36' },
        '&:hover fieldset': { borderColor: '#38DFFF' },
        '&.Mui-focused fieldset': { borderColor: '#38DFFF' },
        '& input': { color: '#F4F5F6', fontSize: '0.95rem' },
        '& textarea': { color: '#F4F5F6', fontSize: '0.95rem' },
        '& .MuiSelect-select': { color: '#F4F5F6', fontSize: '0.95rem' },
    },
    '& .MuiInputLabel-root': { color: '#9A9FA5' },
    '& .MuiSvgIcon-root': { color: '#9A9FA5' },
};

const recentReports = [
    { id: 'LOST-1042', title: 'Blue Laptop Bag', category: 'Bags', location: 'Central Park, NY', date: '2024-06-10', status: 'Active' },
    { id: 'LOST-1039', title: 'Gold Bracelet', category: 'Jewelry', location: 'Downtown Mall', date: '2024-06-08', status: 'Active' },
    { id: 'LOST-1031', title: 'Samsung Galaxy S24', category: 'Electronics', location: 'Main St Bus Stop', date: '2024-06-05', status: 'Active' },
    { id: 'LOST-1027', title: 'Passport', category: 'Documents', location: 'JFK Airport, Terminal 4', date: '2024-06-02', status: 'Active' },
];

function ReportLostItem() {
    const { currentUser } = useAuth();
    const [submitted, setSubmitted] = React.useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            reporterName: currentUser?.displayName || '',
            contactEmail: currentUser?.email || '',
        },
    });

    const textColor = '#F4F5F6';
    const subTextColor = '#9A9FA5';
    const cardBg = '#1E212B';
    const cardBorder = '#262A36';

    const onSubmit = () => {
        setSubmitted(true);
        reset({ reporterName: currentUser?.displayName || '', contactEmail: currentUser?.email || '' });
    };

    return (
        <AfterLoginLayout pageTitle="Report Lost Item">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                <Grid container spacing={4}>
                    
                    {/* Report Form */}
                    <Grid item xs={12} lg={7}>
                        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '28px' }}>
                                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: 'rgba(255, 83, 118, 0.15)', color: '#FF5376' }}>
                                            <ReportProblemIcon sx={{ fontSize: 32 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>
                                                File a Lost Item Report
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: subTextColor }}>
                                                Provide complete details so our recovery network can broadcast your lost item.
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {submitted && (
                                        <Alert severity="success" sx={{ my: 3, borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(0, 255, 157, 0.15)', color: textColor, border: '1px solid rgba(0, 255, 157, 0.3)' }} onClose={() => setSubmitted(false)}>
                                            Report submitted successfully! Recovery scouts in your area have been notified.
                                        </Alert>
                                    )}

                                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Item Title *"
                                                    placeholder="e.g. Black Leather Wallet, iPhone 15 Pro"
                                                    fullWidth
                                                    {...register('title', { required: 'Title is required' })}
                                                    error={!!errors.title}
                                                    helperText={errors.title?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    select
                                                    label="Category *"
                                                    fullWidth
                                                    defaultValue="Electronics"
                                                    {...register('category', { required: 'Category is required' })}
                                                    sx={FIELD_SX}
                                                >
                                                    {CATEGORIES.map((c) => (
                                                        <MenuItem key={c} value={c} sx={{ bgcolor: '#1E212B', color: textColor }}>{c}</MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Date Lost *"
                                                    type="date"
                                                    fullWidth
                                                    InputLabelProps={{ shrink: true }}
                                                    {...register('dateLost', { required: 'Date lost is required' })}
                                                    error={!!errors.dateLost}
                                                    helperText={errors.dateLost?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Last Known Location *"
                                                    placeholder="e.g. Central Park near fountain, Bus #42"
                                                    fullWidth
                                                    {...register('location', { required: 'Location is required' })}
                                                    error={!!errors.location}
                                                    helperText={errors.location?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Reporter Name *"
                                                    fullWidth
                                                    {...register('reporterName', { required: 'Name is required' })}
                                                    error={!!errors.reporterName}
                                                    helperText={errors.reporterName?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Contact Email *"
                                                    type="email"
                                                    fullWidth
                                                    {...register('contactEmail', { required: 'Email is required' })}
                                                    error={!!errors.contactEmail}
                                                    helperText={errors.contactEmail?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Detailed Description"
                                                    placeholder="Include color, brand, unique markings, serial numbers..."
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    {...register('description')}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    sx={{
                                                        fontWeight: 800,
                                                        borderRadius: '16px',
                                                        px: 4,
                                                        py: 1.5,
                                                        background: 'linear-gradient(135deg, #38DFFF 0%, #00B2FE 100%)',
                                                        color: '#0D0E12',
                                                        textTransform: 'none',
                                                        fontSize: '1rem',
                                                        boxShadow: '0 0 15px rgba(56, 223, 255, 0.35)',
                                                    }}
                                                >
                                                    Publish Lost Item Report
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    {/* Recent Lost Reports Sidebar Table */}
                    <Grid item xs={12} lg={5}>
                        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '28px' }}>
                                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                    <Typography variant="h6" fontWeight={800} sx={{ color: textColor, mb: 1 }}>
                                        Recent Lost Reports
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: subTextColor, mb: 3 }}>
                                        Recently submitted lost item claims by community members.
                                    </Typography>

                                    <Divider sx={{ mb: 2, borderColor: cardBorder }} />

                                    <TableContainer>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>ID</TableCell>
                                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Title</TableCell>
                                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Category</TableCell>
                                                    <TableCell sx={{ color: subTextColor, fontWeight: 700, borderColor: cardBorder }}>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {recentReports.map((row) => (
                                                    <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#14161D' } }}>
                                                        <TableCell sx={{ color: textColor, fontWeight: 700, borderColor: cardBorder }}>{row.id}</TableCell>
                                                        <TableCell sx={{ color: textColor, fontWeight: 600, borderColor: cardBorder }}>{row.title}</TableCell>
                                                        <TableCell sx={{ borderColor: cardBorder }}>
                                                            <Chip label={row.category} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(56, 223, 255, 0.15)', color: '#38DFFF' }} />
                                                        </TableCell>
                                                        <TableCell sx={{ borderColor: cardBorder }}>
                                                            <Chip label={row.status} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(255, 83, 118, 0.15)', color: '#FF5376' }} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                </Grid>
            </Container>
        </AfterLoginLayout>
    );
}

export default ReportLostItem;
