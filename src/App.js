
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import customTheme from './theme/customTheme';
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes';

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<Router> {/* Wrap your app with Router */}
				<div className="App">
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

export default App;
