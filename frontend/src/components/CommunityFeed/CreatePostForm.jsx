import React, { useState } from 'react';

function CreatePostForm({ onNewPost }) {
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text.trim()) return;

		const postData = {
			text,
			image: 'https://www.shutterstock.com/es/search/cigarrillo',
		};

		onNewPost(postData);
		setText('');
	};

	return (
		<form className="create-post-form" onSubmit={handleSubmit}>
			<textarea
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="¿Cómo te sientes hoy? ¡Comparte tu logro!"
			/>
			{/* <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}
			<button type="submit">Publicar</button>
		</form>
	);
}

export default CreatePostForm;
