import React from 'react';
import AfterLoginLayout from './AfterLoginLayout';
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
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { textColor, subTextColor, cardBg, cardBorder } from '../utils/afterLoginTokens';

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
        backgroundColor: '#FFFFFF',
        '& fieldset': { borderColor: '#E6E5E1' },
        '&:hover fieldset': { borderColor: '#0B6BCB' },
        '&.Mui-focused fieldset': { borderColor: '#0B6BCB' },
        '& input': { color: '#16181F', fontSize: '0.95rem' },
        '& textarea': { color: '#16181F', fontSize: '0.95rem' },
        '& .MuiSelect-select': { color: '#16181F', fontSize: '0.95rem' },
    },
    '& .MuiInputLabel-root': { color: '#6B7280' },
    '& .MuiSvgIcon-root': { color: '#6B7280' },
};

const RECENT = {
    lost: [
    { id: 'LOST-1042', title: 'Blue Laptop Bag', category: 'Bags', location: 'Central Park, NY', date: '2024-06-10', status: 'Active' },
    { id: 'LOST-1039', title: 'Gold Bracelet', category: 'Jewelry', location: 'Downtown Mall', date: '2024-06-08', status: 'Active' },
    { id: 'LOST-1031', title: 'Samsung Galaxy S24', category: 'Electronics', location: 'Main St Bus Stop', date: '2024-06-05', status: 'Active' },
    { id: 'LOST-1027', title: 'Passport', category: 'Documents', location: 'JFK Airport, Terminal 4', date: '2024-06-02', status: 'Active' },
    ],
    found: [
    { id: 'FOUND-2018', title: 'Black Wallet', category: 'Bags', location: 'Riverside Park', date: '2024-06-11', status: 'Active' },
    { id: 'FOUND-2015', title: 'Silver Watch', category: 'Jewelry', location: 'Coffee Shop on 5th Ave', date: '2024-06-09', status: 'Active' },
    { id: 'FOUND-2009', title: 'iPhone 15', category: 'Electronics', location: 'Union Square Station', date: '2024-06-06', status: 'Active' },
    { id: 'FOUND-2004', title: 'Blue Denim Jacket', category: 'Clothing', location: 'Gym Locker Room', date: '2024-06-03', status: 'Active' },
    ],
};

// One report form serves both kinds; only the wording, icon and sidebar differ.
const COPY = {
    lost: {
        pageTitle: 'Report Lost Item',
        heading: '{copy.heading}',
        blurb: '{copy.blurb}',
        success: '{copy.success}',
        iconBg: 'rgba(180, 35, 24, 0.15)',
        iconColor: '#B42318',
        titleLabel: 'Item Title *',
        titlePlaceholder: 'e.g. Black Leather Wallet, iPhone 15 Pro',
        dateLabel: 'Date Lost *',
        dateRequired: 'Date lost is required',
        locationLabel: 'Last Known Location *',
        locationPlaceholder: 'e.g. Central Park near fountain, Bus #42',
        nameLabel: 'Reporter Name *',
        emailLabel: 'Contact Email *',
        descLabel: 'Detailed Description',
        descPlaceholder: 'Include color, brand, unique markings, serial numbers...',
        submit: '{copy.submit}',
        sidebarTitle: '{copy.sidebarTitle}',
        sidebarBlurb: '{copy.sidebarBlurb}',
    },
    found: {
        pageTitle: 'Report Found Item',
        heading: 'File a Found Item Report',
        blurb: 'Help return an item to its rightful owner by adding it to our community registry.',
        success: 'Found item report logged successfully! Matching owners will be alerted automatically.',
        iconBg: 'rgba(11, 107, 203, 0.15)',
        iconColor: '#0B6BCB',
        titleLabel: 'Found Item Title *',
        titlePlaceholder: 'e.g. Black Leather Wallet, Silver Rolex Watch',
        dateLabel: 'Date Found *',
        dateRequired: 'Date found is required',
        locationLabel: 'Found Location *',
        locationPlaceholder: 'e.g. Park bench near 5th Ave, Library 2nd floor',
        nameLabel: 'Finder Name *',
        emailLabel: 'Finder Contact Email *',
        descLabel: 'Item Description & Storage Location',
        descPlaceholder: 'Describe condition, unique features, and where the item is currently kept...',
        submit: 'Publish Found Item Listing',
        sidebarTitle: 'Recent Found Items',
        sidebarBlurb: 'Recently turned-in items looking for their owners.',
    },
};

