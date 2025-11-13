import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CommunityFeed from './components/CommunityFeed/CommunityFeed';
import AppLayout from './components/Layout/AppLayout';
import './components/Layout/Layout.css';
import ProgressPage from './components/ProgressPage/ProgressPage';
import './index.css';
import AuthForm from './pages/Loginpage';
import './style/Login.css';
import ProfilePage from './components/PerfilPage/ProfilePage';
import './components/PerfilPage/ProfilePage.css';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<AuthForm />} />
					<Route element={<AppLayout />}>
						{' '}
						<Route path="/community" element={<CommunityFeed />} />
						<Route path="/progress" element={<ProgressPage />} />
						<Route path="/profile" element={<ProfilePage />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
