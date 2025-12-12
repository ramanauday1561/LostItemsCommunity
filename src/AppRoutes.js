import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Eager load the home page for better FCP
import WelcomePageModule from './Modules/BeforeLogin/WelcomePage/WelcomePageModule';

// Lazy load other routes to reduce initial bundle size
const LoginNeeded = lazy(() => import('./Modules/BeforeLogin/LoginNeeded/LoginNeeded'));
const Login = lazy(() => import('./Modules/BeforeLogin/Login/Login'));
const Signup = lazy(() => import('./Modules/BeforeLogin/Signup/Signup'));
const AboutUs = lazy(() => import('./Modules/BeforeLogin/AboutUs/AboutUs'));

// Loading fallback component
const LoadingFallback = () => (
    <Box 
        sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
        }}
    >
        <CircularProgress />
    </Box>
);

const AppRoutes = () => (
    <Suspense fallback={<LoadingFallback />}>
        <Routes>
            <Route path="/login-needed" element={<LoginNeeded />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/" element={<WelcomePageModule />} />
        </Routes>
    </Suspense>
);

export default AppRoutes;