import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';
import User from './Users.js';
import Review from './Review.js';

class Comment extends Model {}

Comment.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		modelName: 'comment',
		tableName: 'comment',
	}
);

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Review, { foreignKey: 'reviewId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Review.hasMany(Comment, { foreignKey: 'reviewId' });

export default Comment;
