import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WelcomePageModule from '../../Modules/BeforeLogin/WelcomePage/WelcomePageModule';
import LoginNeeded from '../../Modules/BeforeLogin/LoginNeeded/LoginNeeded';
import Login from '../../Modules/BeforeLogin/Login/Login';
import Signup from '../../Modules/BeforeLogin/Signup/Signup';
import AboutUs from '../../Modules/BeforeLogin/AboutUs/AboutUs';
import Dashboard from '../../Modules/AfterLogin/Dashboard/Dashboard';
import ReportLostItem from '../../Modules/AfterLogin/ReportLostItem/ReportLostItem';
import ReportFoundItem from '../../Modules/AfterLogin/ReportFoundItem/ReportFoundItem';
import SearchLostItems from '../../Modules/AfterLogin/SearchLostItems/SearchLostItems';
import SearchFoundItems from '../../Modules/AfterLogin/SearchFoundItems/SearchFoundItems';
import PageTransition from '../PageTransition/PageTransition';
import { useAuth } from '../../context/AuthContext';

// Helper function to wrap components with PageTransition
const withPageTransition = (Component) => (
    <PageTransition>
        <Component />
    </PageTransition>
);

// Redirect to /dashboard if already logged in, otherwise render component
const GuestRoute = ({ component: Component }) => {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/dashboard" replace /> : withPageTransition(Component);
};

// Redirect to /login if not authenticated, otherwise render component
const ProtectedRoute = ({ component: Component }) => {
    const { currentUser } = useAuth();
    return currentUser ? withPageTransition(Component) : <Navigate to="/login" replace />;
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/login-needed" element={withPageTransition(LoginNeeded)} />
                <Route path="/login" element={<GuestRoute component={Login} />} />
                <Route path="/signup" element={withPageTransition(Signup)} />
                <Route path="/about-us" element={withPageTransition(AboutUs)} />
                <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/report-lost-item" element={<ProtectedRoute component={ReportLostItem} />} />
                <Route path="/report-found-item" element={<ProtectedRoute component={ReportFoundItem} />} />
                <Route path="/search-lost-items" element={<ProtectedRoute component={SearchLostItems} />} />
                <Route path="/search-found-items" element={<ProtectedRoute component={SearchFoundItems} />} />
                <Route path="/" element={withPageTransition(WelcomePageModule)} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;