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

	// Check if we are in AfterLogin / Dashboard view
	const isAfterLoginView = Boolean(
		currentUser ||
		location.pathname.startsWith('/dashboard') ||
		location.pathname.startsWith('/search-lost') ||
		location.pathname.startsWith('/search-found') ||
		location.pathname.startsWith('/forum') ||
		location.pathname.startsWith('/contact') ||
		location.pathname.startsWith('/report-lost') ||
		location.pathname.startsWith('/report-found') ||
		location.pathname.startsWith('/admin')
	);

	// AfterLogin screens take dark theme as default per DESIGN.md; BeforeLogin screens retain ThemeContext mode
	const activeMode = isAfterLoginView ? 'dark' : mode;
	const theme = activeMode === 'light' ? lightTheme : darkTheme;
	const modeClass = activeMode === 'light' ? 'light-mode' : 'dark-mode';

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
