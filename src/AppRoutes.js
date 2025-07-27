import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePageModule from './Modules/BeforeLogin/WelcomePage/WelcomePageModule';
import LoginNeeded from './Modules/BeforeLogin/LoginNeeded/LoginNeeded';
import Login from './Modules/BeforeLogin/Login/Login';
import Signup from './Modules/BeforeLogin/Signup/Signup';

const AppRoutes = () => (
    <Routes>
        <Route path="/login-needed" element={<LoginNeeded />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<WelcomePageModule />} />
    </Routes>
);

export default AppRoutes;