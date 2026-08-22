import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Before Login Modules
import WelcomePageModule from '../../Modules/BeforeLogin/WelcomePage/WelcomePageModule';
import LoginNeeded from '../../Modules/BeforeLogin/LoginNeeded/LoginNeeded';
import Login from '../../Modules/BeforeLogin/Login/Login';
import Signup from '../../Modules/BeforeLogin/Signup/Signup';
import AboutUs from '../../Modules/BeforeLogin/AboutUs/AboutUs';
import ForgotPassword from '../../Modules/BeforeLogin/ForgotPassword/ForgotPassword';

// SuperAdmin Modules
import AdminDashboard from '../../Modules/AfterLogin/SuperAdmin/AdminDashboard';
import ConversationAnalysis from '../../Modules/AfterLogin/SuperAdmin/ConversationAnalysis';
import ManagePosts from '../../Modules/AfterLogin/SuperAdmin/ManagePosts';

// User Modules
import UserDashboard from '../../Modules/AfterLogin/User/UserDashboard';
import ReportLostItem from '../../Modules/AfterLogin/User/ReportLostItem';
import ReportFoundItem from '../../Modules/AfterLogin/User/ReportFoundItem';
import SearchLostItems from '../../Modules/AfterLogin/User/SearchLostItems';
import SearchFoundItems from '../../Modules/AfterLogin/User/SearchFoundItems';
import Forum from '../../Modules/AfterLogin/User/Forum';
import ContactSupport from '../../Modules/AfterLogin/User/ContactSupport';

import PageTransition from '../PageTransition/PageTransition';
import { useAuth } from '../../context/AuthContext';

// Helper function to wrap components with PageTransition
const withPageTransition = (Component) => (
    <PageTransition>
        <Component />
    </PageTransition>
);

// AfterLogin screens render without the page transition: wrapping them made
// AnimatePresence mode="wait" block on an exit that never resolved, which left the
// URL changing while the previous screen stayed mounted. BeforeLogin keeps it.
const withoutPageTransition = (Component) => <Component />;

// Redirect to /dashboard if already logged in, otherwise render component
const GuestRoute = ({ component: Component }) => {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/dashboard" replace /> : withPageTransition(Component);
};

// Redirect to /login if not authenticated, otherwise render component
const ProtectedRoute = ({ component: Component }) => {
    const { currentUser } = useAuth();
    return currentUser ? withoutPageTransition(Component) : <Navigate to="/login" replace />;
};

// Dynamic Dashboard Route: Renders AdminDashboard for superadmin, UserDashboard for simple users
const DynamicDashboardRoute = () => {
    const { currentUser } = useAuth();
    if (!currentUser) return <Navigate to="/login" replace />;
    const Component = currentUser.role === 'superadmin' ? AdminDashboard : UserDashboard;
    return withoutPageTransition(Component);
};

// Redirect to /login if not authenticated, redirect to /dashboard if not superadmin
const AdminRoute = ({ component: Component }) => {
    const { currentUser } = useAuth();
    if (!currentUser) return <Navigate to="/login" replace />;
    if (currentUser.role !== 'superadmin') return <Navigate to="/dashboard" replace />;
    return withoutPageTransition(Component);
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
                <Route path="/dashboard" element={<DynamicDashboardRoute />} />
                <Route path="/report-lost" element={<ProtectedRoute component={ReportLostItem} />} />
                <Route path="/report-found" element={<ProtectedRoute component={ReportFoundItem} />} />
                <Route path="/search-lost" element={<ProtectedRoute component={SearchLostItems} />} />
                <Route path="/search-found" element={<ProtectedRoute component={SearchFoundItems} />} />
                <Route path="/forum" element={<ProtectedRoute component={Forum} />} />
                <Route path="/contact" element={<ProtectedRoute component={ContactSupport} />} />
                <Route path="/admin/conversation-analysis" element={<AdminRoute component={ConversationAnalysis} />} />
                <Route path="/admin/manage-posts" element={<AdminRoute component={ManagePosts} />} />
                <Route path="/forgot-password" element={withPageTransition(ForgotPassword)} />
                <Route path="/" element={withPageTransition(WelcomePageModule)} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;