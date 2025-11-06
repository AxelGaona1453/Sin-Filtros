import { CommentModel } from "../models/comment.model.js"
import { PostModel } from "../models/post.model.js"
import { matchedData } from "express-validator"
import { UserModel } from "../models/user.model.js"
import { matchedData } from "express-validator"

export const createPost = async (req, res) => {
    const data = matchedData(req);
    const userId = req.usuarioLogueado.id
    try {
        const newPost = await PostModel.create({
            ...data,
            author: userId
        })
        // Agregar el post al usuario
        await UserModel.updateOne(
            { _id: userId },
            { $push: { posts: newPost._id } });


        const postWithAuthor = await newPost.populate('author', 'username profile.profile_picture');

        res.status(201).json({
            ok: true,
            msg: "Post creado correctamente",
            post: postWithAuthor
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error al crear el post",
            error: err.message
        })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('author', 'username profile.profile_picture')
            .sort({ createdAt: -1 });

        res.status(200).json({
            ok: true,
            posts
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error al traer los posts",
            error: err.message
        })
    }
}

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.findById(id)
            .populate('author', 'username profile.profile_picture')
            .populate({
                path: "author",
                model: "User",
                select: "username profile.profile_picture"
            });

        if (!post) {
            return res.status(404).json({
                ok: false,
                msg: "Post no encontrado"
            })
        }

        res.status(200).json({
            ok: true,
            post
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error al traer el post",
            error: err.message
        })
    }
}

export const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.usuarioLogueado.id;

        const post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).json({
                ok: false,
                msg: "Post no encontrado"
            });
        }

        let updateOperation;

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            updateOperation = { $pull: { likes: userId } };
        } else {
            updateOperation = { $push: { likes: userId } };
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            updateOperation,
            { new: true }
        );

        res.status(200).json({
            ok: true,
            msg: isLiked ? "Like removido" : "Like agregado",
            post: updatedPost
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error al dar like al post",
            error: err.message
        })
    }
}

export const createComment = async (req, res) => {
    const data = matchedData(req);
    const { postId } = req.params;
    const userId = req.usuarioLogueado.id;
    try {
        const newComment = await CommentModel.create({
            text: data.text,
            author: userId,
            post: postId
        })

        await PostModel.updateOne(
            { _id: postId },
            { $push: { comments: newComment._id } }
        );

        const commentWithAuthor = await newComment.populate('author', 'username profile.profile_picture');

        res.status(201).json({
            ok: true,
            msg: "Comentario creado correctamente",
            comment: commentWithAuthor
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error al crear el comentario",
            error: err.message
        })
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.usuarioLogueado.id;
    try {
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                ok: false,
                msg: "Post no encontrado"
            });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).json({
                ok: false,
                msg: "No tienes permisos para eliminar este post"
            });
        }

        await post.deleteOne();
        await CommentModel.deleteMany({ post: postId });

        await UserModel.updateMany(
            { saved_posts: postId },
            { $pull: { saved_posts: postId } }
        );

        res.status(200).json({
            ok: true,
            msg: "Post eliminado correctamente"
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar el post",
            error: err.message
        })
    }
}
