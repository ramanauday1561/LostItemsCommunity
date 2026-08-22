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
    Button,
    Alert,
    Divider,
} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import { textColor, subTextColor, cardBg, cardBorder } from '../../../utils/afterLoginTokens';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
};

const FIELD_SX = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        '& fieldset': { borderColor: '#E6E5E1' },
        '&:hover fieldset': { borderColor: '#0B6BCB' },
        '&.Mui-focused fieldset': { borderColor: '#0B6BCB' },
        '& input': { color: '#16181F', fontSize: '0.95rem' },
        '& textarea': { color: '#16181F', fontSize: '0.95rem' },
    },
    '& .MuiInputLabel-root': { color: '#6B7280' },
    '& .MuiSvgIcon-root': { color: '#6B7280' },
};

function ContactSupport() {
    const { currentUser } = useAuth();
    const [submitted, setSubmitted] = React.useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: currentUser?.displayName || '',
            email: currentUser?.email || '',
        },
    });

    const onSubmit = () => {
        setSubmitted(true);
        reset({ name: currentUser?.displayName || '', email: currentUser?.email || '' });
    };

    return (
        <AfterLoginLayout pageTitle="Contact Support">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 0, sm: 2 } }}>
                <Grid container spacing={4}>
                    
                    {/* Contact Form */}
                    <Grid size={{ xs: 12, lg: 7 }}>
                        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '28px' }}>
                                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }}>
                                            <SupportAgentIcon sx={{ fontSize: 32 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" fontWeight={800} sx={{ color: textColor }}>
                                                Contact Support Team
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: subTextColor }}>
                                                Need help with a lost item claim, account inquiry, or feature feedback? Send us a ticket.
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {submitted && (
                                        <Alert severity="success" sx={{ my: 3, borderRadius: '16px', fontWeight: 600, bgcolor: 'rgba(21, 127, 61, 0.15)', color: textColor, border: '1px solid rgba(21, 127, 61, 0.3)' }} onClose={() => setSubmitted(false)}>
                                            Support ticket submitted successfully! A support agent will respond within 24 hours.
                                        </Alert>
                                    )}

                                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                        <Grid container spacing={2.5}>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label="Your Name *"
                                                    fullWidth
                                                    {...register('name', { required: 'Name is required' })}
                                                    error={!!errors.name}
                                                    helperText={errors.name?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label="Your Email *"
                                                    type="email"
                                                    fullWidth
                                                    {...register('email', { required: 'Email is required' })}
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={12}>
                                                <TextField
                                                    label="Subject *"
                                                    placeholder="e.g. Inquiry regarding claim #LOST-1042, Account settings"
                                                    fullWidth
                                                    {...register('subject', { required: 'Subject is required' })}
                                                    error={!!errors.subject}
                                                    helperText={errors.subject?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={12}>
                                                <TextField
                                                    label="Message Details *"
                                                    placeholder="Explain your inquiry in detail..."
                                                    fullWidth
                                                    multiline
                                                    rows={5}
                                                    {...register('message', { required: 'Message is required' })}
                                                    error={!!errors.message}
                                                    helperText={errors.message?.message}
                                                    sx={FIELD_SX}
                                                />
                                            </Grid>

                                            <Grid size={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    sx={{
                                                        fontWeight: 800,
                                                        borderRadius: '16px',
                                                        px: 4,
                                                        py: 1.5,
                                                        background: '#0B6BCB',
                                                        color: '#FFFFFF',
                                                        textTransform: 'none',
                                                        fontSize: '1rem',
                                                    }}
                                                >
                                                    Submit Support Ticket
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    {/* Support Info Sidebar */}
                    <Grid size={{ xs: 12, lg: 5 }}>
                        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card elevation={0} sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '28px' }}>
                                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                    <Typography variant="h6" fontWeight={800} sx={{ color: textColor, mb: 1 }}>
                                        Direct Contact Details
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: subTextColor, mb: 3 }}>
                                        Our support desk is available 24/7 for emergency lost item claims.
                                    </Typography>

                                    <Divider sx={{ mb: 3, borderColor: cardBorder }} />

                                    <Box sx={{ spaceY: 3 }}>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Box sx={{ p: 1.5, borderRadius: '14px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }}>
                                                <EmailIcon />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: subTextColor }}>Email Support</Typography>
                                                <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>support@trustfound.com</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2.5 }}>
                                            <Box sx={{ p: 1.5, borderRadius: '14px', bgcolor: 'rgba(21, 127, 61, 0.15)', color: '#157F3D' }}>
                                                <PhoneIcon />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: subTextColor }}>Hotline (Toll Free)</Typography>
                                                <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>+1 (800) 555-FIND</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2.5 }}>
                                            <Box sx={{ p: 1.5, borderRadius: '14px', bgcolor: 'rgba(11, 107, 203, 0.15)', color: '#0B6BCB' }}>
                                                <LocationOnIcon />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: subTextColor }}>Headquarters</Typography>
                                                <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>TrustFound HQ, 5th Ave, NY 10001</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                </Grid>
            </Container>
        </AfterLoginLayout>
    );
}

export default ContactSupport;
