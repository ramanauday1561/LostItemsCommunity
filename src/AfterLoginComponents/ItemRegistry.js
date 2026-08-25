import React, { useState } from 'react';
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
    Checkbox,
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
import { useAuth } from '../context/AuthContext';
import { statusColor, statusBg } from '../utils/statusColors';
import { textColor, subTextColor, cardBg, cardBorder } from '../utils/afterLoginTokens';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' },
    }),
};

const CATEGORIES = ['Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const ITEMS = {
    lost: [
    { id: 'LOST-1042', title: 'Blue Laptop Bag', category: 'Bags', location: 'Central Park near Fountain', date: '2024-06-10', description: 'Navy blue Herschel laptop bag containing a MacBook 14-inch, notebooks, and blue water bottle. Left near park bench.', status: 'Active', contact: 'john.doe@email.com' },
    { id: 'LOST-1039', title: 'Gold Bracelet', category: 'Jewelry', location: 'Downtown Mall Food Court', date: '2024-06-08', description: '14k gold chain bracelet with a small heart charm. sentimental value. Reward offered if returned safely.', status: 'Active', contact: 'mary.smith@email.com' },
    { id: 'LOST-1031', title: 'Samsung Galaxy S24', category: 'Electronics', location: 'Main Street Bus Stop #4', date: '2024-06-05', description: 'Titanium Gray Galaxy S24 Ultra in a clear case. Phone was lost on Wednesday morning around 8:30 AM.', status: 'Active', contact: 'alex.j@email.com' },
    { id: 'LOST-1027', title: 'Passport (US)', category: 'Documents', location: 'JFK Airport Terminal 4', date: '2024-06-02', description: 'US Passport in a brown leather cover. Lost near security checkpoint. Urgent travel plans ahead.', status: 'Active', contact: 'traveler99@email.com' },
    { id: 'LOST-1022', title: 'Red Winter Jacket', category: 'Clothing', location: 'City Library Reading Room', date: '2024-05-30', description: 'North Face red padded winter coat, size M. Left on a chair on the 2nd floor reading hall.', status: 'Resolved', contact: 'fit.life@email.com' },
    { id: 'LOST-1019', title: 'AirPods Pro 2', category: 'Electronics', location: 'Central Gym Locker Room', date: '2024-05-27', description: 'AirPods Pro 2 in a black silicone case with a small carabiner attached.', status: 'Active', contact: 'tk.music@email.com' },
    ],
    found: [
    { id: 'FOUND-2018', title: 'Black Wallet', category: 'Bags', location: 'Riverside Park Bench', date: '2024-06-11', description: 'Black leather bifold wallet found on a park bench near the river trail. Contains identity cards and a small amount of cash.', status: 'Active', contact: 'finder01@email.com' },
    { id: 'FOUND-2015', title: 'Silver Watch', category: 'Jewelry', location: 'Coffee Shop on 5th Ave', date: '2024-06-09', description: 'Silver analog wrist watch, appears to be a luxury brand. Found on the counter near the restroom.', status: 'Active', contact: 'goodsam@email.com' },
    { id: 'FOUND-2009', title: 'iPhone 15', category: 'Electronics', location: 'Union Square Subway Station', date: '2024-06-06', description: 'Black iPhone 15 in a dark red silicon case. Found on a subway bench. Battery is dead.', status: 'Active', contact: 'subway.finder@email.com' },
    { id: 'FOUND-2004', title: 'Blue Denim Jacket', category: 'Clothing', location: 'Gym Locker Room', date: '2024-06-03', description: 'Size L blue denim jacket left in the locker room for over a week.', status: 'Active', contact: 'gym.staff@email.com' },
    { id: 'FOUND-1998', title: 'Car Keys with Fob', category: 'Other', location: 'Parking Lot B', date: '2024-05-31', description: 'Set of car keys with a Toyota fob and a small green keychain.', status: 'Resolved', contact: 'lot.attendant@email.com' },
    { id: 'FOUND-1990', title: 'Student ID Card', category: 'Documents', location: 'City College Cafeteria', date: '2024-05-28', description: 'Student ID card for City College. Handed to the reception desk.', status: 'Active', contact: 'college.admin@email.com' },
    ],
};

