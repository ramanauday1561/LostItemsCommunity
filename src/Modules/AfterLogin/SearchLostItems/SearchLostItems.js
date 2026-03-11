import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    Chip,
    Divider,
    InputAdornment,
    Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import './SearchLostItems.css';

const CATEGORIES = [
    'All Categories',
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
    'Any Color',
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

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'closest_date', label: 'Closest to Loss Date' },
    { value: 'location', label: 'By Location' },
];

// Placeholder sample data for demonstration
const SAMPLE_RESULTS = [
    {
        id: 1,
        title: 'iPhone 14 Pro - Space Black',
        category: 'Electronics',
        color: 'Black',
        dateLost: '2026-03-08',
        city: 'New York',
        description: 'Lost near Central Park. Has a clear case with a photo of a dog inside.',
        reward: '$100',
        contactName: 'John D.',
    },
    {
        id: 2,
        title: 'Blue North Face Backpack',
        category: 'Bags & Wallets',
        color: 'Blue',
        dateLost: '2026-03-07',
        city: 'Los Angeles',
        description: 'Lost at LAX Terminal 4. Has a red keychain and laptop inside.',
        reward: '$50',
        contactName: 'Sarah M.',
    },
    {
        id: 3,
        title: 'Gold Wedding Ring with Engraving',
        category: 'Jewelry & Watches',
        color: 'Gold',
        dateLost: '2026-03-05',
        city: 'Chicago',
        description: 'Engraved with "Forever & Always 2018" inside. Lost at Millennium Park.',
        reward: '$200',
        contactName: 'Michael R.',
    },
    {
        id: 4,
        title: 'House Keys with Car Remote',
        category: 'Keys',
        color: 'Silver / Grey',
        dateLost: '2026-03-09',
        city: 'Houston',
        description: 'Toyota key remote, 3 house keys, and a small penguin keychain.',
        reward: null,
        contactName: 'Emma T.',
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
    }),
};

