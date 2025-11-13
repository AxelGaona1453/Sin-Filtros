// /src/components/ProfilePage/EditProfileForm.js
import React, { useState } from 'react';
import './EditProfileForm.css';

function EditProfileForm({ currentUser, onSave, onClose }) {
	// Usamos el estado local para manejar los cambios del formulario
	const [name, setName] = useState(currentUser.name);
	const [bio, setBio] = useState(currentUser.bio);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave({ ...currentUser, name, bio });
	};

	return (
		<form className="edit-profile-form" onSubmit={handleSubmit}>
			<h2>Editar Perfil</h2>

			<div className="form-group">
				<label htmlFor="name">Nombre</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="bio">Biografía</label>
				<textarea
					id="bio"
					value={bio}
					onChange={(e) => setBio(e.target.value)}
					rows="4"
				/>
			</div>

			<div className="form-buttons">
				<button type="button" className="btn-cancel" onClick={onClose}>
					Cancelar
				</button>
				<button type="submit" className="btn-save">
					Guardar Cambios
				</button>
			</div>
		</form>
	);
}

export default EditProfileForm;
