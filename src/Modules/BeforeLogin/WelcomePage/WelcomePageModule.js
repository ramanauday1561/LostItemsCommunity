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

import "./WelcomePageModule.css";

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
                        backgroundImage: `url(${"images/Background2.png"})`,
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
                            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                                <Box component="span" sx={{ color: 'secondary.main' }}>REUNITING</Box> lost items with their rightful owners through <Box component="span" sx={{ color: 'primary.main' }}>COMMUNITY</Box>
                            </Typography>
                            <Typography variant="body1">
                                At Lost Items Community, we believe in the power of community to help find lost items. Our platform serves as a central hub where individuals can report found items and search for their lost belongings. Join our community today and let us help you reunite with what's rightfully yours.
                            </Typography>
                            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                <Button variant="outlined" color="primary" size="large">Learn More</Button>
                                <Button onClick={() => navigate('/signup')} variant="contained" color="secondary" size="large">Signup</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 600 }}>
                            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                <Box
                                    component="img"
                                    src="images/HomePage1.png"
                                    alt="Illustration of a person returning a lost item"
                                    sx={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        width: { xs: '80%', md: '100%' },
                                    }}
                                />
                            </Box>
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
                        backgroundImage: `url(${"images/Background2.png"})`,
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
                            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                <Box
                                    component="img"
                                    src="images/71d8ed785a20e6d15dc5ead4609dc4a4b04b7931.png"
                                    alt="Illustration of a boy returning a lost dog"
                                    sx={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        width: { xs: '80%', md: '100%' },
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 490 }}>
                            <Typography variant="h4" gutterBottom fontWeight={700}>
                                Reuniting Lost Items with Their Rightful Owners
                            </Typography>
                            <Typography variant="body1">
                                Lost & Found Hub is a community-driven platform that helps individuals report found items and search for their lost belongings. Our mission is to reunite lost items with their rightful owners, whether it's a misplaced purse, valuable ornaments, important cards, or even lost money.
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <img src="images/78_177.svg" alt="icon" width={24} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography>Report Found Items</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <img src="images/79_184.svg" alt="icon" width={24} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography>Search for Lost Belongings</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <img src="images/79_189.svg" alt="icon" width={24} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography>Community-Driven Platform for Lost & Found</Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>
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
                        backgroundImage: `url(${"images/Background2.png"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1)'
                    }}
                />
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
                        Find Lost Items and Reunite with Owners
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ maxWidth: 766, margin: '0 auto' }}>
                        Lost & Found Hub is a community-driven platform that allows individuals to report found items and search for lost belongings. Join our community today and help reunite lost items with their rightful owners.
                    </Typography>
                    <Grid container className="features-grid">
                        <Grid item xs={12} md={4} className="feature-card">
                            <Box sx={{ textAlign: 'center' }}>
                                <img src="images/2e9da34020719e37d854223f5b8c63f060ef3c88.png" alt="Report Found Items" width={260} />
                                <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>Report Found Items</Typography>
                                <Typography variant="body2">
                                    Easily report any items you have found and help others find what they have lost.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} className="feature-card">
                            <Box sx={{ textAlign: 'center' }}>
                                <img src="images/cd3ca9158b66e28c73ae53c1102a67c3871692e0.png" alt="Search for Lost Belongings" width={260} />
                                <Typography y variant="h6" fontWeight={600} sx={{ mt: 2 }}>Search for Lost Belongings</Typography>
                                <Typography variant="body2">
                                    Effortlessly search through our database to find your lost belongings.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} className="feature-card">
                            <Box sx={{ textAlign: 'center' }}>
                                <img src="images/db0ba1f9b753e126c63e560afe0fd8b41a7d1e64.png" alt="Success Stories" width={260} />
                                <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>Success Stories</Typography>
                                <Typography variant="body2">
                                    Read heartwarming stories of lost items being reunited with their owners.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
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
                        backgroundImage: `url(${"images/Background2.png"})`,
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
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Benefits
                            </Typography>
                            <Typography variant="body1">
                                Find lost items or report found items to help reunite them with their owners. Our community-driven platform makes it easy to connect with others and recover lost belongings.
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <img src="images/100_306.svg" alt="icon" width={24} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography>Reunite lost items with their rightful owners.</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <img src="images/100_311.svg" alt="icon" width={24} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography>Connect with others to recover lost belongings.</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <img src="images/100_316.svg" alt="icon" width={24} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography>Report found items to help reunite them.</Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 600 }}>
                            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                <img src="images/00afe7198ad400fc004539788c093d5c2fff6fbd.png" alt="Illustration of people exchanging a lost item" style={{ width: '100%', maxWidth: 520 }} />
                            </Box>
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
                        backgroundImage: `url(${"images/Background2.png"})`,
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
                            <Box sx={{ textAlign: 'center' }}>
                                <img src="images/4ee6753f9498560e0bf9b5f1f505917aa8d41726.png" alt="Illustration of a person finding lost items" style={{ width: '100%', maxWidth: 420 }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ maxWidth: 680 }}>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Find Lost Items and Reunite with Owners
                            </Typography>
                            <Typography variant="body1">
                                Lost & Found Hub is a community-driven platform that allows individuals to report found items and search for lost belongings. Join our community today and help reunite lost items with their rightful owners.
                            </Typography>
                            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                <Button variant="contained" color="primary" size="large">Report</Button>
                                <Button variant="outlined" color="secondary" size="large">Search</Button>
                            </Box>
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
                        backgroundImage: `url(${"images/Background2.png"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1) scaleY(-1)',
                    }}
                />
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
                        Customer Testimonials
                    </Typography>
                    <Typography variant="body1" align="center">
                        Read what our customers have to say
                    </Typography>
                    <Grid className="testimonials-grid">
                        <Grid className="testimonial-card">
                            <Box>
                                <Typography variant="h6" fontWeight={600}>Best Website for Lost Items</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                                    "I lost my wallet and thanks to Lost & Found Hub, I was able to recover it within a day. Amazing Service by the website!"
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <img src="images/113_115.svg" alt="John Doe" width={48} />
                                    <Box>
                                        <Typography variant="subtitle2">John Doe</Typography>
                                        <Typography variant="caption" color="text.secondary">Marketing Manager, ABC Company</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid className="testimonial-card">
                            <Box>
                                <Typography variant="h6" fontWeight={600}>Helping Others</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                                    "I found a lost phone and was able to return it to its owner through Lost & Found Hub. It feels great to help others."
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <img src="images/113_125.svg" alt="Jane Smith" width={48} />
                                    <Box>
                                        <Typography variant="subtitle2">Jane Smith</Typography>
                                        <Typography variant="caption" color="text.secondary">Software Engineer, YXZ Inc.</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid className="testimonial-card">
                            <Box>
                                <Typography variant="h6" fontWeight={600}>Get Lost Items Easily</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                                    "Lost & Found Hub is a lifesaver! I lost my keys and someone found them and reported it on the website. I got them back in no time."
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <img src="images/113_135.svg" alt="Sarah Johnson" width={48} />
                                    <Box>
                                        <Typography variant="subtitle2">Sarah Johnson</Typography>
                                        <Typography variant="caption" color="text.secondary">HR Manager, XYZ Corp.</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
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
                        backgroundImage: `url(${"images/Background2.png"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.82,
                        zIndex: 0,
                        transform: 'scaleX(-1) scaleY(1)'
                    }}
                />
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ textAlign: 'center' }} fontWeight={700} gutterBottom>
                        FAQs
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                        Find answers to common questions about reporting or claiming lost items on our platform.
                    </Typography>
                    <Grid className="faq-grid">
                        <Grid item xs={12} md={7} sx={{ maxWidth: 580 }}>
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
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            To report a lost item, simply go to our website and click on the 'Report Lost Item' button. Fill out the required information and submit the form. Our team will review your report and notify you if your item is found.
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
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ maxWidth: 540 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <img src="images/8b01246adfacaaf379d8038f11053fae146f7897.png" alt="Illustration of a person with a question mark" style={{ width: '100%' }} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight={600}>Still have Questions?</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Feel free to reach out to us for any queries
                        </Typography>
                        <Button variant="contained" color="primary" size="large">Contact Us</Button>
                    </Box>
                </Container>
            </Box>

            {/* Join Section */}
            <Box id="join" sx={{ py: { xs: 4, md: 8 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <img src="images/edb7e7f36d695a3f4edc239b979754ce6a196111.png" alt="Illustration of a person with a treasure chest" style={{ width: '100%', maxWidth: 300, borderRadius: 8, boxShadow: 2 }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Join our community today!
                            </Typography>
                            <Typography variant="body1">
                                Discover lost treasures and help reunite them with their owners
                            </Typography>
                            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                <Button variant="outlined" color="primary" size="large">Learn More</Button>
                                <Button variant="contained" color="secondary" size="large">Signup</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
};

export default WelcomePageModule;