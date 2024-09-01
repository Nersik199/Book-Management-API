import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';
import User from './Users.js';
import Book from './Book.js';

class Favorite extends Model {}

Favorite.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
	},
	{
		sequelize,
		timestamps: true,
		modelName: 'favorite',
		tableName: 'favorite',
		indexes: [
			{
				unique: true,
				fields: ['userId', 'bookId'],
			},
		],
	}
);

Favorite.belongsTo(User, {
	foreignKey: 'userId',
});
Favorite.belongsTo(Book, {
	foreignKey: 'bookId',
});
User.hasMany(Favorite, {
	foreignKey: 'userId',
});
Book.hasMany(Favorite, {
	foreignKey: 'bookId',
});
export default Favorite;
