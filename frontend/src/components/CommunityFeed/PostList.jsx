import Post from './Post';

function PostList({ posts, onNewComment }) {
	return (
		<div className="post-list">
			{posts.map((post) => (
				<Post key={post.id} postData={post} onNewComment={onNewComment} />
			))}
		</div>
	);
}

export default PostList;
