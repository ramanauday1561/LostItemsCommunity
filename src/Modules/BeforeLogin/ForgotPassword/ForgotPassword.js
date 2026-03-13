import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './ForgotPassword.css';

function ForgotPassword() {
    const [successMsg, setSuccessMsg] = React.useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = () => {
        setSuccessMsg("If an account with that email exists, you'll receive a password reset link shortly.");
        reset();
    };

    return (
        <Box className="forgot-password-root">
            <Container maxWidth="sm">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="forgot-password-card" elevation={4}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                <LockResetIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                                <Typography variant="h5" className="forgot-password-title">Forgot Password</Typography>
                                <Typography variant="body2" className="forgot-password-subtitle" align="center">
                                    Enter your email address and we'll send you a link to reset your password.
                                </Typography>
                            </Box>

                            {successMsg && (
                                <Alert severity="success" sx={{ mb: 3 }}>
                                    {successMsg}
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    sx={{ mb: 3 }}
                                    {...register('email', { required: 'Email is required' })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    sx={{ fontWeight: 600, mb: 2 }}
                                >
                                    Send Reset Link
                                </Button>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Remember your password?{' '}
                                        <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                                            Back to Login
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
}

export default ForgotPassword;
