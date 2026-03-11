import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    Alert,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    Divider,
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import './ReportLostItem.css';

const CATEGORIES = [
    'Electronics',
    'Clothing & Accessories',
    'Jewelry & Watches',
    'Documents & IDs',
    'Keys',
    'Bags & Wallets',
    'Glasses & Eyewear',
    'Sports & Outdoor Equipment',
    'Toys & Games',
    'Pets',
    'Vehicles',
    'Books & Stationery',
    'Medical Items',
    'Other',
];

const COLORS = [
    'Black',
    'White',
    'Silver / Grey',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Pink',
    'Purple',
    'Brown',
    'Gold',
    'Multicolor',
    'Other / Unknown',
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
    }),
};

function ReportLostItem() {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [rewardOffered, setRewardOffered] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // Placeholder: replace with API call
        console.log('Lost item report submitted:', data);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Box className="report-form-root">
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box className="report-success-banner" sx={{ mt: 8 }}>
                            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#43a047', mb: 1 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1 }}>
                                Report Submitted Successfully!
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#388e3c', mb: 3 }}>
                                Your lost item report has been posted. The community will be notified and can
                                help you find it.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Button variant="contained" color="primary" onClick={() => setSubmitted(false)}>
                                    Report Another Item
                                </Button>
                                <Button variant="outlined" color="primary" onClick={() => navigate('/dashboard')}>
                                    Back to Dashboard
                                </Button>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>
        );
    }

    return (
        <Box className="report-form-root">
            {/* Page Header */}
            <Box className="report-form-header">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Box className="report-form-header-icon">
                            <ReportProblemIcon sx={{ fontSize: 36, color: '#f44336' }} />
                            <Box>
                                <Typography variant="h4" className="report-form-title">
                                    Report a Lost Item
                                </Typography>
                                <Typography variant="body1" className="report-form-subtitle">
                                    Fill in as many details as possible to help the community identify your item.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        {/* Section 1: Item Details */}
                        <Grid item xs={12}>
                            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                                <Box className="report-form-card">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <CategoryIcon sx={{ color: '#2196f3' }} />
                                        <Typography variant="h6" className="report-section-title" sx={{ mb: '0 !important', pb: '0 !important', border: 'none !important' }}>
                                            Item Details
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2, borderColor: 'rgba(33,150,243,0.2)' }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Item Title *"
                                                fullWidth
                                                placeholder="e.g., iPhone 14 Pro, Blue Backpack, Gold Wedding Ring"
                                                {...register('title', { required: 'Item title is required' })}
                                                error={!!errors.title}
                                                helperText={errors.title?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="category"
                                                control={control}
                                                rules={{ required: 'Category is required' }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Category *"
                                                        fullWidth
                                                        error={!!errors.category}
                                                        helperText={errors.category?.message}
                                                    >
                                                        {CATEGORIES.map((cat) => (
                                                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="color"
                                                control={control}
                                                rules={{ required: 'Color is required' }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Primary Color *"
                                                        fullWidth
                                                        error={!!errors.color}
                                                        helperText={errors.color?.message}
                                                    >
                                                        {COLORS.map((c) => (
                                                            <MenuItem key={c} value={c}>{c}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Brand / Make"
                                                fullWidth
                                                placeholder="e.g., Apple, Nike, Samsung"
                                                {...register('brand')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Model / Type"
                                                fullWidth
                                                placeholder="e.g., Model 3, Air Max 270"
                                                {...register('model')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Serial Number / Unique Identifier"
                                                fullWidth
                                                placeholder="e.g., IMEI, serial number (optional)"
                                                {...register('serialNumber')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Size / Dimensions"
                                                fullWidth
                                                placeholder="e.g., Medium, 15-inch, 10cm x 5cm"
                                                {...register('size')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Detailed Description *"
                                                fullWidth
                                                multiline
                                                rows={3}
                                                placeholder="Describe the item in detail — any unique marks, stickers, scratches, engravings, or other identifying features..."
                                                {...register('description', { required: 'Description is required' })}
                                                error={!!errors.description}
                                                helperText={errors.description?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Distinguishing Features"
                                                fullWidth
                                                multiline
                                                rows={2}
                                                placeholder="e.g., Has a red sticker on the back, name engraved on the inside, custom phone case..."
                                                {...register('distinguishingFeatures')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </motion.div>
                        </Grid>

                        {/* Section 2: Location & Date */}
                        <Grid item xs={12}>
                            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
                                <Box className="report-form-card">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <LocationOnIcon sx={{ color: '#f44336' }} />
                                        <Typography variant="h6" className="report-section-title" sx={{ mb: '0 !important', pb: '0 !important', border: 'none !important' }}>
                                            Location & Date
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2, borderColor: 'rgba(33,150,243,0.2)' }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Date Lost *"
                                                type="date"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                {...register('dateLost', { required: 'Date lost is required' })}
                                                error={!!errors.dateLost}
                                                helperText={errors.dateLost?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Approximate Time Lost"
                                                type="time"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                {...register('timeLost')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="City / Area *"
                                                fullWidth
                                                placeholder="e.g., New York, Downtown LA"
                                                {...register('city', { required: 'City/Area is required' })}
                                                error={!!errors.city}
                                                helperText={errors.city?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="State / Region"
                                                fullWidth
                                                placeholder="e.g., California, Texas"
                                                {...register('state')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Specific Location Description *"
                                                fullWidth
                                                placeholder="e.g., Central Park near the fountain, Coffee Bean on Main St, Platform 2 of Grand Central Station"
                                                {...register('locationDescription', { required: 'Location description is required' })}
                                                error={!!errors.locationDescription}
                                                helperText={errors.locationDescription?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Nearby Landmarks"
                                                fullWidth
                                                placeholder="e.g., Near McDonald's, next to the library, opposite the park entrance"
                                                {...register('nearbyLandmarks')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </motion.div>
                        </Grid>

                        {/* Section 3: Contact & Reward */}
                        <Grid item xs={12}>
                            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeInUp}>
                                <Box className="report-form-card">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <ContactPhoneIcon sx={{ color: '#4caf50' }} />
                                        <Typography variant="h6" className="report-section-title" sx={{ mb: '0 !important', pb: '0 !important', border: 'none !important' }}>
                                            Contact Information & Reward
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2, borderColor: 'rgba(33,150,243,0.2)' }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Your Name *"
                                                fullWidth
                                                placeholder="Full name or alias"
                                                {...register('contactName', { required: 'Name is required' })}
                                                error={!!errors.contactName}
                                                helperText={errors.contactName?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Contact Email *"
                                                type="email"
                                                fullWidth
                                                placeholder="your.email@example.com"
                                                {...register('contactEmail', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                })}
                                                error={!!errors.contactEmail}
                                                helperText={errors.contactEmail?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Contact Phone"
                                                fullWidth
                                                placeholder="+1 (555) 000-0000"
                                                {...register('contactPhone')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="preferredContact"
                                                control={control}
                                                defaultValue="Email"
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Preferred Contact Method"
                                                        fullWidth
                                                    >
                                                        <MenuItem value="Email">Email</MenuItem>
                                                        <MenuItem value="Phone">Phone</MenuItem>
                                                        <MenuItem value="Both">Both Email & Phone</MenuItem>
                                                    </TextField>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={rewardOffered}
                                                        onChange={(e) => setRewardOffered(e.target.checked)}
                                                        color="primary"
                                                    />
                                                }
                                                label="I am offering a reward for returning this item"
                                            />
                                        </Grid>
                                        {rewardOffered && (
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Reward Amount"
                                                    fullWidth
                                                    placeholder="e.g., 50"
                                                    {...register('rewardAmount')}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Box>
                            </motion.div>
                        </Grid>

                        {/* Section 4: Additional Info */}
                        <Grid item xs={12}>
                            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeInUp}>
                                <Box className="report-form-card">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <DescriptionIcon sx={{ color: '#9c27b0' }} />
                                        <Typography variant="h6" className="report-section-title" sx={{ mb: '0 !important', pb: '0 !important', border: 'none !important' }}>
                                            Additional Information
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2, borderColor: 'rgba(33,150,243,0.2)' }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Additional Notes"
                                                fullWidth
                                                multiline
                                                rows={3}
                                                placeholder="Any extra context that could help: what you were doing when you lost it, who might have seen it, steps you've already taken to find it..."
                                                {...register('additionalNotes')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Alert severity="info" sx={{ borderRadius: 2 }}>
                                                <strong>Photo Upload Coming Soon:</strong> We are working on photo upload functionality. For now, please describe the item as clearly as possible.
                                            </Alert>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </motion.div>
                        </Grid>

                        {/* Submit */}
                        <Grid item xs={12}>
                            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeInUp}>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        className="report-submit-btn"
                                        startIcon={<ReportProblemIcon />}
                                    >
                                        Submit Lost Item Report
                                    </Button>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Box>
    );
}

export default ReportLostItem;
