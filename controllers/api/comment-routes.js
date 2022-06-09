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
  if(req.session) {

    Comment.create({
      comment_content: req.body.commentText,
      user_id: req.session.user_id, // use the id from the session
      post_id: req.body.postId
    })
      .then(commentInfo => res.json(commentInfo))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });

  }
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