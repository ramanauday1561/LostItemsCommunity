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
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import '../SearchLostItems/SearchLostItems.css';

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

const CONDITIONS = ['Any Condition', 'Good', 'Fair', 'Damaged', 'Unknown'];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'closest_date', label: 'Closest to Found Date' },
    { value: 'location', label: 'By Location' },
];

// Placeholder sample data for demonstration
const SAMPLE_RESULTS = [
    {
        id: 1,
        title: 'Samsung Galaxy S23 - White',
        category: 'Electronics',
        color: 'White',
        dateFound: '2026-03-09',
        city: 'New York',
        condition: 'Good',
        description: 'Found on a bench in Times Square. Has a cracked screen protector but working fine.',
        currentStorage: 'At my home',
        contactName: 'Lisa K.',
    },
    {
        id: 2,
        title: 'Black Leather Wallet',
        category: 'Bags & Wallets',
        color: 'Black',
        dateFound: '2026-03-08',
        city: 'San Francisco',
        condition: 'Good',
        description: 'Found near Union Square. Contains cards but no cash. Handed to nearby police station.',
        currentStorage: 'San Francisco Police Dept, Union Square',
        contactName: 'Tom B.',
    },
    {
        id: 3,
        title: 'Set of Car Keys - Toyota',
        category: 'Keys',
        color: 'Silver / Grey',
        dateFound: '2026-03-07',
        city: 'Chicago',
        condition: 'Good',
        description: 'Toyota car key + 2 house keys. Found in Millennium Park near the Cloud Gate.',
        currentStorage: 'With the finder',
        contactName: 'Anna W.',
    },
    {
        id: 4,
        title: 'Prescription Glasses - Black Frame',
        category: 'Glasses & Eyewear',
        color: 'Black',
        dateFound: '2026-03-10',
        city: 'Los Angeles',
        condition: 'Fair',
        description: 'Black rectangular frames, found at the Beverly Center food court.',
        currentStorage: 'Beverly Center Lost & Found',
        contactName: 'David C.',
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

function SearchFoundItems() {
    const navigate = useNavigate();
    const [results, setResults] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            keyword: '',
            category: 'All Categories',
            color: 'Any Color',
            condition: 'Any Condition',
            dateFrom: '',
            dateTo: '',
            city: '',
            brand: '',
            sortBy: 'newest',
        },
    });

    const onSubmit = (data) => {
        // Placeholder: replace with real API search
        console.log('Search found items parameters:', data);
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
            const matchesCondition =
                data.condition === 'Any Condition' || item.condition === data.condition;
            return matchesKeyword && matchesCategory && matchesColor && matchesCity && matchesCondition;
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
                            <FindInPageIcon sx={{ fontSize: 36, color: '#ff9800' }} />
                            <Box>
                                <Typography variant="h4" className="search-form-title">
                                    Search Found Items
                                </Typography>
                                <Typography variant="body1" className="search-form-subtitle">
                                    Browse items found by the community — your lost item might already be here!
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
                                        <FilterListIcon sx={{ color: '#ff9800' }} />
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
                                                            <SearchIcon sx={{ color: '#ff9800' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        {/* Category & Color */}
                                        <Grid item xs={12} sm={6} md={3}>
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
                                        <Grid item xs={12} sm={6} md={3}>
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
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Controller
                                                name="condition"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        label="Item Condition"
                                                        fullWidth
                                                    >
                                                        {CONDITIONS.map((c) => (
                                                            <MenuItem key={c} value={c}>{c}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
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
                                                label="Date Found From"
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
                                                label="Date Found To"
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
                                                    color="warning"
                                                    size="large"
                                                    startIcon={<SearchIcon />}
                                                    sx={{ fontWeight: 600, px: 4 }}
                                                >
                                                    Search Found Items
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
                                            Found Items{' '}
                                            <Chip
                                                label={`${results.length} item${results.length !== 1 ? 's' : ''} found`}
                                                color="warning"
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Typography>

                                        {results.length === 0 ? (
                                            <Alert severity="info" sx={{ borderRadius: 2 }}>
                                                No found items matched your search criteria. Try broadening your filters.
                                                If you found an item, you can{' '}
                                                <strong
                                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                    onClick={() => navigate('/report-found-item')}
                                                >
                                                    report it here
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
                                                                    <Chip label={item.category} size="small" color="warning" variant="outlined" />
                                                                    <Chip label={item.color} size="small" variant="outlined" />
                                                                    <Chip label={`Condition: ${item.condition}`} size="small" color="info" variant="outlined" />
                                                                </Box>
                                                                <Typography variant="body2" className="search-result-meta">
                                                                    {item.description}
                                                                </Typography>
                                                                {item.currentStorage && (
                                                                    <Typography variant="body2" className="search-result-meta" sx={{ mt: 0.5 }}>
                                                                        📍 Currently at: <strong>{item.currentStorage}</strong>
                                                                    </Typography>
                                                                )}
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Box sx={{ textAlign: { sm: 'right' } }}>
                                                                    <Typography variant="body2" className="search-result-meta">
                                                                        <LocationOnIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.25 }} />
                                                                        {item.city}
                                                                    </Typography>
                                                                    <Typography variant="body2" className="search-result-meta">
                                                                        <CalendarTodayIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.25 }} />
                                                                        Found: {item.dateFound}
                                                                    </Typography>
                                                                    <Typography variant="body2" className="search-result-meta" sx={{ mt: 0.5 }}>
                                                                        Reported by: <strong>{item.contactName}</strong>
                                                                    </Typography>
                                                                    <Button
                                                                        variant="outlined"
                                                                        size="small"
                                                                        color="warning"
                                                                        sx={{ mt: 1, borderRadius: 2 }}
                                                                    >
                                                                        Contact Finder
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
                                        Enter your search criteria above and click <strong>Search Found Items</strong> to browse items found by the community.
                                    </Alert>
                                </motion.div>
                            </Grid>
                        )}

                        {/* Quick Action */}
                        <Grid item xs={12}>
                            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeInUp}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                    <Typography variant="body2" sx={{ color: 'rgba(19,41,72,0.65)' }}>
                                        Found something? Help the owner by posting a report.
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={() => navigate('/report-found-item')}
                                        size="small"
                                    >
                                        Report Found Item
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

export default SearchFoundItems;
