const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
  //model method for Likes count
  static likePost(body, models) {
    return models.Likes.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'date_posted',
          [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'),
          'likes_count']
        ]
      });
    });
  }
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1]
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
},
{
  sequelize,
  timestamps: true,
  updatedAt: false,
  createdAt: 'date_posted',
  freezeTableName: true,
  underscored: true,
  modelName: 'post'

});

module.exports = Post;