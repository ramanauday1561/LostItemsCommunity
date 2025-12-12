import {
    Container,
    Grid,
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router";
import { motion } from 'framer-motion';

import "./WelcomePageModule.css";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const WelcomePageModule = () => {
    const navigate = useNavigate();

    return (
        <Box className="welcome-page-module">
            {/* Hero Section */}
            <Box id="hero" sx={{ position: 'relative', py: { xs: 4, md: 8 }, overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${"images/Background2.webp"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1)'
                    }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="center" justifyContent="space-evenly">
                        <Grid item xs={12} md={6} sx={{ maxWidth: 490 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInLeft}
                            >
                                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                                    <Box component="span" sx={{ color: 'secondary.main' }}>Lost Something?</Box> We'll Help You <Box component="span" sx={{ color: 'primary.main' }}>Find It!</Box>
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInLeft}
                                transition={{ delay: 0.2 }}
                            >
                                <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.7 }}>
                                    Join thousands of people reuniting with their lost belongings every day. Report what you've found, search for what you've lost, and be part of a caring community that believes in helping each other.
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInUp}
                                transition={{ delay: 0.4 }}
                            >
                                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button variant="outlined" color="primary" size="large" className="animated-button">Search Items</Button>
                                    <Button onClick={() => navigate('/signup')} variant="contained" color="secondary" size="large" className="animated-button">Get Started Free</Button>
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 600 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInRight}
                            >
                                <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                    <Box
                                        component="img"
                                        src="images/HomePage1.webp"
                                        alt="Illustration of a person returning a lost item"
                                        sx={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            width: { xs: '80%', md: '100%' },
                                        }}
                                    />
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* About Section */}
            <Box id="about" sx={{ py: { xs: 4, md: 8 }, position: 'relative', overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${"images/Background2.webp"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1) scaleY(-1)',
                    }}
                />
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6} sx={{ maxWidth: 600 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInLeft}
                            >
                                <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                    <Box
                                        component="img"
                                        src="images/hero-boy-with-dog.webp"
                                        alt="Illustration of a boy returning a lost dog"
                                        sx={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            width: { xs: '80%', md: '100%' },
                                        }}
                                    />
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 490 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInRight}
                            >
                                <Typography variant="h4" gutterBottom fontWeight={700}>
                                    How It Works - Simple, Fast & Effective
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                                    We've made finding lost items incredibly easy. Whether you've lost your wallet, keys, phone, jewelry, or any precious item, our community is here to help. Found something? Be a hero and help someone's day!
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={staggerContainer}
                            >
                                <List>
                                    <motion.div variants={fadeInUp}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <img src="images/78_177.svg" alt="icon" width={24} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography>Report Found Items</Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <img src="images/79_184.svg" alt="icon" width={24} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography>Search for Lost Belongings</Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <img src="images/79_189.svg" alt="icon" width={24} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography>Community-Driven Platform for Lost & Found</Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </motion.div>
                                </List>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box id="features" sx={{ position: 'relative', py: { xs: 4, md: 8 }, overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${"images/Background2.webp"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1)'
                    }}
                />
                <Container maxWidth="lg">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
                            Everything You Need in One Place
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ maxWidth: 766, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                            From reporting found items to searching our extensive database, we've built the most comprehensive lost & found platform. Join over 10,000+ users who trust us to help them find what matters most.
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <Grid container className="features-grid">
                            <motion.div variants={scaleIn}>
                                <Grid item xs={12} md={4} className="feature-card">
                                    <Box sx={{ textAlign: 'center' }}>
                                        <img src="images/feature-report-found.png" alt="Report Found Items" width={260} loading="lazy" />
                                        <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>Report Found Items</Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            Found something? Upload details in 30 seconds and help someone's day! Include photos, location, and description to maximize chances of reunion.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </motion.div>
                            <motion.div variants={scaleIn}>
                                <Grid item xs={12} md={4} className="feature-card">
                                    <Box sx={{ textAlign: 'center' }}>
                                        <img src="images/feature-search-system.png" alt="Search for Lost Belongings" width={260} loading="lazy" />
                                        <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>Smart Search System</Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            Use our intelligent search with filters by category, location, date, and color. Get instant notifications when matching items are reported!
                                        </Typography>
                                    </Box>
                                </Grid>
                            </motion.div>
                            <motion.div variants={scaleIn}>
                                <Grid item xs={12} md={4} className="feature-card">
                                    <Box sx={{ textAlign: 'center' }}>
                                        <img src="images/feature-success-stories.webp" alt="Success Stories" width={260} loading="lazy" />
                                        <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>Success Stories</Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            Over 5,000 happy reunions and counting! Read inspiring stories of wallets, pets, jewelry, and precious memories found through our community.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </motion.div>
                        </Grid>
                    </motion.div>
                </Container>
            </Box>

            {/* Benefits Section */}
            <Box id="benefits" sx={{ position: 'relative', py: { xs: 4, md: 8 } }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${"images/Background2.webp"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1) scaleY(-1)',
                    }}
                />
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={6} sx={{ maxWidth: 500 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInLeft}
                            >
                                <Typography variant="h4" fontWeight={700} gutterBottom>
                                    Why Choose Us?
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                                    We're more than just a lost & found platform - we're a community of caring people. Fast, secure, and completely free to use. Your next reunion is just a click away!
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={staggerContainer}
                            >
                                <List>
                                    <motion.div variants={fadeInUp}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <img src="images/100_306.svg" alt="icon" width={24} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography sx={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.95)' }}><strong>100% Free Forever</strong> - No hidden fees, no premium plans. Everyone deserves help finding what's lost.</Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <img src="images/100_311.svg" alt="icon" width={24} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography sx={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.95)' }}><strong>Instant Notifications</strong> - Get alerts when items matching your description are found.</Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <img src="images/100_316.svg" alt="icon" width={24} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography sx={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.95)' }}><strong>Trusted Community</strong> - Verified users, secure messaging, and safe meetup guidelines.</Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </motion.div>
                                </List>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 600 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInRight}
                            >
                                <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                    <img src="images/illustration-exchange-item.png" alt="Illustration of people exchanging a lost item" style={{ width: '100%', maxWidth: 520 }} loading="lazy" />
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box id="cta" sx={{ position: 'relative', py: { xs: 4, md: 8 } }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${"images/Background2.webp"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1) scaleY(1)'
                    }}
                />
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={scaleIn}
                            >
                                <Box sx={{ textAlign: 'center' }}>
                                    <img src="images/illustration-person-finding-items.webp" alt="Illustration of a person finding lost items" style={{ width: '100%', maxWidth: 420 }} loading="lazy" />
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 680 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInRight}
                            >
                                <Typography variant="h4" fontWeight={700} gutterBottom>
                                    Ready to Make a Difference?
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                                    Whether you've found something or lost something precious, take action now. Every second counts when it comes to reuniting people with their belongings. Join our growing community today!
                                </Typography>
                                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button variant="contained" color="primary" size="large" className="animated-button">Report Found Item</Button>
                                    <Button variant="outlined" color="secondary" size="large" className="animated-button">Search Lost Items</Button>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box id="testimonials" sx={{ position: 'relative', py: { xs: 4, md: 8 } }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${"images/Background2.webp"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1) scaleY(-1)',
                    }}
                />
                <Container maxWidth="lg">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
                            Real Stories, Real Results
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ fontSize: '1.05rem' }}>
                            Don't just take our word for it - see how we've helped thousands reunite with their lost items
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <Grid className="testimonials-grid">
                            <motion.div variants={fadeInUp}>
                                <Grid className="testimonial-card">
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>Best Website for Lost Items</Typography>
                                        <Typography variant="body2" sx={{ my: 2, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            "I lost my wallet and thanks to Lost & Found Hub, I was able to recover it within a day. Amazing Service by the website!"
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <img src="images/113_115.svg" alt="John Doe" width={48} />
                                            <Box>
                                                <Typography variant="subtitle2">John Doe</Typography>
                                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.75)' }}>Marketing Manager, ABC Company</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <Grid className="testimonial-card">
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>Helping Others</Typography>
                                        <Typography variant="body2" sx={{ my: 2, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            "I found a lost phone and was able to return it to its owner through Lost & Found Hub. It feels great to help others."
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <img src="images/113_125.svg" alt="Jane Smith" width={48} />
                                            <Box>
                                                <Typography variant="subtitle2">Jane Smith</Typography>
                                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.75)' }}>Software Engineer, YXZ Inc.</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <Grid className="testimonial-card">
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>Get Lost Items Easily</Typography>
                                        <Typography variant="body2" sx={{ my: 2, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            "Lost & Found Hub is a lifesaver! I lost my keys and someone found them and reported it on the website. I got them back in no time."
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <img src="images/113_135.svg" alt="Sarah Johnson" width={48} />
                                            <Box>
                                                <Typography variant="subtitle2">Sarah Johnson</Typography>
                                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.75)' }}>HR Manager, XYZ Corp.</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </motion.div>
                        </Grid>
                    </motion.div>
                </Container>
            </Box>

            {/* FAQ Section */}
            <Box id="faq" sx={{ position: "relative", py: { xs: 4, md: 8 } }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${"images/Background2.webp"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1) scaleY(1)'
                    }}
                />
                <Container maxWidth="lg">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <Typography variant="h4" sx={{ textAlign: 'center' }} fontWeight={700} gutterBottom>
                            Got Questions? We've Got Answers!
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '1.05rem' }}>
                            Everything you need to know about finding lost items and helping others
                        </Typography>
                    </motion.div>
                    <Grid className="faq-grid">
                        <Grid item xs={12} md={7} sx={{ maxWidth: 580 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeInLeft}
                            >
                            <Box>
                                <Accordion defaultExpanded sx={{
                                    my: 2,
                                    marginBottom: 0,
                                    backgroundColor: 'transparent',
                                    border: '1px solid #fff',
                                    boxShadow: 'none',
                                    '&.Mui-expanded': {
                                        border: '1px solid #fff',
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                    },
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        How do I report an item?
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ mt: 1, fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            Super easy! Click 'Report Found Item', upload a photo, add description (color, brand, location found), and submit. You'll get notifications when potential owners reach out. The whole process takes less than 2 minutes!
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{
                                    my: 2,
                                    backgroundColor: 'transparent',
                                    border: '1px solid #fff',
                                    boxShadow: 'none',
                                    '&.Mui-expanded': {
                                        border: '1px solid #fff',
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                    },
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        How can I claim an item?
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Details on how to claim an item will be provided here.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{
                                    my: 2,
                                    backgroundColor: 'transparent',
                                    border: '1px solid #fff',
                                    boxShadow: 'none',
                                    '&.Mui-expanded': {
                                        border: '1px solid #fff',
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                    },
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        What if I can't find my lost item?
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Details on what to do if you can't find your item will be provided here.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{
                                    my: 2,
                                    backgroundColor: 'transparent',
                                    border: '1px solid #fff',
                                    boxShadow: 'none',
                                    '&.Mui-expanded': {
                                        border: '1px solid #fff',
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                    },
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        Is the platform free?
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Information about platform fees will be provided here.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{
                                    my: 2,
                                    backgroundColor: 'transparent',
                                    border: '1px solid #fff',
                                    boxShadow: 'none',
                                    '&.Mui-expanded': {
                                        border: '1px solid #fff',
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                    },
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        How can I contact support?
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Contact information for support will be provided here.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ maxWidth: 540 }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInRight}
                            >
                            <Box sx={{ textAlign: 'center' }}>
                                <img src="images/illustration-person-question.png" alt="Illustration of a person with a question mark" style={{ width: '100%' }} loading="lazy" />
                            </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight={600}>Need More Help?</Typography>
                        <Typography variant="body2" sx={{ mb: 2, fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                            Our friendly support team is here 24/7. Get answers in minutes!
                        </Typography>
                        <Button variant="contained" color="primary" size="large" className="animated-button">Chat With Us</Button>
                    </Box>
                    </motion.div>
                </Container>
            </Box>

            {/* Join Section */}
            <Box id="join" sx={{ py: { xs: 4, md: 8 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={scaleIn}
                            >
                                <Box sx={{ textAlign: 'center' }}>
                                    <img src="images/illustration-treasure-chest.webp" alt="Illustration of a person with a treasure chest" style={{ width: '100%', maxWidth: 300, borderRadius: 8, boxShadow: 2 }} loading="lazy" />
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeInRight}
                            >
                                <Typography variant="h4" fontWeight={700} gutterBottom>
                                    Join 10,000+ Community Members!
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                                    Be part of something special. Whether you're looking for lost items or helping others find theirs, every member makes a difference. Sign up free in 30 seconds!
                                </Typography>
                                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button variant="outlined" color="primary" size="large" className="animated-button">How It Works</Button>
                                    <Button variant="contained" color="secondary" size="large" className="animated-button">Join Free Now</Button>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
};

export default WelcomePageModule;