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
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { motion } from 'framer-motion';
import './SearchFoundItems.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
    }),
};

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const foundItems = [
    { id: 'FOUND-2018', title: 'Black Wallet', category: 'Bags', location: 'Riverside Park', date: '2024-06-11', description: 'Black leather wallet found on a park bench. Contains some cards and a small amount of cash. Currently held safely.', status: 'Active', contact: 'finder01@email.com' },
    { id: 'FOUND-2015', title: 'Silver Watch', category: 'Jewelry', location: 'Coffee Shop on 5th Ave', date: '2024-06-09', description: 'Silver analog watch, appears to be a luxury brand. Found on the counter near the restrooms. In good condition.', status: 'Active', contact: 'goodsam@email.com' },
    { id: 'FOUND-2009', title: 'iPhone 15', category: 'Electronics', location: 'Union Square Station', date: '2024-06-06', description: 'Black iPhone 15 in a red case. Found on a subway bench. Battery is dead. Please describe it to claim.', status: 'Active', contact: 'subway.finder@email.com' },
    { id: 'FOUND-2004', title: 'Blue Denim Jacket', category: 'Clothing', location: 'Gym Locker Room', date: '2024-06-03', description: 'Size L blue denim jacket left in the locker room for over a week. Has a small pin on the lapel.', status: 'Active', contact: 'gym.staff@email.com' },
    { id: 'FOUND-1998', title: 'Car Keys', category: 'Other', location: 'Parking Lot B', date: '2024-05-31', description: 'Set of car keys with a Toyota fob and a small green keychain. Found in the parking lot near the entrance.', status: 'Resolved', contact: 'lot.attendant@email.com' },
    { id: 'FOUND-1990', title: 'Student ID Card', category: 'Documents', location: 'City College Cafeteria', date: '2024-05-28', description: 'Student ID card for City College. Handed to the reception desk. Owner can claim at the front office.', status: 'Active', contact: 'college.admin@email.com' },
    { id: 'FOUND-1985', title: 'Wireless Earbuds', category: 'Electronics', location: 'Fitness Park', date: '2024-05-25', description: 'Small white wireless earbuds (Sony brand) in a charging case. Found on a workout bench.', status: 'Active', contact: 'park.volunteer@email.com' },
    { id: 'FOUND-1978', title: 'Pearl Necklace', category: 'Jewelry', location: 'City Hall Garden', date: '2024-05-21', description: 'White pearl necklace with a silver clasp. Found near the fountain. Very delicate and beautiful.', status: 'Resolved', contact: 'garden.keeper@email.com' },
];

function SearchFoundItems() {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('All');
    const [selectedItem, setSelectedItem] = React.useState(null);

    const filtered = foundItems.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.location.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'All' || item.category === category;
        return matchSearch && matchCategory;
    });

    return (
        <Box className="search-found-root">
            <Box className="search-found-hero">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <SearchIcon sx={{ fontSize: 40, color: '#ff9800' }} />
                            <Box>
                                <Typography variant="h4" className="search-found-hero-title">Search Found Items</Typography>
                                <Typography variant="body1" className="search-found-hero-subtitle">
                                    Browse items found by community members — your lost item might be here!
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Card className="search-found-filter-card" elevation={2}>
                        <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search by title or location..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: 'rgba(0,0,0,0.23)' },
                                                '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.87)' },
                                                '& input': { color: '#1a1a2e' },
                                                '& textarea': { color: '#1a1a2e' },
                                            },
                                            '& .MuiInputLabel-root': { color: '#555555' },
                                            '& .MuiSelect-select': { color: '#1a1a2e' },
                                            '& .MuiSvgIcon-root': { color: '#555555' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: 'rgba(0,0,0,0.23)' },
                                                '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.87)' },
                                                '& input': { color: '#1a1a2e' },
                                                '& textarea': { color: '#1a1a2e' },
                                            },
                                            '& .MuiInputLabel-root': { color: '#555555' },
                                            '& .MuiSelect-select': { color: '#1a1a2e' },
                                            '& .MuiSvgIcon-root': { color: '#555555' },
                                        }}
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </motion.div>

                <Typography variant="h6" className="search-found-section-title">
                    {filtered.length} Found Item{filtered.length !== 1 ? 's' : ''} Available
                </Typography>

                <Grid container spacing={3}>
                    {filtered.map((item, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            <motion.div custom={i} initial="hidden" animate="visible" variants={fadeInUp} whileHover={{ scale: 1.02 }}>
                                <Card className="search-found-item-card" elevation={3}>
                                    <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Chip label={item.category} color="warning" size="small" variant="outlined" />
                                            <Chip label={item.status} color={item.status === 'Active' ? 'success' : 'default'} size="small" />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a2e', fontSize: '1rem' }}>
                                            {item.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <LocationOnIcon sx={{ fontSize: 14, color: '#888' }} />
                                            <Typography variant="caption" sx={{ color: '#555555' }}>{item.location}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 14, color: '#888' }} />
                                            <Typography variant="caption" sx={{ color: '#555555' }}>{item.date}</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: '#555555' }}>
                                            {item.description}
                                        </Typography>
                                        <Button variant="outlined" color="warning" size="small" fullWidth sx={{ mt: 1 }} onClick={() => setSelectedItem(item)}>
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)} maxWidth="sm" fullWidth>
                {selectedItem && (
                    <>
                        <DialogTitle sx={{ fontWeight: 700 }}>{selectedItem.title}</DialogTitle>
                        <DialogContent>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip label={selectedItem.category} color="warning" size="small" />
                                <Chip label={selectedItem.status} color={selectedItem.status === 'Active' ? 'success' : 'default'} size="small" />
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#555555' }}>Report ID</Typography>
                                    <Typography variant="body2" fontWeight={600}>{selectedItem.id}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#555555' }}>Date Found</Typography>
                                    <Typography variant="body2" fontWeight={600}>{selectedItem.date}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: '#555555' }}>Found Location</Typography>
                                    <Typography variant="body2" fontWeight={600}>{selectedItem.location}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: '#555555' }}>Description</Typography>
                                    <Typography variant="body2">{selectedItem.description}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" sx={{ color: '#555555' }}>Finder Contact</Typography>
                                    <Typography variant="body2" fontWeight={600}>{selectedItem.contact}</Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, gap: 1 }}>
                            <Button onClick={() => setSelectedItem(null)} variant="outlined">Close</Button>
                            <Button variant="contained" color="warning">Claim Item</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}

export default SearchFoundItems;
