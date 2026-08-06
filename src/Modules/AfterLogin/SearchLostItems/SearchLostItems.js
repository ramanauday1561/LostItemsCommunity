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
import './SearchLostItems.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.05, ease: 'easeOut' },
    }),
};

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const lostItems = [
    { id: 'LOST-1042', title: 'Blue Laptop Bag', category: 'Bags', location: 'Central Park near Fountain', date: '2024-06-10', description: 'Dark blue waterproof backpack containing a 15-inch MacBook Pro, notebook, and silver water bottle. Extremely urgent as it contains work documents.', status: 'Active', contact: 'john.doe@email.com' },
    { id: 'LOST-1039', title: 'Gold Bracelet', category: 'Jewelry', location: 'Grand Central Terminal', date: '2024-06-08', description: 'Thin 18k gold chain bracelet with a small heart charm. Sentimental value from grandmother. Lost near platform 14 around 5 PM.', status: 'Active', contact: 'mary.smith@email.com' },
    { id: 'LOST-1031', title: 'Samsung Galaxy S24', category: 'Electronics', location: 'Times Square Subway Station', date: '2024-06-05', description: 'Phantom Black Samsung Galaxy S24 in a clear protective case with a card holder sticker on the back.', status: 'Resolved', contact: 'alex.j@email.com' },
    { id: 'LOST-1027', title: 'US Passport', category: 'Documents', location: 'JFK Airport Terminal 4', date: '2024-06-02', description: 'Blue US Passport in a brown leather cover. Lost near security checkpoint B. Reward offered if returned promptly!', status: 'Active', contact: 'traveler99@email.com' },
    { id: 'LOST-1022', title: 'Red Winter Jacket', category: 'Clothing', location: 'Downtown Library 2nd Floor', date: '2024-05-30', description: 'Size M North Face red puffer jacket left on a chair in the reading room. Has house keys in the left pocket.', status: 'Resolved', contact: 'fit.life@email.com' },
    { id: 'LOST-1019', title: 'Airpods Pro (2nd Gen)', category: 'Electronics', location: 'Washington Square Park', date: '2024-05-27', description: 'White charging case with custom engraving "TK". Lost near the chess tables on Sunday afternoon.', status: 'Active', contact: 'tk.music@email.com' },
];

function SearchLostItems() {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('All');
    const [selectedItem, setSelectedItem] = React.useState(null);

    const filtered = lostItems.filter((item) => {
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
        <AfterLoginLayout pageTitle="Search Lost Items">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                
                {/* Search & Category Filter Section with Expanded Width */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '24px', mb: 3, p: 3 }}>
                        <Grid container spacing={2.5} alignItems="center">
                            {/* Expanded Search Bar */}
                            <Grid item xs={12} lg={8}>
                                <TextField
                                    fullWidth
                                    placeholder="Search lost items by keyword, title, or location..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: '#1976d2', fontSize: 24 }} />
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
                                            '&:hover fieldset': { borderColor: '#1976d2' },
                                            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
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
                                            '&:hover fieldset': { borderColor: '#1976d2' },
                                            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                                            '& .MuiSelect-select': { color: textColor, fontSize: '0.95rem', fontWeight: 600 },
                                        },
                                        '& .MuiInputLabel-root': { color: subTextColor, fontWeight: 500 },
                                        '& .MuiSvgIcon-root': { color: subTextColor },
                                    }}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 20, color: cat === category ? '#1976d2' : subTextColor }}>
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
                                    color={category === cat ? 'primary' : 'default'}
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

                {/* Items Found Message */}
                <Box sx={{ mb: 3 }}>
                    <Alert
                        icon={<InfoOutlinedIcon fontSize="inherit" />}
                        severity="info"
                        sx={{
                            borderRadius: '16px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            border: '1px solid rgba(25, 118, 210, 0.3)',
                            bgcolor: '#e3f2fd',
                            color: '#0d47a1',
                        }}
                    >
                        Showing <strong>{filtered.length}</strong> lost item report{filtered.length !== 1 ? 's' : ''} matched in the registry. Click any item card for contact details.
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
                                            borderColor: '#1976d2',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip label={item.category} color="primary" size="small" variant="outlined" sx={{ fontWeight: 700, borderRadius: '8px' }} />
                                            <Chip
                                                label={item.status}
                                                color={item.status === 'Active' ? 'error' : 'success'}
                                                size="small"
                                                sx={{ fontWeight: 700, borderRadius: '8px' }}
                                            />
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 800, color: textColor, fontSize: '1.15rem', lineHeight: 1.3 }}>
                                            {item.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                                <LocationOnIcon sx={{ fontSize: 18, color: '#e53935' }} />
                                                <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 600 }}>{item.location}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                                <CalendarTodayIcon sx={{ fontSize: 16, color: subTextColor }} />
                                                <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 500 }}>Lost: {item.date}</Typography>
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
                                            color="primary"
                                            size="medium"
                                            fullWidth
                                            sx={{
                                                borderRadius: '14px',
                                                fontWeight: 700,
                                                py: 1.2,
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
                                                boxShadow: 'none',
                                                '&:hover': { boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)' },
                                            }}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            View Report Details
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
                                <Chip label={selectedItem.category} color="primary" size="small" />
                                <Chip label={selectedItem.status} color={selectedItem.status === 'Active' ? 'error' : 'success'} size="small" />
                            </Box>
                            <Divider sx={{ mb: 2.5, borderColor: cardBorder }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Report ID</Typography>
                                    <Typography variant="body2" fontWeight={700}>{selectedItem.id}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Date Reported Lost</Typography>
                                    <Typography variant="body2" fontWeight={700}>{selectedItem.date}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Last Known Location</Typography>
                                    <Typography variant="body2" fontWeight={700}>{selectedItem.location}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Full Description</Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                                        {selectedItem.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: subTextColor }}>Owner Contact</Typography>
                                    <Typography variant="body2" fontWeight={700} color="primary.main">{selectedItem.contact}</Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2.5, gap: 1 }}>
                            <Button onClick={() => setSelectedItem(null)} variant="outlined" sx={{ borderRadius: '12px' }}>Close</Button>
                            <Button variant="contained" color="primary" sx={{ borderRadius: '12px', fontWeight: 700 }}>Contact Owner</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </AfterLoginLayout>
    );
}

export default SearchLostItems;
