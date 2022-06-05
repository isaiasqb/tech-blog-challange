const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Likes = require('./Likes');

//Associations for User and Post
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

module.exports = { User, Post, Comment, Likes };