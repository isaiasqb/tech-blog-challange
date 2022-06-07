const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Likes } = require('../models');


router.get('/', (req, res) => {
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
      attributes: ['id', 'username']
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


module.exports = router;