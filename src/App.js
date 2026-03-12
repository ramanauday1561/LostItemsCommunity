
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { darkTheme, lightTheme } from './theme/customTheme';
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes';
import { AuthProvider } from './context/AuthContext';
import { ThemeContextProvider, useThemeContext } from './context/ThemeContext';

function ThemedApp() {
	const { mode } = useThemeContext();
	const theme = mode === 'light' ? lightTheme : darkTheme;
	const modeClass = mode === 'light' ? 'light-mode' : 'dark-mode';

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<div className={`App ${modeClass}`}>
					<div className="navbar-container">
						<Navbar />
					</div>
					<AnimatedRoutes />
					<Footer />
				</div>
			</Router>
		</ThemeProvider>
	);
}

function App() {
	return (
		<AuthProvider>
			<ThemeContextProvider>
				<ThemedApp />
			</ThemeContextProvider>
		</AuthProvider>
	);
}

export default App;
