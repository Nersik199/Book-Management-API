import jwt from 'jsonwebtoken';
import md5 from 'md5';

const { USER_PASSWORD_SECRET, JWT_TOKEN } = process.env;

export default {
	hashPassword: password => {
		return md5(md5(password) + USER_PASSWORD_SECRET);
	},
	createToken: payload => {
		const { id, email } = payload;
		return jwt.sign({ id, email }, JWT_TOKEN, { expiresIn: '30d' });
	},
};
