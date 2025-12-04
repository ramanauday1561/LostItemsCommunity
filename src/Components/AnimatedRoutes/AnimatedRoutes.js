import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WelcomePageModule from '../../Modules/BeforeLogin/WelcomePage/WelcomePageModule';
import LoginNeeded from '../../Modules/BeforeLogin/LoginNeeded/LoginNeeded';
import Login from '../../Modules/BeforeLogin/Login/Login';
import Signup from '../../Modules/BeforeLogin/Signup/Signup';
import AboutUs from '../../Modules/BeforeLogin/AboutUs/AboutUs';
import PageTransition from '../PageTransition/PageTransition';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/login-needed" element={<PageTransition><LoginNeeded /></PageTransition>} />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
                <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
                <Route path="/" element={<PageTransition><WelcomePageModule /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
