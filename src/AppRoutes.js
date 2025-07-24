import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePageModule from './Modules/BeforeLogin/WelcomePage/WelcomePageModule';
import SignupLogin from './Modules/BeforeLogin/SignupLogin/SignupLogin';
import LoginNeeded from './Modules/BeforeLogin/LoginNeeded/LoginNeeded';
import Login from './Modules/BeforeLogin/Login/Login';

const AppRoutes = () => (
    <Routes>
        <Route path="/login-needed" element={<LoginNeeded />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupLogin />} />
        <Route path="/" element={<WelcomePageModule />} />
    </Routes>
);

export default AppRoutes;