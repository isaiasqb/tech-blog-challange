const router = require('express').Router();
const { Comment } = require('../../models');

// Get ALL Comments
router.get('/', (req, res) => {
  Comment.findAll()
  .then(commentInfo => res.json(commentInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// POST a comment
router.post('/', (req, res) => {
  Comment.create({
    comment_content: req.body.comment_content,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(commentInfo => res.json(commentInfo))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});


//FIND a Commend 
router.get('/:id', (req, res) => {
  Comment.findOne({
    where:
    {
      id: req.params.id
    }
  })
  .then(commentInfo => res.json(commentInfo))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});


//DELETE a Comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where:
    {
      id: req.params.id
    }
  })
  .then(commentInfo => res.json({commentInfo, message:`Comment ${req.params.id} has been deleted`}))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;