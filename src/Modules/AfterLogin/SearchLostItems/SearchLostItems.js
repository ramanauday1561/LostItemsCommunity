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
import './SearchLostItems.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
    }),
};

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Documents', 'Jewelry', 'Bags', 'Other'];

const lostItems = [
    { id: 'LOST-1042', title: 'Blue Laptop Bag', category: 'Bags', location: 'Central Park, NY', date: '2024-06-10', description: 'Navy blue laptop bag with a silver zipper. Contains a 15-inch laptop and charger. Has initials "JD" stitched on front pocket.', status: 'Active', contact: 'john.doe@email.com' },
    { id: 'LOST-1039', title: 'Gold Bracelet', category: 'Jewelry', location: 'Downtown Mall', date: '2024-06-08', description: 'Gold chain bracelet with a small heart charm. Family heirloom, very sentimental. Lost near the food court area.', status: 'Active', contact: 'mary.smith@email.com' },
    { id: 'LOST-1031', title: 'Samsung Galaxy S24', category: 'Electronics', location: 'Main St Bus Stop', date: '2024-06-05', description: 'Black Samsung Galaxy S24 in a clear case. Has a cracked screen protector. Reward offered for return.', status: 'Active', contact: 'alex.j@email.com' },
    { id: 'LOST-1027', title: 'Passport', category: 'Documents', location: 'JFK Airport, Terminal 4', date: '2024-06-02', description: 'US Passport with blue cover. Urgent, need it for international travel next week. Please contact immediately.', status: 'Active', contact: 'traveler99@email.com' },
    { id: 'LOST-1022', title: 'Red Winter Jacket', category: 'Clothing', location: 'Riverside Gym', date: '2024-05-30', description: 'Red North Face winter jacket, size M. Left in locker room. Has car keys in the left pocket.', status: 'Resolved', contact: 'fit.life@email.com' },
    { id: 'LOST-1019', title: 'Airpods Pro', category: 'Electronics', location: 'Coffee Bean Café', date: '2024-05-27', description: 'White Airpods Pro in a white charging case. Engraved with "TK" on the case lid.', status: 'Active', contact: 'tk.music@email.com' },
    { id: 'LOST-1014', title: 'Leather Wallet', category: 'Bags', location: 'City Library', date: '2024-05-24', description: 'Brown leather bifold wallet. Contains ID, credit cards, and approximately $80 cash. Reward offered.', status: 'Active', contact: 'wallet.lost@email.com' },
    { id: 'LOST-1008', title: 'Diamond Earrings', category: 'Jewelry', location: 'Grand Hotel Ballroom', date: '2024-05-20', description: 'Pair of diamond stud earrings in silver setting. Lost during a wedding event. Very valuable.', status: 'Resolved', contact: 'bride2024@email.com' },
];

function SearchLostItems() {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('All');
    const [selectedItem, setSelectedItem] = React.useState(null);

    const filtered = lostItems.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.location.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'All' || item.category === category;
        return matchSearch && matchCategory;
    });

    return (
        <Box className="search-lost-root">
            <Box className="search-lost-hero">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <SearchIcon sx={{ fontSize: 40, color: '#2196f3' }} />
                            <Box>
                                <Typography variant="h4" className="search-lost-hero-title">Search Lost Items</Typography>
                                <Typography variant="body1" className="search-lost-hero-subtitle">
                                    Browse community lost item reports to find what you're looking for.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Card className="search-lost-filter-card" elevation={2}>
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
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
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

                <Typography variant="h6" className="search-lost-section-title">
                    {filtered.length} Lost Item{filtered.length !== 1 ? 's' : ''} Found
                </Typography>

                <Grid container spacing={3}>
                    {filtered.map((item, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            <motion.div custom={i} initial="hidden" animate="visible" variants={fadeInUp} whileHover={{ scale: 1.02 }}>
                                <Card className="search-lost-item-card" elevation={3}>
                                    <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Chip label={item.category} color="primary" size="small" variant="outlined" />
                                            <Chip label={item.status} color={item.status === 'Active' ? 'warning' : 'success'} size="small" />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a2e', fontSize: '1rem' }}>
                                            {item.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <LocationOnIcon sx={{ fontSize: 14, color: '#888' }} />
                                            <Typography variant="caption" color="text.secondary">{item.location}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 14, color: '#888' }} />
                                            <Typography variant="caption" color="text.secondary">{item.date}</Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                            {item.description}
                                        </Typography>
                                        <Button variant="outlined" color="primary" size="small" fullWidth sx={{ mt: 1 }} onClick={() => setSelectedItem(item)}>
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
                                <Chip label={selectedItem.category} color="primary" size="small" />
                                <Chip label={selectedItem.status} color={selectedItem.status === 'Active' ? 'warning' : 'success'} size="small" />
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">Report ID</Typography>
                                    <Typography variant="body2" fontWeight={600}>{selectedItem.id}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">Date Lost</Typography>
                                    <Typography variant="body2" fontWeight={600}>{selectedItem.date}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" color="text.secondary">Last Seen Location</Typography>
                                    <Typography variant="body2" fontWeight={600}>{selectedItem.location}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" color="text.secondary">Description</Typography>
                                    <Typography variant="body2">{selectedItem.description}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" color="text.secondary">Contact</Typography>
                                    <Typography variant="body2" fontWeight={600}>{selectedItem.contact}</Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, gap: 1 }}>
                            <Button onClick={() => setSelectedItem(null)} variant="outlined">Close</Button>
                            <Button variant="contained" color="primary">Contact Reporter</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}

export default SearchLostItems;
