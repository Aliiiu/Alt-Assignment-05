import express from 'express';
import dotenv from 'dotenv';
import { connectionToMongoDB } from './database/connection.js';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import './middleware/auth.middleware.js';
import passport from 'passport';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

connectionToMongoDB();

app.use(express.json());
app.use('/auth', authRoute);
app.use('/posts', passport.authenticate('jwt', { session: false }), postRoute);

app.get('/', (req, res) => {
	res.send('Welcome Home!');
});

// Handle errors.
app.use(function (err, req, res, next) {
	console.log(err);
	res.status(err.status || 500);
	res.json({ error: err.message });
});

app.listen(PORT, () => {
	console.log(`Server started at https://localhost:${PORT}`);
});
