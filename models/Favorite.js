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
	onDelete: 'cascade',
});
Favorite.belongsTo(Book, {
	foreignKey: 'bookId',
	onDelete: 'cascade',
});
User.hasMany(Favorite, {
	foreignKey: 'userId',
	onDelete: 'cascade',
});
Book.hasMany(Favorite, {
	foreignKey: 'bookId',
	onDelete: 'cascade',
});
export default Favorite;
