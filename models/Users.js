import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';

class Users extends Model {}

Users.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		type: {
			type: DataTypes.ENUM('user', 'admin'),
			allowNull: false,
			defaultValue: 'user',
		},
	},
	{
		sequelize,
		modelName: 'user',
		tableName: 'users',
		indexes: [
			{
				unique: true,
				fields: ['email'],
			},
		],
	}
);

export default Users;
