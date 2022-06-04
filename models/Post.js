const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({

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