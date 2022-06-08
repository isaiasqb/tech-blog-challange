const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Likes } = require('../models');

// HOMEPAGE route
router.get('/', (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: ['id', 
                  'title', 
                  'content',
                  'date_posted',
                  [
      sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'),
      'likes_count'
                  ]
                ],
    order: [['date_posted', 'DESC']],
    include: [
      {
      model: User,
      attributes: ['id', 'username', 'github']
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
    const post = postInfo.map(postItem => postItem.get({ plain: true }))
    res.render('homepage', { post });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//LOGIN Route
router.get('/login', (req, res) => {
if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router;