import React from 'react';
import './Dashboard.css'; // Importamos los estilos

// --- Componente Header (Encabezado) ---
const Header = () => {
	return (
		<header className="dashboard-header">
			<h1>Panel de Control</h1>
			<div className="user-info">
				<span>Usuario: Admin</span>
			</div>
		</header>
	);
};

// --- Componente Sidebar (Barra Lateral) ---
const Sidebar = () => {
	return (
		<aside className="dashboard-sidebar">
			<div className="sidebar-logo">
				<h2>Mi App</h2>
			</div>
			<nav className="sidebar-nav">
				<ul>
					<li className="active">
						<a href="#inicio">Inicio</a>
					</li>
					<li>
						<a href="#estadisticas">Estadísticas</a>
					</li>
					<li>
						<a href="#reportes">Reportes</a>
					</li>
					<li>
						<a href="#usuarios">Usuarios</a>
					</li>
					<li>
						<a href="#config">Configuración</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

// --- Componente MainContent (Contenido Principal) ---
const MainContent = () => {
	return (
		<main className="dashboard-main">
			<h2>Resumen General</h2>

			{/* Contenedor de tarjetas */}
			<div className="dashboard-cards">
				<div className="card">
					<h3>Ventas Totales</h3>
					<p>$125,430</p>
					<span className="card-info">+12% vs mes anterior</span>
				</div>

				<div className="card">
					<h3>Usuarios Activos</h3>
					<p>4,820</p>
					<span className="card-info">+5.2% vs mes anterior</span>
				</div>

				<div className="card">
					<h3>Nuevos Pedidos</h3>
					<p>1,150</p>
					<span className="card-info">-1.5% vs mes anterior</span>
				</div>
			</div>

			{/* Aquí podrías agregar más componentes como tablas o gráficos */}
			<div className="more-content">
				<h3>Actividad Reciente</h3>
				<p>Aquí iría una tabla o un gráfico de actividad...</p>
			</div>
		</main>
	);
};

// --- Componente Principal del Dashboard ---
// Este componente une el Sidebar, Header y MainContent
const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<Sidebar />
			<div className="dashboard-content-area">
				<Header />
				<MainContent />
			</div>
		</div>
	);
};

export default Dashboard;
