
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { darkTheme, lightTheme } from './theme/customTheme';
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes';
import { AuthProvider, useAuth } from './context/AuthContext';

function ThemedApp() {
	const { currentUser } = useAuth();
	const theme = currentUser ? lightTheme : darkTheme;
	const modeClass = currentUser ? 'light-mode' : 'dark-mode';

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
			<ThemedApp />
		</AuthProvider>
	);
}

export default App;
