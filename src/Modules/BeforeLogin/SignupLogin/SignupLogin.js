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
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

import "./SignupLogin.css";

function SignupLogin() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle login logic here
        console.log(data);
        // Example: navigate('/dashboard');
    };

    return (
        <Box className="LoginSignup" sx={{ position: 'relative', py: { xs: 4, md: 8 }, overflow: 'hidden' }}>
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
                            <div className='WelcomeBack'>Welcome Back</div>
                            <div className='WelcomeBackInfo'>Please enter your details</div>
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
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Sign In
                                </Button>
                                <div className='OrSignIn'>
                                    Or sign in with
                                </div>
                                <div className='Icons'>
                                    <GoogleIcon />
                                    <FacebookIcon />
                                    <TwitterIcon />
                                </div>
                                <div className='SignupLink'>
                                    Don't have an account? <Link to="/signup">Sign up now</Link>
                                </div>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default SignupLogin;