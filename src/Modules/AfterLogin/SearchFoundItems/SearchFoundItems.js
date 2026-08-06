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
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    InputAdornment,
    Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { motion } from 'framer-motion';
import './SearchFoundItems.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' },
    }),
};

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const foundItems = [
    { id: 'FOUND-2018', title: 'Black Wallet', category: 'Bags', location: 'Riverside Park Bench', date: '2024-06-11', description: 'Black leather bifold wallet found on a park bench near the river trail. Contains identity cards and a small amount of cash. Held safely.', status: 'Active', contact: 'finder01@email.com' },
    { id: 'FOUND-2015', title: 'Silver Watch', category: 'Jewelry', location: 'Coffee Shop on 5th Ave', date: '2024-06-09', description: 'Silver analog wrist watch, appears to be a luxury brand. Found on the counter near the restroom. In pristine condition.', status: 'Active', contact: 'goodsam@email.com' },
    { id: 'FOUND-2009', title: 'iPhone 15', category: 'Electronics', location: 'Union Square Subway Station', date: '2024-06-06', description: 'Black iPhone 15 in a dark red silicon case. Found on a subway bench. Battery is dead. Please describe wallpaper to claim.', status: 'Active', contact: 'subway.finder@email.com' },
    { id: 'FOUND-2004', title: 'Blue Denim Jacket', category: 'Clothing', location: 'Gym Locker Room', date: '2024-06-03', description: 'Size L blue denim jacket left in the locker room for over a week. Has a small metallic pin on the lapel.', status: 'Active', contact: 'gym.staff@email.com' },
    { id: 'FOUND-1998', title: 'Car Keys with Fob', category: 'Other', location: 'Parking Lot B', date: '2024-05-31', description: 'Set of car keys with a Toyota fob and a small green keychain. Found in the parking lot near the main entrance.', status: 'Resolved', contact: 'lot.attendant@email.com' },
    { id: 'FOUND-1990', title: 'Student ID Card', category: 'Documents', location: 'City College Cafeteria', date: '2024-05-28', description: 'Student ID card for City College. Handed to the reception desk. Owner can claim at the front administration office.', status: 'Active', contact: 'college.admin@email.com' },
];

