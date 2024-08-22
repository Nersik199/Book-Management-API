import mysql from 'mysql2'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const dbConfig = {
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE,
}

const connection = mysql.createConnection(dbConfig)

export default connection.promise()
