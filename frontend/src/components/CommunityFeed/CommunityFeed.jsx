import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.webp';
import { useState } from 'react';
import './CommunityFeed.css';
import CreatePostForm from './CreatePostForm';
import PostList from './PostList';

const MOCK_POSTS = [
	{
		id: 1,
		author: 'UsuarioEjemplo',
		avatar: img1,
		text: '¡Hoy cumplo 7 días sin fumar! La verdad que me siento mucho mejor, con más energía.',
		image: 'https://via.placeholder.com/600x400.png?text=Mi+Logro+Día+7',
		comments: [
			{ id: 101, user: 'Ana', text: '¡Felicitaciones! ¡Vamos que se puede!' },
			{ id: 102, user: 'Marcos', text: '¡Qué grande! Yo voy por el día 3.' },
		],
	},
	{
		id: 2,
		author: 'LucíaG',
		avatar: img2,
		text: 'Les comparto una foto de mi caminata de hoy. Reemplacé el pucho de la tarde por esto. ¡Un antes y un después!',
		image: 'https://via.placeholder.com/600x400.png?text=Parque+Verde',
		comments: [],
	},
];

function CommunityFeed() {
	const [posts, setPosts] = useState(MOCK_POSTS);

	const handleNewPost = (postData) => {
		const newPost = {
			...postData,
			id: posts.length + 1,
			author: 'UsuarioActual',
			avatar: img1,
			comments: [],
		};
		// Agregamos el nuevo post al principio del feed
		setPosts([newPost, ...posts]);
	};

	// Función para agregar un nuevo comentario a un post específico
	const handleNewComment = (postId, commentText) => {
		setPosts(
			posts.map((post) => {
				if (post.id === postId) {
					const newComment = {
						id: new Date().getTime(),
						user: 'UsuarioActual',
						text: commentText,
					};
					return {
						...post,
						comments: [...post.comments, newComment],
					};
				}
				return post;
			}),
		);
	};

	return (
		<div className="community-feed">
			<h2>Comunidad Sin-Filtros</h2>
			<p>Comparte tu progreso, busca apoyo y motiva a otros.</p>
			<CreatePostForm onNewPost={handleNewPost} />
			<PostList posts={posts} onNewComment={handleNewComment} />
		</div>
	);
}

export default CommunityFeed;
