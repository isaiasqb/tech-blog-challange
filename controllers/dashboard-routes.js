const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Likes } = require('../models');
const userAuth = require('../utils/auth')

//DASHBOARD Route
router.get('/', userAuth, (req, res) => {
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


  //EDIT POST 
  router.get('/edit/:id', userAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 
                    'title', 
                    'content',
                    'date_posted',
                    [
                      sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'),
                      'likes_count'
                    ]],
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
      const post = postInfo.get({ plain: true});
      res.render('edit-post', { post, loggedIn: true, userName: req.session.username, wantToPost: true,});
    })
      .catch(err => {
        res.status(500).json(err)
      })
    });

module.exports = router;
