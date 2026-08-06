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
    Alert,
    Divider,
    Chip,
    InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import './ContactUs.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
    }),
};

const TOPIC_PRESETS = [
    { label: 'General Inquiry', value: 'General Inquiry' },
    { label: 'Report Issue', value: 'Report Issue' },
    { label: 'Found Item Claim', value: 'Found Item Claim' },
    { label: 'Account Help', value: 'Account Help' },
    { label: 'Feature Request', value: 'Feature Request' },
];

function ContactUs() {
    const { currentUser } = useAuth();
    const [successMsg, setSuccessMsg] = React.useState('');
    const [selectedTopic, setSelectedTopic] = React.useState('General Inquiry');
    const [copied, setCopied] = React.useState(false);

    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: currentUser?.displayName || '',
            email: currentUser?.email || '',
            subject: 'General Inquiry',
        },
    });

    const textColor = '#1A1D1F';
    const subTextColor = '#6F767E';
    const cardBg = '#ffffff';
    const cardBorder = 'rgba(0, 0, 0, 0.08)';

    const handleTopicClick = (topicVal) => {
        setSelectedTopic(topicVal);
        setValue('subject', topicVal);
    };

    const onSubmit = (data) => {
        setSuccessMsg(`Thank you, ${data.name}! Your support message regarding "${data.subject}" has been submitted. Our team will get back to you within 24 hours.`);
        reset({ name: currentUser?.displayName || '', email: currentUser?.email || '', subject: 'General Inquiry' });
        setSelectedTopic('General Inquiry');
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('support@trustfound.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            backgroundColor: '#F4F5F6',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: '#1976d2' },
            '&.Mui-focused fieldset': { borderColor: '#1976d2', borderWidth: 2 },
            '& input': { color: textColor, fontSize: '0.95rem', fontWeight: 500 },
            '& textarea': { color: textColor, fontSize: '0.95rem', fontWeight: 500 },
            '& .MuiSelect-select': { color: textColor, fontSize: '0.95rem', fontWeight: 600 },
        },
        '& .MuiInputLabel-root': { color: subTextColor, fontWeight: 500 },
        '& .MuiSvgIcon-root': { color: subTextColor },
    };

    return (
        <AfterLoginLayout pageTitle="Contact Support">
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                <Grid container spacing={4}>
                    
                    {/* Send Us a Support Message Form */}
                    <Grid item xs={12} lg={8}>
                        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card
                                elevation={0}
                                sx={{
                                    backgroundColor: cardBg,
                                    border: `1px solid ${cardBorder}`,
                                    borderRadius: '28px',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Accent Gradient Line */}
                                <Box sx={{ height: 6, background: 'linear-gradient(90deg, #1976d2 0%, #9c27b0 50%, #ff9800 100%)' }} />

                                <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: 'rgba(25, 118, 210, 0.1)', color: '#1976d2' }}>
                                            <SupportAgentIcon sx={{ fontSize: 32 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" fontWeight={800} sx={{ color: textColor, letterSpacing: '-0.02em' }}>
                                                Send Us a Support Message
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 500 }}>
                                                Have a question, feedback, or need assistance? Fill out the ticket form below.
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Topic Quick Preset Chips */}
                                    <Box sx={{ mt: 3, mb: 3 }}>
                                        <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, mb: 1, display: 'block' }}>
                                            Select Topic Preset
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {TOPIC_PRESETS.map((t) => (
                                                <Chip
                                                    key={t.value}
                                                    label={t.label}
                                                    onClick={() => handleTopicClick(t.value)}
                                                    color={selectedTopic === t.value ? 'primary' : 'default'}
                                                    variant={selectedTopic === t.value ? 'filled' : 'outlined'}
                                                    sx={{
                                                        borderRadius: '12px',
                                                        fontWeight: selectedTopic === t.value ? 700 : 500,
                                                        py: 1.8,
                                                        px: 0.5,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    {successMsg && (
                                        <Alert
                                            severity="success"
                                            icon={<CheckCircleIcon fontSize="inherit" />}
                                            sx={{ mb: 3, borderRadius: '16px', fontWeight: 600, border: '1px solid rgba(76, 175, 80, 0.3)' }}
                                            onClose={() => setSuccessMsg('')}
                                        >
                                            {successMsg}
                                        </Alert>
                                    )}

                                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Your Full Name *"
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PersonIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    {...register('name', { required: 'Full name is required' })}
                                                    error={!!errors.name}
                                                    helperText={errors.name?.message}
                                                    sx={inputStyle}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Email Address *"
                                                    type="email"
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AlternateEmailIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    {...register('email', { required: 'Email address is required' })}
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
                                                    sx={inputStyle}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    select
                                                    label="Subject Category *"
                                                    fullWidth
                                                    value={selectedTopic}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <HelpOutlineIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    {...register('subject', { required: 'Subject is required' })}
                                                    onChange={(e) => handleTopicClick(e.target.value)}
                                                    error={!!errors.subject}
                                                    helperText={errors.subject?.message}
                                                    sx={inputStyle}
                                                >
                                                    {TOPIC_PRESETS.map((t) => (
                                                        <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Message Details *"
                                                    fullWidth
                                                    multiline
                                                    rows={5}
                                                    placeholder="Please provide details about your issue, item inquiry, or suggestion..."
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                                                <ChatBubbleOutlineIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    {...register('message', { required: 'Message content is required' })}
                                                    error={!!errors.message}
                                                    helperText={errors.message?.message}
                                                    sx={inputStyle}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    disabled={isSubmitting}
                                                    startIcon={<SendIcon />}
                                                    sx={{
                                                        fontWeight: 700,
                                                        borderRadius: '16px',
                                                        px: 5,
                                                        py: 1.6,
                                                        bgcolor: '#1976d2',
                                                        textTransform: 'none',
                                                        fontSize: '1rem',
                                                        boxShadow: '0 4px 14px rgba(25, 118, 210, 0.35)',
                                                        '&:hover': {
                                                            bgcolor: '#1565c0',
                                                            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.45)',
                                                        },
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

                    {/* Right-Side Contact Channels Sidebar */}
                    <Grid item xs={12} lg={4}>
                        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
                            <Card sx={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '28px' }} elevation={0}>
                                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6" fontWeight={800} sx={{ color: textColor }}>
                                            Direct Contact
                                        </Typography>
                                        <Chip
                                            label="🟢 Desk Online"
                                            size="small"
                                            sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 700, borderRadius: '8px' }}
                                        />
                                    </Box>

                                    <Typography variant="body2" sx={{ color: subTextColor, mb: 3 }}>
                                        Reach out directly via our verified email or phone channels.
                                    </Typography>

                                    <Divider sx={{ mb: 3, borderColor: cardBorder }} />

                                    {/* Email Contact Box */}
                                    <Box sx={{ p: 2.5, borderRadius: '20px', bgcolor: '#F4F5F6', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                            <Box sx={{ p: 1.2, borderRadius: '12px', bgcolor: '#e3f2fd', color: '#1976d2' }}>
                                                <EmailIcon fontSize="small" />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 600 }}>Email Address</Typography>
                                                <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>support@trustfound.com</Typography>
                                            </Box>
                                        </Box>
                                        <Button size="small" onClick={handleCopyEmail} sx={{ minWidth: 36, p: 1, borderRadius: '10px' }}>
                                            {copied ? <CheckCircleIcon color="success" fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                                        </Button>
                                    </Box>

                                    {/* Phone Contact Box */}
                                    <Box sx={{ p: 2.5, borderRadius: '20px', bgcolor: '#F4F5F6', mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ p: 1.2, borderRadius: '12px', bgcolor: '#f3e5f5', color: '#9c27b0' }}>
                                            <PhoneIcon fontSize="small" />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 600 }}>24/7 Recovery Hotline</Typography>
                                            <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>+1-800-TRUST-HUB</Typography>
                                        </Box>
                                    </Box>

                                    {/* Hours Box */}
                                    <Box sx={{ p: 2.5, borderRadius: '20px', bgcolor: '#F4F5F6', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ p: 1.2, borderRadius: '12px', bgcolor: '#fff3e0', color: '#ff9800' }}>
                                            <AccessTimeIcon fontSize="small" />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: subTextColor, fontWeight: 600 }}>Operating Hours</Typography>
                                            <Typography variant="body2" fontWeight={700} sx={{ color: textColor }}>Monday – Friday, 9am – 6pm EST</Typography>
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

export default ContactUs;
