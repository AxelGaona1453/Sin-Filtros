// src/components/Layout/AppLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // ¡La clave!
import Sidebar from './Sidebar';
import './Layout.css'; // Importamos el CSS que ya existe

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
