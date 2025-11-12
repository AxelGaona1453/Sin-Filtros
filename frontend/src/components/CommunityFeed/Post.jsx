import { useState } from 'react';
import Comment from './Comment';

function Post({ postData, onNewComment }) {
	const [commentText, setCommentText] = useState('');

	const { id, author, avatar, text, image, comments } = postData;

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		if (!commentText.trim()) return;
		onNewComment(id, commentText);
		setCommentText('');
	};

	return (
		<article className="post-card">
			<header className="post-header">
				<img src={avatar} alt={`Avatar de ${author}`} className="post-avatar" />
				<span className="post-author">{author}</span>
			</header>

			<div className="post-content">
				<p>{text}</p>
				{image && <img src={image} alt="Contenido del post" className="post-image" />}
			</div>

			<footer className="post-footer">
				<div className="post-comments">
					<strong>Comentarios:</strong>
					{comments.length > 0 ? (
						comments.map((comment) => <Comment key={comment.id} commentData={comment} />)
					) : (
						<p className="no-comments">Aún no hay comentarios. ¡Sé el primero!</p>
					)}
				</div>

				<form className="comment-form" onSubmit={handleCommentSubmit}>
					<input
						type="text"
						placeholder="Escribe un comentario..."
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
					/>
					<button type="submit">Enviar</button>
				</form>
			</footer>
		</article>
	);
}

export default Post;
