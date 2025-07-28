import {
    Container,
    Grid,
    Box,
    Button,
    TextField
} from '@mui/material';
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

import "./Signup.css";

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
                    backgroundImage: `url(${"images/Background2.png"})`,
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
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ maxWidth: 400, boxSizing: 'content-box' }} className="LoginSignupContainer">
                        <form onSubmit={handleSubmit(onSubmit)} className='LoginSignupForm'>
                            <div className='WelcomeBack'>Join our Community</div>
                            <div className='WelcomeBackInfo'>Please enter your details to register</div>
                            <div className='LoginSingupContent'>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter your username"
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
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter your email"
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
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter your password"
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
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Sign Up
                                </Button>
                                <div className='OrSignIn'>
                                    Or sign up with
                                </div>
                                <div className='Icons'>
                                    <GoogleIcon />
                                    <FacebookIcon />
                                    <TwitterIcon />
                                </div>
                                <div className='SignupLink'>
                                    Already have an account? <Link to="/login">Sign in now</Link>
                                </div>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Signup;