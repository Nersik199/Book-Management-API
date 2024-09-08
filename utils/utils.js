import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
const { JWT_TOKEN } = process.env;

export default {
	createToken: payload => {
		const { id, email } = payload;
		return jwt.sign({ id, email }, JWT_TOKEN, { expiresIn: '30d' });
	},
	processFilePath: async file => {
		const data = await file;
		if (!data) return null;
		const relativePath = data.destination.replace(
			`${path.resolve('./public')}`,
			''
		);

		return path.join(relativePath, data.filename);
	},

	updateFileImage: async function (file, avatar) {
		if (file) {
			if (avatar) {
				const pathFile = path.resolve(`./public${avatar}`);
				if (fs.existsSync(pathFile)) {
					fs.unlinkSync(pathFile);
				}
			}
			return await this.processFilePath(file);
		}

		return avatar;
	},

	deleteFileImage: async function (avatar) {
		if (avatar) {
			const pathFile = path.resolve(`./public${avatar}`);
			if (fs.existsSync(pathFile)) {
				fs.unlinkSync(pathFile);
			}
		}
	},
};