// Everything that differs between the two registries lives here; the screen itself is shared.
const COPY = {
    lost: {
        pageTitle: 'Search Lost Items',
        placeholder: 'Search lost items by keyword, title, or location...',
        summaryNoun: (n) => `lost item report${n !== 1 ? 's' : ''} in the community database.`,
        datePrefix: 'Lost',
        detailDate: 'Date Lost',
        detailLocation: 'Last Known Location',
        detailDescription: 'Detailed Description',
        detailContact: 'Reporter Contact',
        cta: 'View Report Details',
        primaryAction: 'Contact Reporter',
        deleteNotice: (id) => `Item report ${id} was permanently deleted by Super Admin.`,
    },
    found: {
        pageTitle: 'Search Found Items',
        placeholder: 'Search found items by keyword, title, or location...',
        summaryNoun: (n) => `found item${n !== 1 ? 's' : ''} available in the community registry.`,
        datePrefix: 'Found',
        detailDate: 'Date Found',
        detailLocation: 'Found Location',
        detailDescription: 'Full Description',
        detailContact: 'Finder Contact',
        cta: 'View Found Item Details',
        primaryAction: 'Claim Item',
        deleteNotice: (id) => `Found item report ${id} was permanently deleted by Super Admin.`,
    },
};

function ItemRegistry({ kind = 'lost' }) {
    const copy = COPY[kind];
    const { currentUser } = useAuth();
    const isSuperAdmin = currentUser?.role === 'superadmin';

    const [items, setItems] = useState(ITEMS[kind]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]); // empty = no filter
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionNotice, setActionNotice] = useState('');

    const handleDeleteItem = (e, itemId) => {
        e.stopPropagation();
        setItems((prev) => prev.filter((i) => i.id !== itemId));
        if (selectedItem?.id === itemId) setSelectedItem(null);
        setActionNotice(copy.deleteNotice(itemId));
        setTimeout(() => setActionNotice(''), 3500);
    };

    const filtered = items.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.location.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = categories.length === 0 || categories.includes(item.category);
        return matchSearch && matchCategory;
    });

    return (
        <AfterLoginLayout pageTitle={copy.pageTitle}>
            <Container maxWidth="xl" sx={{ py: { xs: 0, sm: 2 }, px: { xs: 0, sm: 2 } }}>
                
                {actionNotice && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(21, 127, 61, 0.15)', color: textColor, border: '1px solid rgba(21, 127, 61, 0.3)' }} onClose={() => setActionNotice('')}>
                            {actionNotice}
                        </Alert>
                    </Box>
                )}

                {/* Search & Category Filter — one row at every width */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center', mb: { xs: 2, sm: 3 } }}>
                        <TextField
                            fullWidth
                            placeholder={copy.placeholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#0B6BCB', fontSize: 22 }} />
                                    </InputAdornment>
                                ),
                                endAdornment: search && (
                                    <InputAdornment position="end">
                                        <Button size="small" aria-label="Clear search" onClick={() => setSearch('')} sx={{ minWidth: 32, p: 0.5, borderRadius: '50%', color: subTextColor }}>
                                            <ClearIcon fontSize="small" />
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                minWidth: 0,
                                '& .MuiOutlinedInput-root': {
                                    height: 48,
                                    borderRadius: '14px',
                                    backgroundColor: '#FFFFFF',
                                    px: { xs: 1, sm: 2 },
                                    '& fieldset': { borderColor: cardBorder },
                                    '&:hover fieldset': { borderColor: '#0B6BCB' },
                                    '&.Mui-focused fieldset': { borderColor: '#0B6BCB' },
                                    '& input': { color: textColor, fontSize: '0.95rem', fontWeight: 500 },
                                    '& input::placeholder': { color: subTextColor, opacity: 1, fontSize: '0.92rem' },
                                },
                            }}
                        />

                        {/* Multi-select: an empty selection means every category. */}
                        <TextField
                            select
                            value={categories}
                            onChange={(e) => setCategories(e.target.value)}
                            SelectProps={{
                                multiple: true,
                                displayEmpty: true,
                                renderValue: (sel) =>
                                    sel.length === 0 ? 'All' : sel.length === 1 ? sel[0] : `${sel.length} selected`,
                                MenuProps: { PaperProps: { sx: { borderRadius: '14px', mt: 0.5 } } },
                            }}
                            inputProps={{ 'aria-label': 'Filter by category' }}
                            sx={{
                                flexShrink: 0,
                                width: { xs: 124, sm: 200 },
                                '& .MuiOutlinedInput-root': {
                                    height: 48,
                                    borderRadius: '14px',
                                    backgroundColor: '#FFFFFF',
                                    '& fieldset': { borderColor: cardBorder },
                                    '&:hover fieldset': { borderColor: '#0B6BCB' },
                                    '&.Mui-focused fieldset': { borderColor: '#0B6BCB' },
                                },
                                '& .MuiSelect-select': {
                                    color: categories.length ? '#0B6BCB' : subTextColor,
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                },
                                '& .MuiSvgIcon-root': { color: subTextColor },
                            }}
                        >
                            {CATEGORIES.map((cat) => (
                                <MenuItem key={cat} value={cat} sx={{ py: 0.5 }}>
                                    <Checkbox
                                        checked={categories.includes(cat)}
                                        size="small"
                                        sx={{ p: 0.5, mr: 1, color: subTextColor, '&.Mui-checked': { color: '#0B6BCB' } }}
                                    />
                                    <Typography variant="body2" sx={{ color: textColor }}>{cat}</Typography>
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </motion.div>

                {/* Items Found Alert Banner */}
                <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                    <Alert
                        icon={<InfoOutlinedIcon fontSize="inherit" sx={{ color: '#0B6BCB' }} />}
                        sx={{
                            borderRadius: '16px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            border: '1px solid rgba(11, 107, 203, 0.3)',
                            bgcolor: 'rgba(11, 107, 203, 0.1)',
                            color: '#16181F',
                        }}
                    >
                        Showing <strong style={{ color: '#0B6BCB' }}>{filtered.length}</strong> {copy.summaryNoun(filtered.length)}
                    </Alert>
                </Box>

                {/* Card Grid with 2 Items Per Row */}
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                    {filtered.map((item, i) => (
                        <Grid size={{ xs: 12, md: 6 }} key={item.id} sx={{ display: 'flex' }}>
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
                                        p: { xs: 0, sm: 1 },
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            borderColor: '#0B6BCB',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip label={item.category} size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB', border: '1px solid rgba(11, 107, 203, 0.3)' }} />
                                            <Chip
                                                label={item.status}
                                                size="small"
                                                sx={{
                                                    fontWeight: 700,
                                                    borderRadius: '8px',
                                                    bgcolor: statusBg(item.status),
                                                    color: statusColor(item.status),
                                                }}
                                            />
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 800, color: textColor, fontSize: '1.15rem', lineHeight: 1.3 }}>
                                            {item.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                                <LocationOnIcon sx={{ fontSize: 18, color: '#0B6BCB' }} />
                                                <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 600 }}>{item.location}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                                <CalendarTodayIcon sx={{ fontSize: 16, color: subTextColor }} />
                                                <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 500 }}>{copy.datePrefix}: {item.date}</Typography>
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
                                                // Phones: keep cards scannable; full text is in the detail dialog.
                                                display: { xs: '-webkit-box', sm: 'block' },
                                                WebkitLineClamp: { xs: 2, sm: 'unset' },
                                                WebkitBoxOrient: 'vertical',
                                                overflow: { xs: 'hidden', sm: 'visible' },
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ p: { xs: 2, sm: 3 }, pt: 0, display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                borderRadius: '14px',
                                                fontWeight: 800,
                                                py: 1.2,
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
                                                background: '#0B6BCB',
                                                color: '#FFFFFF',
                                            }}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            {copy.cta}
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
                                <Chip label={selectedItem.category} size="small" sx={{ bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB', fontWeight: 700 }} />
                                <Chip label={selectedItem.status} size="small" sx={{ bgcolor: statusBg(selectedItem.status), color: statusColor(selectedItem.status), fontWeight: 700 }} />
                            </Box>
                            <Divider sx={{ mb: 2.5, borderColor: cardBorder }} />
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Report ID</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{selectedItem.id}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>{copy.detailDate}</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{selectedItem.date}</Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>{copy.detailLocation}</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>{selectedItem.location}</Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>{copy.detailDescription}</Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6, wordBreak: 'break-word', whiteSpace: 'pre-line', color: subTextColor }}>
                                        {selectedItem.description}
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>{copy.detailContact}</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ color: '#0B6BCB' }}>{selectedItem.contact}</Typography>
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
                            <Button variant="contained" sx={{ borderRadius: '12px', fontWeight: 800, background: '#0B6BCB', color: '#FFFFFF' }}>{copy.primaryAction}</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </AfterLoginLayout>
    );
}

export default ItemRegistry;
