import {
    Container,
    Grid,
    Box,
    Typography,
    Button,
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

import "./Login.css";

// Animation variants
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

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle login logic here
        console.log(data);
        // Example: navigate('/dashboard');
    };

    return (
        <Box className="LoginSignupMainContainer" sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: `calc(100vh - 100px)`,
                    backgroundImage: `url(${"images/Background2.webp"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.82,
                    zIndex: 0,
                    transform: 'scaleX(-1)'
                }}
            />
            <Container maxWidth="lg" sx={{ 
                position: 'relative', 
                zIndex: 1, 
                height: `calc(100vh - 100px)`, 
                paddingTop: '20px', 
                paddingBottom: '20px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'scroll' }}>
                <Grid container spacing={4} alignItems="center" justifyContent="space-evenly">
                    <Grid item xs={12} md={6} sx={{ maxWidth: 500 }}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInLeft}
                        >
                            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                <Box
                                    component="img"
                                    src="images/LoginSignup.webp"
                                    alt="Illustration of Login and Signup"
                                    loading="lazy"
                                    sx={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        width: { xs: '80%', md: '100%' },
                                    }}
                                />
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ maxWidth: 400, boxSizing: 'content-box' }} className="LoginSignupContainer">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInRight}
                        >
                            <form onSubmit={handleSubmit(onSubmit)} className='LoginSignupForm'>
                                <motion.div variants={fadeInUp}>
                                    <div className='WelcomeBack'>Welcome Back!</div>
                                    <div className='WelcomeBackInfo'>Great to see you again! Let's find what you're looking for.</div>
                                </motion.div>
                                <motion.div 
                                    className='LoginSingupContent'
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div variants={fadeInUp}>
                                        <TextField
                                            label="Username / Email"
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Your username or email"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "#fff",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#fff",
                                            },
                                            "& input": {
                                                color: "#fff",
                                            },
                                            "& input::placeholder": {
                                                color: "#fff",
                                                opacity: 1,
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#fff"
                                        },
                                        "& label.Mui-focused": {
                                            color: "#38DFFF",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#38DFFF",
                                        },
                                    }}
                                            {...register("username", { required: "Username is required" })}
                                            error={!!errors.username}
                                            helperText={errors.username?.message}
                                        />
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <TextField
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Your secure password"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "#fff",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#fff",
                                            },
                                            "& input": {
                                                color: "#fff",
                                            },
                                            "& input::placeholder": {
                                                color: "#fff",
                                                opacity: 1,
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#fff"
                                        },
                                        "& label.Mui-focused": {
                                            color: "#38DFFF",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#38DFFF",
                                        },
                                    }}
                                            {...register("password", { required: "Password is required" })}
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                        />
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <Box className="RememberPassword" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...register("rememberPassword")}
                                                sx={{
                                                    color: "#fff",
                                                    '&.Mui-checked': {
                                                        color: "#38DFFF",
                                                    },
                                                }}
                                            />
                                        }
                                        label={<Typography sx={{ color: "#fff", fontSize: 14 }}>Remember Password</Typography>}
                                    />
                                    <Button
                                        variant="text"
                                        sx={{ color: "#38DFFF", paddingRight: 0, textTransform: 'none', fontWeight: 500, fontSize: 14 }}
                                        onClick={() => navigate('/forgot-password')}
                                    >
                                        Forgot Password?
                                    </Button>
                                </Box>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <Button type="submit" variant="contained" color="primary" fullWidth className="animated-button">
                                            Sign In & Continue
                                        </Button>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <div className='OrSignIn'>
                                            Or continue with
                                        </div>
                                        <div className='Icons'>
                                            <GoogleIcon className="social-icon" />
                                            <FacebookIcon className="social-icon" />
                                            <TwitterIcon className="social-icon" />
                                        </div>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <div className='SignupLink'>
                                            New here? <Link to="/signup">Join free in 30 seconds!</Link>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </form>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Login;