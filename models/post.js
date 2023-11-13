'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User,Topic }) {
      // define association here
      // userId
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user' });

      this.belongsToMany(Topic, {
        through: 'TopicPost',
        as: 'topics',
        foreignKey: 'postId'
       });
    }

  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      post: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'posts',
      modelName: 'Post',
    }
  )
  return Post
}
