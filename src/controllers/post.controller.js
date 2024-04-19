import * as postService from '../services/post.service.js';

export const getAllPosts = (req, res) => {
	postService
		.getAllPosts()
		.then((posts) => {
			res.send({
				message: 'All Posts',
				data: posts,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(err.status || 500);
			res.send({
				message: err.message,
			});
		});
};

export const getPost = (req, res) => {
	const postId = req.params.id;

	postService
		.getAllPost(postId)
		.then((post) => {
			res.send({
				message: 'Post',
				data: post,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(err.status || 500);
			res.send({
				message: err.message,
			});
		});
};

export const createPost = async (req, res) => {
	const { title, body } = req.body;
	const { id: userId } = req.user;
	postService
		.createPost(title, body, userId)
		.then((post) => {
			res.send({
				message: 'Post created',
				data: post,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(err.status || 500);
			res.send({
				message: err.message,
			});
		});
};

export const updatePost = (req, res) => {
	const id = req.params.id;
	const body = req.body;
	const { id: userId } = req.user;

	postService
		.updatePost(id, body, userId)
		.then((post) => {
			res.send({
				message: 'Post updated successfully',
				data: post,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(err.status || 500);
			res.send({
				message: err.message,
			});
		});
};

export const deletePost = (req, res) => {
	const id = req.params.id;
	const { id: userId } = req.user;

	postService
		.deletePost(id, userId)
		.then((post) => {
			res.send({
				message: 'Post Deleted Successfully',
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(err.status || 500);
			res.send({
				message: err.message,
			});
		});
};
