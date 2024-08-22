import cryptoJS from 'crypto-js'

const { USER_AUTH_SECRET } = process.env

export default async (req, res, next) => {
	const token = req.headers['x-token']

	if (!token) {
		res.status(401).json({ message: 'Unauthorized' })
		return
	}

	try {
		const bytes = cryptoJS.AES.decrypt(token, USER_AUTH_SECRET)
		const decryptedData = bytes.toString(cryptoJS.enc.Utf8)

		if (!decryptedData) {
			res.status(401).json({ message: 'Invalid or expired token' })
			return
		}

		req.user = JSON.parse(decryptedData)

		next()
	} catch (error) {
		res.status(401).json({ message: 'Invalid or expired token' })
	}
}
