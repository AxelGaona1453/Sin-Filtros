import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CommunityFeed from './components/CommunityFeed/CommunityFeed';
import './components/Layout/Layout.css';
import AppLayout from './components/Layout/AppLayout';
import './index.css';
import AuthForm from './pages/Loginpage';
import './style/Login.css';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<AuthForm />} />
					<Route element={<AppLayout />}>
						{' '}
						<Route path="/community" element={<CommunityFeed />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
