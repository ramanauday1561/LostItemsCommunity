import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Avatar,
    Chip,
    Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ForumIcon from '@mui/icons-material/Forum';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

import './Dashboard.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
};

const dashboardCards = [
    {
        title: 'Report Lost Item',
        description: 'Lost something? Report it here so the community can help you find it.',
        icon: <ReportProblemIcon sx={{ fontSize: 40, color: '#f44336' }} />,
        route: '/login-needed',
        tag: 'Report',
        tagColor: 'error',
    },
    {
        title: 'Report Found Item',
        description: 'Found something? Let the owner know by posting it here.',
        icon: <FindInPageIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
        route: '/login-needed',
        tag: 'Report',
        tagColor: 'success',
    },
    {
        title: 'Search Lost Items',
        description: 'Looking for your lost item? Search through community reports.',
        icon: <SearchIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
        route: '/login-needed',
        tag: 'Search',
        tagColor: 'primary',
    },
    {
        title: 'Search Found Items',
        description: 'Browse items found by community members to reclaim yours.',
        icon: <SearchIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
        route: '/login-needed',
        tag: 'Search',
        tagColor: 'warning',
    },
    {
        title: 'Community Forum',
        description: 'Connect with other members, share tips, and collaborate.',
        icon: <ForumIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
        route: '/login-needed',
        tag: 'Community',
        tagColor: 'secondary',
    },
    {
        title: 'About Us',
        description: 'Learn more about the LostItemsCommunity mission and team.',
        icon: <InfoIcon sx={{ fontSize: 40, color: '#00bcd4' }} />,
        route: '/about-us',
        tag: 'Info',
        tagColor: 'info',
    },
    {
        title: 'Contact Us',
        description: 'Have a question or feedback? Reach out to the support team.',
        icon: <ContactMailIcon sx={{ fontSize: 40, color: '#607d8b' }} />,
        route: '/login-needed',
        tag: 'Support',
        tagColor: 'default',
    },
];

function Dashboard() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    return (
        <Box className="dashboard-root">
            {/* Hero Section */}
            <Box className="dashboard-hero">
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Box className="dashboard-hero-content">
                            <Avatar className="dashboard-hero-avatar">
                                {currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
                            </Avatar>
                            <Box>
                                <Typography variant="h4" className="dashboard-welcome-title">
                                    Welcome back,{' '}
                                    <span className="dashboard-username-highlight">
                                        {currentUser?.displayName || 'User'}
                                    </span>
                                    ! 👋
                                </Typography>
                                <Typography variant="body1" className="dashboard-welcome-subtitle">
                                    What would you like to do today?
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Divider className="dashboard-divider" />

            {/* Cards Section */}
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Typography variant="h5" className="dashboard-section-title" gutterBottom>
                        Available Features
                    </Typography>
                </motion.div>
                <Grid container spacing={3}>
                    {dashboardCards.map((card, i) => (
                        <Grid item xs={12} sm={6} md={4} key={card.title}>
                            <motion.div
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Card className="dashboard-card" elevation={4}>
                                    <CardActionArea
                                        className="dashboard-card-action"
                                        onClick={() => navigate(card.route)}
                                    >
                                        <CardContent className="dashboard-card-content">
                                            <Box className="dashboard-card-icon">{card.icon}</Box>
                                            <Chip
                                                label={card.tag}
                                                color={card.tagColor}
                                                size="small"
                                                className="dashboard-card-chip"
                                            />
                                            <Typography variant="h6" className="dashboard-card-title">
                                                {card.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className="dashboard-card-desc"
                                            >
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Dashboard;
