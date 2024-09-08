import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';

import Book from './Book.js';
import User from './Users.js';

class Review extends Model {}

Review.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		review: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		modelName: 'review',
		tableName: 'review',
	}
);

Review.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });
Review.belongsTo(Book, { foreignKey: 'bookId', onDelete: 'cascade' });
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'cascade' });
Book.hasMany(Review, { foreignKey: 'bookId', onDelete: 'cascade' });
export default Review;
