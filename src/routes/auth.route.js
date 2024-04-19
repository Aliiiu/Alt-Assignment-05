import express from 'express';
import * as authControllers from '../controllers/auth.controller.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ErrorWithStatus } from '../exceptions/error-with-status.exceptions.js';

const authRoute = express.Router();

authRoute.post(
	'/register',
	passport.authenticate('register', { session: false }),
	authControllers.register
);

authRoute.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err) {
				return next(err);
			}
			if (!user) {
				const error = new ErrorWithStatus(
					'Username or password is incorrect',
					400
				);
				return next(error);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);
				const { name, email, _id, createdAt, updatedAt } = user;
				//You store the id and email in the payload of the JWT.
				// You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
				// DO NOT STORE PASSWORDS IN THE JWT!
				const token = jwt.sign({ user }, process.env.JWT_SECRET);

				return res.json({
					message: 'Login Successful',
					data: {
						accessToken: token,
						user: { id: _id, name, email, updatedAt, createdAt },
					},
				});
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

export default authRoute;
