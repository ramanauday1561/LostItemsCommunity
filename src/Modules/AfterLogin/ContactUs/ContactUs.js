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
    Alert,
    Divider,
} from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import './ContactUs.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
};

const SUBJECTS = ['General Inquiry', 'Report Issue', 'Feature Request', 'Account Help', 'Other'];

const FIELD_SX = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'rgba(0,0,0,0.23)' },
        '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.87)' },
        '& input': { color: '#1a1a2e' },
        '& textarea': { color: '#1a1a2e' },
    },
    '& .MuiInputLabel-root': { color: '#555555' },
    '& .MuiSelect-select': { color: '#1a1a2e' },
    '& .MuiSvgIcon-root': { color: '#555555' },
};

function ContactUs() {
    const { currentUser } = useAuth();
    const [successMsg, setSuccessMsg] = React.useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: currentUser?.displayName || '',
        },
    });

    const onSubmit = () => {
        setSuccessMsg('Thank you for reaching out! Our support team will get back to you within 24 hours.');
        reset({ name: currentUser?.displayName || '' });
    };

    return (
        <Box className="contact-root">
            <Box className="contact-hero">
                <Container maxWidth="lg">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ContactMailIcon sx={{ fontSize: 40, color: '#607d8b' }} />
                            <Box>
                                <Typography variant="h4" className="contact-hero-title">Contact Us</Typography>
                                <Typography variant="body1" className="contact-hero-subtitle">
                                    Have a question or feedback? We would love to hear from you.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card className="contact-form-card" elevation={3}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h6" className="contact-section-title">Send Us a Message</Typography>
                                    {successMsg && (
                                        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMsg('')}>
                                            {successMsg}
                                        </Alert>
                                    )}
                                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                        <Grid container spacing={3}>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label="Your Name"
                                                    fullWidth
                                                    {...register('name', { required: 'Name is required' })}
                                                    error={!!errors.name}
                                                    helperText={errors.name?.message}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label="Email Address"
                                                    type="email"
                                                    fullWidth
                                                    {...register('email', { required: 'Email is required' })}
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
                                                />
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField
                                                    select
                                                    label="Subject"
                                                    fullWidth
                                                    defaultValue=""
                                                    {...register('subject', { required: 'Subject is required' })}
                                                    error={!!errors.subject}
                                                    helperText={errors.subject?.message}
                                                >
                                                    {SUBJECTS.map((s) => (
                                                        <MenuItem key={s} value={s}>{s}</MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField
                                                    label="Message"
                                                    fullWidth
                                                    multiline
                                                    rows={5}
                                                    {...register('message', { required: 'Message is required' })}
                                                    error={!!errors.message}
                                                    helperText={errors.message?.message}
                                                />
                                            </Grid>
                                            <Grid size={12}>
                                                <Button type="submit" variant="contained" size="large" sx={{ fontWeight: 600, bgcolor: '#607d8b', '&:hover': { bgcolor: '#546e7a' } }}>
                                                    Send Message
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card className="contact-sidebar-card" elevation={3}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h6" className="contact-section-title">Get in Touch</Typography>
                                    <Divider sx={{ mb: 3 }} />
                                    <Box className="contact-info-item">
                                        <EmailIcon sx={{ color: '#607d8b', mt: 0.3 }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>Email</Typography>
                                            <Typography variant="body2" color="text.secondary">support@lostitemscommunity.com</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="contact-info-item">
                                        <PhoneIcon sx={{ color: '#607d8b', mt: 0.3 }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>Phone</Typography>
                                            <Typography variant="body2" color="text.secondary">+1-800-LOST-HUB</Typography>
                                        </Box>
                                    </Box>
                                    <Box className="contact-info-item">
                                        <AccessTimeIcon sx={{ color: '#607d8b', mt: 0.3 }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>Business Hours</Typography>
                                            <Typography variant="body2" color="text.secondary">Mon–Fri, 9am – 6pm EST</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ContactUs;
