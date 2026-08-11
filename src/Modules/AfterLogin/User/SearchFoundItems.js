import React, { useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' },
    }),
};

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const initialFoundItems = [
    { id: 'FOUND-2018', title: 'Black Wallet', category: 'Bags', location: 'Riverside Park Bench', date: '2024-06-11', description: 'Black leather bifold wallet found on a park bench near the river trail. Contains identity cards and a small amount of cash.', status: 'Active', contact: 'finder01@email.com' },
    { id: 'FOUND-2015', title: 'Silver Watch', category: 'Jewelry', location: 'Coffee Shop on 5th Ave', date: '2024-06-09', description: 'Silver analog wrist watch, appears to be a luxury brand. Found on the counter near the restroom.', status: 'Active', contact: 'goodsam@email.com' },
    { id: 'FOUND-2009', title: 'iPhone 15', category: 'Electronics', location: 'Union Square Subway Station', date: '2024-06-06', description: 'Black iPhone 15 in a dark red silicon case. Found on a subway bench. Battery is dead.', status: 'Active', contact: 'subway.finder@email.com' },
    { id: 'FOUND-2004', title: 'Blue Denim Jacket', category: 'Clothing', location: 'Gym Locker Room', date: '2024-06-03', description: 'Size L blue denim jacket left in the locker room for over a week.', status: 'Active', contact: 'gym.staff@email.com' },
    { id: 'FOUND-1998', title: 'Car Keys with Fob', category: 'Other', location: 'Parking Lot B', date: '2024-05-31', description: 'Set of car keys with a Toyota fob and a small green keychain.', status: 'Resolved', contact: 'lot.attendant@email.com' },
    { id: 'FOUND-1990', title: 'Student ID Card', category: 'Documents', location: 'City College Cafeteria', date: '2024-05-28', description: 'Student ID card for City College. Handed to the reception desk.', status: 'Active', contact: 'college.admin@email.com' },
];

