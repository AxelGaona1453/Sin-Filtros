import React, { useState, useEffect } from 'react';
import './ProgressPage.css';
import { FaRegSmileBeam, FaPiggyBank, FaHeartbeat } from 'react-icons/fa';

function ProgressPage() {
	const [fechaDejoDeFumar] = useState(new Date('2025-11-01T10:00:00'));
	const [tiempoSinFumar, setTiempoSinFumar] = useState('');
	const [dineroAhorrado, setDineroAhorrado] = useState(0);

	useEffect(() => {
		const PRECIO_PAQUETE = 2500;
		const PAQUETES_POR_DIA = 1;

		const calcularProgreso = () => {
			const ahora = new Date();
			const diffMs = ahora - fechaDejoDeFumar;

			const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
			const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
			const minutos = Math.floor((diffMs / (1000 * 60)) % 60);

			setTiempoSinFumar(`${dias}d ${horas}h ${minutos}m`);

			const diasDecimales = diffMs / (1000 * 60 * 60 * 24);
			const dinero = Math.floor(diasDecimales * PAQUETES_POR_DIA * PRECIO_PAQUETE);
			setDineroAhorrado(dinero);
		};
		const interval = setInterval(calcularProgreso, 60000);
		calcularProgreso();
		return () => clearInterval(interval);
	}, [fechaDejoDeFumar]);

	return (
		<div className="progress-page">
			<h2>Mi Progreso</h2>
			<p>¡Mirá todo lo que lograste! Este es tu panel de control.</p>

			<div className="progress-main-counter">
				<h3>Tiempo sin fumar</h3>
				<div className="timer">{tiempoSinFumar}</div>
			</div>

			<div className="progress-grid">
				<div className="progress-card">
					<FaPiggyBank size={40} className="card-icon" />
					<h3>Dinero Ahorrado</h3>
					<p className="card-value">${dineroAhorrado.toLocaleString('es-AR')}</p>
				</div>

				<div className="progress-card">
					<FaHeartbeat size={40} className="card-icon" />
					<h3>Salud Recuperada</h3>
					<p className="card-milestone">¡Tu presión arterial volvió a la normalidad!</p>
				</div>

				<div className="progress-card">
					<FaRegSmileBeam size={40} className="card-icon" />
					<h3>Beneficio Próximo</h3>
					<p className="card-milestone">
						En 3 días, tu sentido del olfato y gusto mejorarán notablemente.
					</p>
				</div>
			</div>
		</div>
	);
}

export default ProgressPage;
