const router = require('express').Router();
const { Post, User, Likes, Comment } = require('../../models');
const sequelize = require('../../config/connection')

//GET All Posts - api/posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 
                  'title', 
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
  .then(postInfo => res.json(postInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



//GET Post by id - api/posts/1
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
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
      if (!postInfo) {
        res.status(404).json({ message: 'No post found' });
        return;
      }
      res.json(postInfo);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//POST Create a Post - api/posts
router.post('/', (req, res) => {
  Post.create({
    title: req.body.postTitle,
    content: req.body.postContent,
    user_id: req.session.user_id
  })
  .then(postInfo => res.json(postInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// PUT, Liking a Post - api/posts/like
router.put('/like', (req, res) => {
  if(req.session) {
    Post.likePost({...req.body, user_id: req.session.user_id}, { Likes, Comment, User })
      .then(postInfo => res.json(postInfo))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  }

    //Functionality recreated as a model method
//   Likes.create({
//     user_id: req.body.user_id,
//     post_id: req.body.post_id
//   }).then(() => {
//     // then find the post we just voted on
//     return Post.findOne({
//       where: {
//         id: req.body.post_id
//       },
//       attributes: [
//         'id',
//         'title',
//         'date_posted',
//         [
//           sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'),
//           'likes_count'
//         ]
//       ]
//     })
//     .then(postInfo => res.json(postInfo))
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });
});

//PUT Update a Post title - api/posts/1
router.put('/:id', (req,res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(postInfo => {
    if (!postInfo) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json({postInfo, message:`Title Updated to: ${req.body.title}`});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



//DELETE a Post - api/posts/1
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(postInfo => {
      if (!postInfo) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json({postInfo, message:`Post #${req.params.id} has been deleted`});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;