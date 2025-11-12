import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../style/Login.css';

function AuthForm() {
	const [isLoginView, setIsLoginView] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [msg, setMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [lastname, setLastname] = useState('');
	const [firstname, setFirstname] = useState('');

	// Usa useNavigate en lugar de window.location.href
	const navigate = useNavigate();

	const toggleView = () => {
		setIsLoginView(!isLoginView);
		setUsername('');
		setLastname('');
		setEmail('');
		setPassword('');
		setMsg('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setMsg('');

		try {
			if (isLoginView) {
				// Lógica de Login
				const loginData = {
					email: email,
					password: password,
				};

				console.log('Objeto de Login:', loginData);

				const response = await fetch('http://localhost:3000/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
					credentials: 'include',
				});

				const data = await response.json();

				if (response.ok) {
					setMsg(' ¡Login exitoso! Redirigiendo...');
					console.log('Respuesta del servidor:', data);

					// Guardar el token en localStorage si viene en la respuesta
					if (data.token) {
						localStorage.setItem('token', data.token);
					}

					// Redirigir usando navigate
					setTimeout(() => {
						navigate('/dashboard');
					}, 1500);
				} else {
					setMsg(`Error: ${data.msg || 'Credenciales incorrectas'}`);
				}
			} else {
				// Lógica de Registro
				const userData = {
					username: username,
					email: email,
					password: password,
					profile: {
						firstname: firstname,
						lastname: lastname,
					},
				};

				console.log('Objeto de Registro:', userData);

				const response = await fetch('http://localhost:3000/sin-filtros/auth/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				});

				const data = await response.json();

				if (response.ok) {
					setMsg(' ¡Usuario registrado exitosamente!');
					console.log('Respuesta del servidor:', data);
					setTimeout(() => setIsLoginView(true), 2000);
				} else {
					const error = data.msg?.[0]?.msg || data.msg;
					setMsg(` Error: ${error}`);
					console.log(data.msg);
				}
			}
		} catch (err) {
			console.error('Error en la petición:', err);
			setMsg(' Error de conexión con el servidor');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>{isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
				{msg && (
					<div className={`msg ${msg.includes('✅') ? 'success' : 'error'}`}>{msg}</div>
				)}
				{!isLoginView && (
					<>
						<div className="input-group">
							<label htmlFor="name">Username</label>
							<input
								type="text"
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								disabled={loading}
							/>
						</div>
					</>
				)}
				{!isLoginView && (
					<>
						<div className="input-group">
							<label htmlFor="name">Nombre</label>
							<input
								type="text"
								id="username"
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
								required
								disabled={loading}
							/>
						</div>
					</>
				)}
				{!isLoginView && (
					<>
						<div className="input-group">
							<label htmlFor="lastname">Apellido</label>
							<input
								type="text"
								id="lastname"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
								required
								disabled={loading}
							/>
						</div>
					</>
				)}

				<div className="input-group">
					<label htmlFor="email">Correo Electrónico</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						disabled={loading}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						disabled={loading}
					/>
				</div>

				<button type="submit" className="auth-button" disabled={loading}>
					{loading ? 'Cargando...' : isLoginView ? 'Ingresar' : 'Registrarse'}
				</button>
				<div className="toggle-view">
					{isLoginView ? (
						<p>
							¿No tienes una cuenta? <span onClick={toggleView}>Regístrate</span>
						</p>
					) : (
						<p>
							¿Ya tienes una cuenta? <span onClick={toggleView}>Inicia Sesión</span>
						</p>
					)}
				</div>
			</form>
		</div>
	);
}

export default AuthForm;