function SearchFoundItems() {
    const { currentUser } = useAuth();
    const isSuperAdmin = currentUser?.role === 'superadmin';

    const [items, setItems] = useState(initialFoundItems);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionNotice, setActionNotice] = useState('');

    const handleDeleteItem = (e, itemId) => {
        e.stopPropagation();
        setItems((prev) => prev.filter((i) => i.id !== itemId));
        if (selectedItem?.id === itemId) setSelectedItem(null);
        setActionNotice(`Found item report ${itemId} was permanently deleted by Super Admin.`);
        setTimeout(() => setActionNotice(''), 3500);
    };

    const filtered = items.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.location.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'All' || item.category === category;
        return matchSearch && matchCategory;
    });

    const textColor = '#F4F5F6';
    const subTextColor = '#9A9FA5';
    const cardBg = '#1E212B';
    const cardBorder = '#262A36';

    return (
        <AfterLoginLayout pageTitle="Search Found Items">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                
                {actionNotice && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(0, 255, 157, 0.15)', color: textColor, border: '1px solid rgba(0, 255, 157, 0.3)' }} onClose={() => setActionNotice('')}>
                            {actionNotice}
                        </Alert>
                    </Box>
                )}

                {/* Search & Category Filter Section */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', mb: 3, p: 3 }}>
                        <Grid container spacing={2.5} alignItems="center">
                            {/* Search Input */}
                            <Grid item xs={12} lg={8}>
                                <TextField
                                    fullWidth
                                    placeholder="Search found items by keyword, title, or location..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: '#FFB800', fontSize: 24 }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: search && (
                                            <InputAdornment position="end">
                                                <Button size="small" onClick={() => setSearch('')} sx={{ minWidth: 32, p: 0.5, borderRadius: '50%', color: subTextColor }}>
                                                    <ClearIcon fontSize="small" />
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: '#14161D',
                                            px: 2,
                                            py: 0.5,
                                            '& fieldset': { borderColor: cardBorder },
                                            '&:hover fieldset': { borderColor: '#FFB800' },
                                            '&.Mui-focused fieldset': { borderColor: '#FFB800' },
                                            '& input': { color: textColor, fontSize: '0.95rem', fontWeight: 500 },
                                            '& input::placeholder': { color: subTextColor, opacity: 1, fontSize: '0.92rem' },
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Category Dropdown Select */}
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
                                            backgroundColor: '#14161D',
                                            py: 0.5,
                                            '& fieldset': { borderColor: cardBorder },
                                            '&:hover fieldset': { borderColor: '#FFB800' },
                                            '&.Mui-focused fieldset': { borderColor: '#FFB800' },
                                            '& .MuiSelect-select': { color: textColor, fontSize: '0.95rem', fontWeight: 600 },
                                        },
                                        '& .MuiInputLabel-root': { color: subTextColor, fontWeight: 500 },
                                        '& .MuiSvgIcon-root': { color: subTextColor },
                                    }}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <MenuItem key={cat} value={cat} sx={{ bgcolor: '#1E212B', color: textColor, '&:hover': { bgcolor: '#14161D' } }}>
                                            <Typography variant="body2" fontWeight={cat === category ? 700 : 400}>{cat}</Typography>
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
                                    sx={{
                                        borderRadius: '12px',
                                        fontWeight: category === cat ? 700 : 500,
                                        px: 1,
                                        py: 0.5,
                                        cursor: 'pointer',
                                        bgcolor: category === cat ? '#FFB800' : '#14161D',
                                        color: category === cat ? '#0D0E12' : subTextColor,
                                        border: `1px solid ${category === cat ? '#FFB800' : cardBorder}`,
                                        '&:hover': { bgcolor: category === cat ? '#FFB800' : '#1F2128' },
                                    }}
                                />
                            ))}
                        </Box>
                    </Card>
                </motion.div>

                {/* Items Found Alert Banner */}
                <Box sx={{ mb: 3 }}>
                    <Alert
                        icon={<InfoOutlinedIcon fontSize="inherit" sx={{ color: '#FFB800' }} />}
                        sx={{
                            borderRadius: '16px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            border: '1px solid rgba(255, 184, 0, 0.3)',
                            bgcolor: 'rgba(255, 184, 0, 0.1)',
                            color: '#F4F5F6',
                        }}
                    >
                        Showing <strong style={{ color: '#FFB800' }}>{filtered.length}</strong> found item{filtered.length !== 1 ? 's' : ''} available in the community registry.
                    </Alert>
                </Box>

                {/* Card Grid with 2 Items Per Row */}
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
                                            boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                                            borderColor: '#FFB800',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip label={item.category} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(255, 184, 0, 0.15)', color: '#FFB800', border: '1px solid rgba(255, 184, 0, 0.3)' }} />
                                            <Chip
                                                label={item.status}
                                                size="small"
                                                sx={{
                                                    fontWeight: 700,
                                                    borderRadius: '8px',
                                                    bgcolor: item.status === 'Active' ? 'rgba(0, 255, 157, 0.15)' : 'rgba(154, 159, 165, 0.15)',
                                                    color: item.status === 'Active' ? '#00FF9D' : subTextColor,
                                                }}
                                            />
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 800, color: textColor, fontSize: '1.15rem', lineHeight: 1.3 }}>
                                            {item.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                                <LocationOnIcon sx={{ fontSize: 18, color: '#00FF9D' }} />
                                                <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 600 }}>{item.location}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                                <CalendarTodayIcon sx={{ fontSize: 16, color: subTextColor }} />
                                                <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 500 }}>Found: {item.date}</Typography>
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '0.9rem',
                                                lineHeight: 1.6,
                                                color: subTextColor,
                                                wordBreak: 'break-word',
                                                whiteSpace: 'pre-line',
                                                mt: 1,
                                                pt: 1,
                                                borderTop: `1px dashed ${cardBorder}`,
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ p: 3, pt: 0, display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                borderRadius: '14px',
                                                fontWeight: 800,
                                                py: 1.2,
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
                                                background: 'linear-gradient(135deg, #FFB800 0%, #FF9800 100%)',
                                                color: '#0D0E12',
                                            }}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            View Found Item Details
                                        </Button>

                                        {/* Super Admin Direct Delete Button */}
                                        {isSuperAdmin && (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={(e) => handleDeleteItem(e, item.id)}
                                                sx={{ borderRadius: '14px', fontWeight: 800, minWidth: 'auto', px: 2 }}
                                                title="Super Admin Delete"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </Button>
                                        )}
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
                        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.3rem', pb: 1, color: textColor }}>{selectedItem.title}</DialogTitle>
                        <DialogContent>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip label={selectedItem.category} size="small" sx={{ bgcolor: 'rgba(255, 184, 0, 0.15)', color: '#FFB800', fontWeight: 700 }} />
                                <Chip label={selectedItem.status} size="small" sx={{ bgcolor: selectedItem.status === 'Active' ? 'rgba(0, 255, 157, 0.15)' : 'rgba(154, 159, 165, 0.15)', color: selectedItem.status === 'Active' ? '#00FF9D' : subTextColor, fontWeight: 700 }} />
                            </Box>
                            <Divider sx={{ mb: 2.5, borderColor: cardBorder }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Report ID</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{selectedItem.id}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Date Found</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{selectedItem.date}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Found Location</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{selectedItem.location}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Full Description</Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6, wordBreak: 'break-word', whiteSpace: 'pre-line', color: subTextColor }}>
                                        {selectedItem.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Finder Contact</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ color: '#FFB800' }}>{selectedItem.contact}</Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2.5, gap: 1 }}>
                            {isSuperAdmin && (
                                <Button onClick={(e) => handleDeleteItem(e, selectedItem.id)} color="error" sx={{ fontWeight: 800 }}>
                                    Delete Listing (Admin)
                                </Button>
                            )}
                            <Button onClick={() => setSelectedItem(null)} variant="outlined" sx={{ borderRadius: '12px', color: subTextColor, borderColor: cardBorder }}>Close</Button>
                            <Button variant="contained" sx={{ borderRadius: '12px', fontWeight: 800, background: 'linear-gradient(135deg, #FFB800 0%, #FF9800 100%)', color: '#0D0E12' }}>Claim Item</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </AfterLoginLayout>
    );
}

export default SearchFoundItems;
