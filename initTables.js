import db from './clients/db.mysql.js'
;(async () => {
	try {
		// users table
		await db.query(`
      CREATE TABLE IF NOT EXISTS users
      (
          id        BIGINT UNSIGNED     NOT NULL AUTO_INCREMENT,
          firstName VARCHAR(255)        NOT NULL,
          lastName  VARCHAR(255)        NOT NULL,
          password  VARCHAR(255)        NOT NULL,
          email     VARCHAR(255) UNIQUE NOT NULL,
          createdAt TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY (email),
          PRIMARY KEY (id)
      );
    `)

		// Reservations table
		await db.query(`
      CREATE TABLE IF NOT EXISTS reservations
      (
          id            BIGINT UNSIGNED AUTO_INCREMENT,
          user_id       BIGINT UNSIGNED NOT NULL,
          firstName     VARCHAR(255)    NOT NULL,
          lastName      VARCHAR(255)    NOT NULL,
          phone     VARCHAR(20)         NOT NULL,
          seat_row      INT             NOT NULL,
          seat_number   INT             NOT NULL,
          createdAt     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          UNIQUE (seat_row, seat_number),
          PRIMARY KEY (id)
      );
    `)

		console.log('DB tables initialized')
	} catch (error) {
		console.error(error)
	}
})()
