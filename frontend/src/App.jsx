import { Route, BrowserRouter as Router, Routes } from 'react-router';
import AuthForm from './pages/Loginpage';
import './style/Login.css';
import CommunityFeed from './components/CommunityFeed/CommunityFeed';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<AuthForm />} />
					<Route path="/community" element={<CommunityFeed />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
