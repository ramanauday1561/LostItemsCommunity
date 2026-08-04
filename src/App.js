import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { darkTheme, lightTheme } from './theme/customTheme';
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeContextProvider, useThemeContext } from './context/ThemeContext';

function MainLayout() {
	const { mode } = useThemeContext();
	const { currentUser } = useAuth();
	const location = useLocation();
	const theme = mode === 'light' ? lightTheme : darkTheme;
	const modeClass = mode === 'light' ? 'light-mode' : 'dark-mode';

	// Check if we are in AfterLogin / Dashboard view to render Stitch full UI layout
	const isAfterLoginView = Boolean(
		currentUser ||
		location.pathname.startsWith('/dashboard') ||
		location.pathname.startsWith('/admin')
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className={`App ${modeClass}`}>
				{!isAfterLoginView && (
					<div className="navbar-container">
						<Navbar />
					</div>
				)}
				<AnimatedRoutes />
				{!isAfterLoginView && <Footer />}
			</div>
		</ThemeProvider>
	);
}

function App() {
	return (
		<AuthProvider>
			<ThemeContextProvider>
				<Router>
					<MainLayout />
				</Router>
			</ThemeContextProvider>
		</AuthProvider>
	);
}

export default App;