function SearchLostItems() {
    const navigate = useNavigate();
    const [results, setResults] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            keyword: '',
            category: 'All Categories',
            color: 'Any Color',
            dateFrom: '',
            dateTo: '',
            city: '',
            brand: '',
            sortBy: 'newest',
        },
    });

    const onSubmit = (data) => {
        // Placeholder: replace with real API search
        console.log('Search parameters:', data);
        // Simulate a filtered result
        const filtered = SAMPLE_RESULTS.filter((item) => {
            const matchesKeyword =
                !data.keyword ||
                item.title.toLowerCase().includes(data.keyword.toLowerCase()) ||
                item.description.toLowerCase().includes(data.keyword.toLowerCase());
            const matchesCategory =
                data.category === 'All Categories' || item.category === data.category;
            const matchesColor =
                data.color === 'Any Color' || item.color === data.color;
            const matchesCity =
                !data.city || item.city.toLowerCase().includes(data.city.toLowerCase());
            return matchesKeyword && matchesCategory && matchesColor && matchesCity;
        });
        setResults(filtered);
        setHasSearched(true);
    };

    const handleClear = () => {
        reset();
        setResults(null);
        setHasSearched(false);
    };

    return (
        <Box className="search-form-root">
            {/* Page Header */}
            <Box className="search-form-header">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Box className="search-form-header-icon">
                            <SearchIcon sx={{ fontSize: 36, color: '#2196f3' }} />
                            <Box>
                                <Typography variant="h4" className="search-form-title">
                                    Search Lost Items
                                </Typography>
                                <Typography variant="body1" className="search-form-subtitle">
                                    Use the filters below to find a specific lost item reported by the community.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        {/* Filters Section */}
                        <Grid item xs={12}>
                            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                                <Box className="search-filters-card">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <FilterListIcon sx={{ color: '#2196f3' }} />
                                        <Typography variant="h6" className="search-section-title" sx={{ mb: '0 !important', pb: '0 !important', border: 'none !important' }}>
                                            Search Filters
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2, borderColor: 'rgba(33,150,243,0.2)' }} />
                                    <Grid container spacing={2}>
                                        {/* Keyword Search */}
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Keyword Search"
                                                fullWidth
                                                placeholder="Search by item name, description, brand, or any keyword..."
                                                {...register('keyword')}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon sx={{ color: '#2196f3' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        {/* Category & Color */}
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Controller
                                                name="category"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Category"
                                                        fullWidth
                                                    >
                                                        {CATEGORIES.map((cat) => (
                                                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Controller
                                                name="color"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Color"
                                                        fullWidth
                                                    >
                                                        {COLORS.map((c) => (
                                                            <MenuItem key={c} value={c}>{c}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Controller
                                                name="sortBy"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Sort By"
                                                        fullWidth
                                                    >
                                                        {SORT_OPTIONS.map((opt) => (
                                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid>

                                        {/* Date Range */}
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                label="Date Lost From"
                                                type="date"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                {...register('dateFrom')}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarTodayIcon sx={{ fontSize: 18, color: '#9c27b0' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                label="Date Lost To"
                                                type="date"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                {...register('dateTo')}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarTodayIcon sx={{ fontSize: 18, color: '#9c27b0' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        {/* Location */}
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                label="City / Area"
                                                fullWidth
                                                placeholder="e.g., New York, Chicago"
                                                {...register('city')}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationOnIcon sx={{ fontSize: 18, color: '#f44336' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        {/* Brand */}
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                label="Brand / Make"
                                                fullWidth
                                                placeholder="e.g., Apple, Samsung"
                                                {...register('brand')}
                                            />
                                        </Grid>

                                        {/* Action Buttons */}
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                                <Button
                                                    variant="outlined"
                                                    color="inherit"
                                                    onClick={handleClear}
                                                    sx={{ color: 'rgba(19,41,72,0.7)' }}
                                                >
                                                    Clear Filters
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    startIcon={<SearchIcon />}
                                                    sx={{ fontWeight: 600, px: 4 }}
                                                >
                                                    Search Lost Items
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </motion.div>
                        </Grid>

                        {/* Results Section */}
                        {hasSearched && (
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Box className="search-results-card">
                                        <Typography variant="h6" className="search-section-title">
                                            Search Results{' '}
                                            <Chip
                                                label={`${results.length} item${results.length !== 1 ? 's' : ''} found`}
                                                color="primary"
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Typography>

                                        {results.length === 0 ? (
                                            <Alert severity="info" sx={{ borderRadius: 2 }}>
                                                No lost items matched your search criteria. Try broadening your filters or{' '}
                                                <strong
                                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                    onClick={() => navigate('/report-lost-item')}
                                                >
                                                    report your own lost item
                                                </strong>
                                                .
                                            </Alert>
                                        ) : (
                                            results.map((item, i) => (
                                                <motion.div
                                                    key={item.id}
                                                    custom={i}
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={fadeInUp}
                                                >
                                                    <Box className="search-result-item">
                                                        <Grid container spacing={1} alignItems="flex-start">
                                                            <Grid item xs={12} sm={8}>
                                                                <Typography variant="subtitle1" className="search-result-title">
                                                                    {item.title}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5, mb: 0.75 }}>
                                                                    <Chip label={item.category} size="small" color="primary" variant="outlined" />
                                                                    <Chip label={item.color} size="small" variant="outlined" />
                                                                    {item.reward && (
                                                                        <Chip label={`Reward: ${item.reward}`} size="small" color="success" />
                                                                    )}
                                                                </Box>
                                                                <Typography variant="body2" className="search-result-meta">
                                                                    {item.description}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Box sx={{ textAlign: { sm: 'right' } }}>
                                                                    <Typography variant="body2" className="search-result-meta">
                                                                        <LocationOnIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.25 }} />
                                                                        {item.city}
                                                                    </Typography>
                                                                    <Typography variant="body2" className="search-result-meta">
                                                                        <CalendarTodayIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.25 }} />
                                                                        Lost: {item.dateLost}
                                                                    </Typography>
                                                                    <Typography variant="body2" className="search-result-meta" sx={{ mt: 0.5 }}>
                                                                        Reported by: <strong>{item.contactName}</strong>
                                                                    </Typography>
                                                                    <Button
                                                                        variant="outlined"
                                                                        size="small"
                                                                        color="primary"
                                                                        sx={{ mt: 1, borderRadius: 2 }}
                                                                    >
                                                                        Contact Owner
                                                                    </Button>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </motion.div>
                                            ))
                                        )}
                                    </Box>
                                </motion.div>
                            </Grid>
                        )}

                        {!hasSearched && (
                            <Grid item xs={12}>
                                <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
                                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                                        Enter your search criteria above and click <strong>Search Lost Items</strong> to find matching reports from the community.
                                    </Alert>
                                </motion.div>
                            </Grid>
                        )}

                        {/* Quick Action */}
                        <Grid item xs={12}>
                            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeInUp}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                    <Typography variant="body2" sx={{ color: 'rgba(19,41,72,0.65)' }}>
                                        Can't find your item? Post a report so the community can help.
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => navigate('/report-lost-item')}
                                        size="small"
                                    >
                                        Report Lost Item
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

export default SearchLostItems;
