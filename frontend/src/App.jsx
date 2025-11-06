import { Route, BrowserRouter as Router, Routes } from 'react-router';
import AuthForm from './pages/Loginpage';
import './style/Login.css';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<AuthForm />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
