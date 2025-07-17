
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import customTheme from './theme/customTheme';
import AppRoutes from './AppRoutes';

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<Router> {/* Wrap your app with Router */}
				<div className="App">
					<div className="navbar-container">
						<Navbar />
					</div>
					<AppRoutes />
					<Footer />
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
