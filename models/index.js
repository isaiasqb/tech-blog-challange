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

//Association for the Likes functionality
User.belongsToMany(Post, {
  through: Likes,
  as: 'liked_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Likes,
  as: 'liked_posts',
  foreignKey: 'post_id'
});

//Associations between Post-Likes & User-Likes
Likes.belongsTo(User, {
  foreignKey: 'user_id'
});

Likes.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Likes, {
  foreignKey:'user_id'
});

Post.hasMany(Likes, {
  foreignKey: 'post_id'
});

//Associations for the Comment Model
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment, Likes };