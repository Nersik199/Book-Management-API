import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';
import User from './Users.js';

class Book extends Model {}

Book.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
		},
		userId: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		modelName: 'book',
		tableName: 'book',
	}
);

Book.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });
User.hasMany(Book, { foreignKey: 'userId', onDelete: 'cascade' });

export default Book;
