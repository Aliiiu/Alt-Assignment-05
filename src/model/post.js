import mongoose from 'mongoose';
import PostSchema from '../database/schema/post.schema.js';

const PostModel = mongoose.model('posts', PostSchema);

export default PostModel;
