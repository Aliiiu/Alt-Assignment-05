import { ErrorWithStatus } from '../exceptions/error-with-status.exceptions.js';
import PostModel from '../model/post.js';

export const createPost = async (title, body, userId) => {
	const postCreated = await PostModel.create({ title, body, user: userId });

	if (!postCreated) {
		throw new ErrorWithStatus('Error creating post', 500);
	}

	// Then, populate the user data in the created post
	const populatedPost = await PostModel.findById(postCreated._id)
		.populate({
			path: 'user',
			select: 'name email updatedAt createdAt',
		})
		.exec();

	return populatedPost;
};

export const updatePost = async (id, postContent, userId) => {
	const post = await PostModel.findById(id);
	if (!post) {
		throw new ErrorWithStatus('Post not found', 404);
	}

	// Check if the logged-in user is the post creator
	if (post.user.toString() !== userId) {
		throw new ErrorWithStatus('Unauthorized to update this post', 403);
	}

	return await PostModel.findByIdAndUpdate(id, postContent, { new: true })
		.populate({
			path: 'user',
			select: 'name email updatedAt createdAt',
		})
		.exec();
};

export const getAllPosts = async () => {
	return await PostModel.find()
		.populate({
			path: 'user',
			select: 'name email updatedAt createdAt',
		})
		.exec();
};

export const getAllPost = async (id) => {
	const post = await PostModel.findById(id);
	if (!post) {
		throw new ErrorWithStatus('Post not found', 404);
	}

	return await PostModel.findById(id)
		.populate({
			path: 'user',
			select: 'name email updatedAt createdAt',
		})
		.exec();
};

export const deletePost = async (id, userId) => {
	const post = await PostModel.findById(id);
	if (!post) {
		throw new ErrorWithStatus('Post not found', 404);
	}

	// Check if the logged-in user is the post creator
	if (post.user.toString() !== userId) {
		throw new ErrorWithStatus('Unauthorized to delete this post', 403);
	}

	return await PostModel.findByIdAndDelete(id);
};