function SearchFoundItems() {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('All');
    const [selectedItem, setSelectedItem] = React.useState(null);

    const filtered = foundItems.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.location.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'All' || item.category === category;
        return matchSearch && matchCategory;
    });

    const textColor = '#1A1D1F';
    const subTextColor = '#6F767E';
    const cardBg = '#ffffff';
    const cardBorder = 'rgba(0, 0, 0, 0.08)';

    return (
        <AfterLoginLayout pageTitle="Search Found Items">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                
                {/* Search & Category Filter Section with Expanded Width */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', mb: 3, p: 3 }}>
                        <Grid container spacing={2.5} alignItems="center">
                            {/* Expanded Search Bar */}
                            <Grid item xs={12} lg={8}>
                                <TextField
                                    fullWidth
                                    placeholder="Search found items by keyword, title, or location..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: '#ff9800', fontSize: 24 }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: search && (
                                            <InputAdornment position="end">
                                                <Button size="small" onClick={() => setSearch('')} sx={{ minWidth: 32, p: 0.5, borderRadius: '50%' }}>
                                                    <ClearIcon fontSize="small" />
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: '#F4F5F6',
                                            px: 2,
                                            py: 0.5,
                                            '& fieldset': { borderColor: 'transparent' },
                                            '&:hover fieldset': { borderColor: '#ff9800' },
                                            '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                                            '& input': { color: textColor, fontSize: '0.95rem', fontWeight: 500 },
                                            '& input::placeholder': { color: subTextColor, opacity: 1, fontSize: '0.92rem' },
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Expanded Category Dropdown Select */}
                            <Grid item xs={12} lg={4}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Filter Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: '#F4F5F6',
                                            py: 0.5,
                                            '& fieldset': { borderColor: 'transparent' },
                                            '&:hover fieldset': { borderColor: '#ff9800' },
                                            '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                                            '& .MuiSelect-select': { color: textColor, fontSize: '0.95rem', fontWeight: 600 },
                                        },
                                        '& .MuiInputLabel-root': { color: subTextColor, fontWeight: 500 },
                                        '& .MuiSvgIcon-root': { color: subTextColor },
                                    }}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 20, color: cat === category ? '#ff9800' : subTextColor }}>
                                                    {cat === 'All' ? 'apps' : cat === 'Electronics' ? 'devices' : cat === 'Clothing' ? 'apparel' : cat === 'Documents' ? 'badge' : cat === 'Jewelry' ? 'diamond' : cat === 'Bags' ? 'work' : 'category'}
                                                </span>
                                                <Typography variant="body2" fontWeight={cat === category ? 700 : 400}>{cat}</Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        {/* Category Pill Badges */}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2.5 }}>
                            {CATEGORIES.map((cat) => (
                                <Chip
                                    key={cat}
                                    label={cat}
                                    onClick={() => setCategory(cat)}
                                    color={category === cat ? 'warning' : 'default'}
                                    variant={category === cat ? 'filled' : 'outlined'}
                                    size="small"
                                    sx={{
                                        borderRadius: '12px',
                                        fontWeight: category === cat ? 700 : 500,
                                        px: 1,
                                        py: 0.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                />
                            ))}
                        </Box>
                    </Card>
                </motion.div>

                {/* Items Found Message - Displayed as Info Alert */}
                <Box sx={{ mb: 3 }}>
                    <Alert
                        icon={<InfoOutlinedIcon fontSize="inherit" />}
                        severity="info"
                        sx={{
                            borderRadius: '16px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            border: '1px solid rgba(255, 152, 0, 0.4)',
                            bgcolor: '#fff3e0',
                            color: '#e65100',
                        }}
                    >
                        Showing <strong>{filtered.length}</strong> found item{filtered.length !== 1 ? 's' : ''} available in the community registry. Your lost item might be listed here!
                    </Alert>
                </Box>

                {/* Card Grid with 2 Items Per Row & Line-Wrapping Descriptions */}
                <Grid container spacing={3}>
                    {filtered.map((item, i) => (
                        <Grid item xs={12} md={6} key={item.id} sx={{ display: 'flex' }}>
                            <motion.div custom={i} initial="hidden" animate="visible" variants={fadeInUp} style={{ width: '100%', display: 'flex' }}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        backgroundColor: cardBg,
                                        border: `1px solid ${cardBorder}`,
                                        borderRadius: '24px',
                                        transition: 'all 0.3s ease',
                                        p: 1,
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                                            borderColor: '#ff9800',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip label={item.category} color="warning" size="small" variant="outlined" sx={{ fontWeight: 700, borderRadius: '8px' }} />
                                            <Chip
                                                label={item.status}
                                                color={item.status === 'Active' ? 'success' : 'default'}
                                                size="small"
                                                sx={{ fontWeight: 700, borderRadius: '8px' }}
                                            />
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 800, color: textColor, fontSize: '1.15rem', lineHeight: 1.3 }}>
                                            {item.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                                <LocationOnIcon sx={{ fontSize: 18, color: '#4caf50' }} />
                                                <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 600 }}>{item.location}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                                <CalendarTodayIcon sx={{ fontSize: 16, color: subTextColor }} />
                                                <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 500 }}>Found: {item.date}</Typography>
                                            </Box>
                                        </Box>

                                        {/* Description Brings to New Line when Overflown */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '0.9rem',
                                                lineHeight: 1.6,
                                                color: '#33383F',
                                                wordBreak: 'break-word',
                                                whiteSpace: 'pre-line',
                                                mt: 1,
                                                pt: 1,
                                                borderTop: '1px dashed rgba(0,0,0,0.08)',
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ p: 3, pt: 0 }}>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="medium"
                                            fullWidth
                                            sx={{
                                                borderRadius: '14px',
                                                fontWeight: 700,
                                                py: 1.2,
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
                                                color: '#fff',
                                                boxShadow: 'none',
                                                '&:hover': { boxShadow: '0 4px 14px rgba(255, 152, 0, 0.4)' },
                                            }}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            View Found Item Details
                                        </Button>
                                    </Box>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Detail Modal Dialog */}
            <Dialog
                open={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                maxWidth="sm"
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
                {selectedItem && (
                    <>
                        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.3rem', pb: 1 }}>{selectedItem.title}</DialogTitle>
                        <DialogContent>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip label={selectedItem.category} color="warning" size="small" />
                                <Chip label={selectedItem.status} color={selectedItem.status === 'Active' ? 'success' : 'default'} size="small" />
                            </Box>
                            <Divider sx={{ mb: 2.5, borderColor: cardBorder }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Report ID</Typography>
                                    <Typography variant="body2" fontWeight={700}>{selectedItem.id}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Date Found</Typography>
                                    <Typography variant="body2" fontWeight={700}>{selectedItem.date}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Found Location</Typography>
                                    <Typography variant="body2" fontWeight={700}>{selectedItem.location}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Full Description</Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                                        {selectedItem.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Finder Contact</Typography>
                                    <Typography variant="body2" fontWeight={700} color="warning.main">{selectedItem.contact}</Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2.5, gap: 1 }}>
                            <Button onClick={() => setSelectedItem(null)} variant="outlined" sx={{ borderRadius: '12px' }}>Close</Button>
                            <Button variant="contained" color="warning" sx={{ borderRadius: '12px', fontWeight: 700, color: '#fff' }}>Claim Item</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </AfterLoginLayout>
    );
}

export default SearchFoundItems;


