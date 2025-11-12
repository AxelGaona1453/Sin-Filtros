function Comment({ commentData }) {
	const { user, text } = commentData;
	return (
		<div className="comment">
			<strong>{user}:</strong> {text}
		</div>
	);
}

export default Comment;
