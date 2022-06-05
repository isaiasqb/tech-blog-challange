const router = require('express').Router();
const { Post, User } = require('../../models');

//GET All Posts - api/posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'date_posted'],
    order: [['date_posted', 'DESC']],
    include: [{
      model: User,
      attributes: ['id', 'username']
    }]
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
    attributes: ['id', 'title', 'date_posted'],
    include: [{
      model: User,
      attributes: ['id', 'username']
    }]
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
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.user_id
  })
  .then(postInfo => res.json(postInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
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