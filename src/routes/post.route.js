import express from 'express';
import * as postController from '../controllers/post.controller.js';

const postRoute = express.Router();

postRoute.post('/', postController.createPost);
postRoute.get('/', postController.getAllPosts);
postRoute.get('/:id', postController.getPost);
postRoute.put('/:id', postController.updatePost);
postRoute.delete('/:id', postController.deletePost);

export default postRoute;