function ReportItemForm({ kind = 'lost' }) {
    const copy = COPY[kind];
    const { currentUser } = useAuth();
    const [submitted, setSubmitted] = React.useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            personName: currentUser?.displayName || '',
            contactEmail: currentUser?.email || '',
        },
    });

    const onSubmit = () => {
        setSubmitted(true);
        reset({ personName: currentUser?.displayName || '', contactEmail: currentUser?.email || '' });
    };

    return (
        <AfterLoginLayout pageTitle={copy.pageTitle}>
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 0, sm: 2 } }}>
                <Grid container spacing={4}>
                    
                    {/* Report Form */}
                    <Grid size={{ xs: 12, lg: 7 }}>
                        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '28px' }}>
                                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: copy.iconBg, color: copy.iconColor }}>
                                            {kind === 'lost' ? <ReportProblemIcon sx={{ fontSize: 32 }} /> : <FindInPageIcon sx={{ fontSize: 32 }} />}
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
                                        <Alert severity="success" sx={{ my: 3, borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(21, 127, 61, 0.15)', color: textColor, border: '1px solid rgba(21, 127, 61, 0.3)' }} onClose={() => setSubmitted(false)}>
                                            Report submitted successfully! Recovery scouts in your area have been notified.
                                        </Alert>
                                    )}

                                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                        <Grid container spacing={2.5}>
                                            <Grid size={12}>
                                                <TextField
                                                    label={copy.titleLabel}
                                                    placeholder={copy.titlePlaceholder}
                                                    fullWidth
                                                    {...register('title', { required: 'Title is required' })}
                                                    error={!!errors.title}
                                                    helperText={errors.title?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    select
                                                    label="Category *"
                                                    fullWidth
                                                    defaultValue="Electronics"
                                                    {...register('category', { required: 'Category is required' })}
                                                    sx={FIELD_SX}
                                                >
                                                    {CATEGORIES.map((c) => (
                                                        <MenuItem key={c} value={c} sx={{ bgcolor: '#FFFFFF', color: textColor }}>{c}</MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label={copy.dateLabel}
                                                    type="date"
                                                    fullWidth
                                                    InputLabelProps={{ shrink: true }}
                                                    {...register('itemDate', { required: copy.dateRequired })}
                                                    error={!!errors.itemDate}
                                                    helperText={errors.itemDate?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={12}>
                                                <TextField
                                                    label={copy.locationLabel}
                                                    placeholder={copy.locationPlaceholder}
                                                    fullWidth
                                                    {...register('location', { required: 'Location is required' })}
                                                    error={!!errors.location}
                                                    helperText={errors.location?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label={copy.nameLabel}
                                                    fullWidth
                                                    {...register('personName', { required: 'Name is required' })}
                                                    error={!!errors.personName}
                                                    helperText={errors.personName?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label={copy.emailLabel}
                                                    type="email"
                                                    fullWidth
                                                    {...register('contactEmail', { required: 'Email is required' })}
                                                    error={!!errors.contactEmail}
                                                    helperText={errors.contactEmail?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={12}>
                                                <TextField
                                                    label={copy.descLabel}
                                                    placeholder={copy.descPlaceholder}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    {...register('description')}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    sx={{
                                                        fontWeight: 800,
                                                        borderRadius: '16px',
                                                        px: 4,
                                                        py: 1.5,
                                                        background: '#0B6BCB',
                                                        color: '#FFFFFF',
                                                        textTransform: 'none',
                                                        fontSize: '1rem',
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
                    <Grid size={{ xs: 12, lg: 5 }}>
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
                                                {RECENT[kind].map((row) => (
                                                    <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#FFFFFF' } }}>
                                                        <TableCell sx={{ color: textColor, fontWeight: 700, borderColor: cardBorder }}>{row.id}</TableCell>
                                                        <TableCell sx={{ color: textColor, fontWeight: 600, borderColor: cardBorder }}>{row.title}</TableCell>
                                                        <TableCell sx={{ borderColor: cardBorder }}>
                                                            <Chip label={row.category} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }} />
                                                        </TableCell>
                                                        <TableCell sx={{ borderColor: cardBorder }}>
                                                            <Chip label={row.status} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(180, 35, 24, 0.15)', color: '#B42318' }} />
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

export default ReportItemForm;
