import {
	FaCompass,
	FaHome,
	FaRegHeart,
	FaSignOutAlt,
	FaUserCircle,
} from 'react-icons/fa';
import './Layout.css';

function Sidebar() {
	return (
		<nav className="sidebar">
			<div className="sidebar-logo">Sin-Filtros</div>

			<ul className="sidebar-nav">
				<li className="nav-item">
					<a href="/community">
						<FaHome size={24} /> <span>Comunidad</span>
					</a>
				</li>
				<li className="nav-item">
					<a href="/explore">
						<FaCompass size={24} /> <span>Explorar</span>
					</a>
				</li>
				<li className="nav-item">
					<a href="/progress">
						<FaRegHeart size={24} /> <span>Mi Progreso</span>
					</a>
				</li>
				<li className="nav-item">
					<a href="/profile">
						<FaUserCircle size={24} /> <span>Perfil</span>
					</a>
				</li>
			</ul>

			<div className="nav-item sidebar-footer">
				<a href="/">
					<FaSignOutAlt size={24} /> <span>Cerrar Sesión</span>
				</a>
			</div>
		</nav>
	);
}

export default Sidebar;
