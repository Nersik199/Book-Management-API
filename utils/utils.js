import cryptoJS from 'crypto-js'
import md5 from 'md5'

const { USER_PASSWORD_SECRET, USER_AUTH_SECRET } = process.env

export default {
	hashPassword: password => {
		return md5(md5(password) + USER_PASSWORD_SECRET)
	},
	createToken: (email, id) => {
		const data = { email, id }
		return cryptoJS.AES.encrypt(
			JSON.stringify(data),
			USER_AUTH_SECRET
		).toString()
	},
}
