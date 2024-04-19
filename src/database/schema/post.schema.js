import mongoose, { Schema } from 'mongoose';

const PostSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		body: {
			type: String,
			required: true,
			trim: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true, // Ensure virtuals are included when document is converted to JSON
			transform: function (doc, ret) {
				// Replace _id with id
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v; // Optional: remove version key
				delete ret.password; // Important: remove password field for security
			},
		},
	}
);

export default PostSchema;
