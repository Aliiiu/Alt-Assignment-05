export const register = (req, res) => {
	const { name, email, _id, createdAt, updatedAt } = req.user;
	res.json({
		message: 'Signup Successful',
		data: {
			id: _id,
			name,
			email,
			updatedAt,
			createdAt,
		},
	});
};
