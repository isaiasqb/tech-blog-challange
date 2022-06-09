const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Likes } = require('../models');

//DASHBOARD Route
router.get('/', (req, res) => {
  Post.findAll({
    where:{
      user_id: req.session.user_id
    },
    attributes: ['id', 
    'title', 
    'date_posted',
    [
      sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'),
      'likes_count'
    ]],
    include: [
    {
    model: User,
    attributes: ['username']
    },
    {
    model: Comment,
    attributes: ['id', 'comment_content', 'post_id', 'user_id', 'date_posted'],
    include: {
      model: User,
      attributes: ['username']
      }
    },
    ]
  })
  .then(postInfo => {
    const post = postInfo.map(singlePost => singlePost.get({ plain: true}));
    res.render('dashboard', { post, loggedIn: true, userName: req.session.username, wantToPost: true,});
  })
    .catch(err => {
      res.status(500).json(err)
    })
  });

module.exports = router;
