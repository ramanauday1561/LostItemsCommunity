import {
    Container,
    Grid,
    Box,
    Button,
    TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

import "./Signup.css";

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

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle signup logic here
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
                                    src="images/LoginSignup.png"
                                    alt="Illustration of Login and Signup"
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
                                    <div className='WelcomeBack'>Join 10,000+ Members!</div>
                                    <div className='WelcomeBackInfo'>Sign up free - no credit card needed. Takes only 30 seconds!</div>
                                </motion.div>
                                <motion.div 
                                    className='LoginSingupContent'
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div variants={fadeInUp}>
                                        <TextField
                                            label="Username"
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Choose a unique username"
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
                                            label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="your.email@example.com"
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
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <TextField
                                            label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Create a strong password"
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
                                        <Button type="submit" variant="contained" color="primary" fullWidth className="animated-button">
                                            Create Free Account
                                        </Button>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <div className='OrSignIn'>
                                            Or join instantly with
                                        </div>
                                        <div className='Icons'>
                                            <GoogleIcon className="social-icon" />
                                            <FacebookIcon className="social-icon" />
                                            <TwitterIcon className="social-icon" />
                                        </div>
                                    </motion.div>
                                    <motion.div variants={fadeInUp}>
                                        <div className='SignupLink'>
                                            Already a member? <Link to="/login">Sign in here</Link>
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

export default Signup;