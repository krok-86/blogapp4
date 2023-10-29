'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TopicPost extends Model {
    static associate(models) {
      // define association here
    }
  };
  TopicPost.init({
    topicId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TopicPost',
    tableName: 'topicPosts',
  });
  return TopicPost;
};