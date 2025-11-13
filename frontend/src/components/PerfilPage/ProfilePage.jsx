import React, { useState } from 'react';
import './ProfilePage.css';
import './ProfilePage.css';
import PostList from '../CommunityFeed/PostList';
import { FaEdit, FaCalendarAlt } from 'react-icons/fa';
import { MOCK_POSTS } from '../CommunityFeed/CommunityFeed';

import Modal from '../modal/Modal';
import EditProfileForm from './EditProfileForm';
const MOCK_USER_INFO = {
	username: 'UsuarioEjemplo',
	name: 'Esteban Quito',
	avatar: 'https://via.placeholder.com/150',
	bio: 'Dejando atrás el humo, un día a la vez. Mi meta es volver a correr maratones.',
	quitDate: new Date('2025-10-20T10:00:00'),
};

const userPostsData = MOCK_POSTS.filter(
	(post) => post.author === MOCK_USER_INFO.username,
);

function ProfilePage() {
	const [userPosts, setUserPosts] = useState(userPostsData);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userInfo, setUserInfo] = useState(MOCK_USER_INFO);

	const handleNewComment = (postId, commentText) => {
		setUserPosts(
			userPosts.map((post) => {
				if (post.id === postId) {
					const newComment = {
						id: new Date().getTime(),
						user: 'UsuarioEjemplo',
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

	const handleSaveProfile = (newUserInfo) => {
		console.log('Guardando datos nuevos:', newUserInfo);
		setUserInfo(newUserInfo);
		setIsModalOpen(false);
	};

	return (
		<div className="profile-page">
			<header className="profile-header">
				<img src={userInfo.avatar} alt="Avatar" className="profile-avatar" />
				<div className="profile-info">
					<div className="profile-info-header">
						<h2>{userInfo.username}</h2>
						<button className="profile-edit-btn" onClick={() => setIsModalOpen(true)}>
							<FaEdit /> Editar Perfil
						</button>
					</div>
					<p className="profile-name">{userInfo.name}</p>
					<p className="profile-bio">{userInfo.bio}</p>
					<div className="profile-stat">
						<FaCalendarAlt />
						<span>
							Sin fumar desde el {userInfo.quitDate.toLocaleDateString('es-AR')}
						</span>
					</div>
				</div>
			</header>

			<section className="profile-posts-section">
				<h3>Mis Publicaciones</h3>
				<PostList posts={userPosts} onNewComment={handleNewComment} />
			</section>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<EditProfileForm
					currentUser={userInfo}
					onSave={handleSaveProfile}
					onClose={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
}

export default ProfilePage;
