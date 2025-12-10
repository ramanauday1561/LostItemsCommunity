import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WelcomePageModule from '../../Modules/BeforeLogin/WelcomePage/WelcomePageModule';
import LoginNeeded from '../../Modules/BeforeLogin/LoginNeeded/LoginNeeded';
import Login from '../../Modules/BeforeLogin/Login/Login';
import Signup from '../../Modules/BeforeLogin/Signup/Signup';
import AboutUs from '../../Modules/BeforeLogin/AboutUs/AboutUs';
import PageTransition from '../PageTransition/PageTransition';

// Helper function to wrap components with PageTransition
const withPageTransition = (Component) => (
    <PageTransition>
        <Component />
    </PageTransition>
);

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/login-needed" element={withPageTransition(LoginNeeded)} />
                <Route path="/login" element={withPageTransition(Login)} />
                <Route path="/signup" element={withPageTransition(Signup)} />
                <Route path="/about-us" element={withPageTransition(AboutUs)} />
                <Route path="/" element={withPageTransition(WelcomePageModule)} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;