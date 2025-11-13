import { Outlet } from 'react-router';
import './Layout.css';
import Sidebar from './Sidebar';

function AppLayout() {
	return (
		<div className="app-container">
			<Sidebar />
			<main className="main-content-area">
				<Outlet />
			</main>
		</div>
	);
}

export default AppLayout;
