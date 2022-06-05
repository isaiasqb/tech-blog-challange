const router = require('express').Router();
const { User, Post, Likes, Comment } = require('../../models');

// GET ALL users - /api/users
router.get('/', (req, res) => {
  User.findAll({
    attributes: {exclude: ['password'] }
  })
  .then(userInfo => res.json(userInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// GET user by id - /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password']},
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'date_posted']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_content', 'date_posted'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Likes,
        as: 'liked_posts'
      }
    ]
  })
  .then(userInfo => {
    if (!userInfo) {
      res.status(404).json({message: 'There is no user with this ID'});
    }
    res.json(userInfo)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// POST Create a user - /api/users
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    github: req.body.github,
    password: req.body.password
  })
  .then(userInfo => res.json(userInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// LOGIN verification
router.post('/login', (req, res) => {
  // exprects: email & password in the body
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userInfo => {
    if(!userInfo){
    res.status(400).json({ message: 'This email does not belong to any of our users'});
    return;
    }
    //store boolean true/false in a variable
    const okPassword = userInfo.checkPswd(req.body.password);
    if(!okPassword){
      res.status(400).json({ message: 'Invalid Password!'});
      return;
    }

    res.json({ user: userInfo, message: 'WELCOME, You logged in successfuly!'});
  })
});


// PUT Update a User - /api/users/1
router.put('/:id', (req, res) => {
  //req.body provides the new data we want 
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id //indicate where exactly the data needs to be updated
    }
  })
  .then(userInfo => {
    if (!userInfo[0]) {
      res.status(404).json({ message: 'No user found with this ID' });
      return;
    }
    res.json(userInfo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// DELETE a User - /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(userInfo => {
    if (!userInfo) {
      res.status(400).json({message:'No user found with this ID' });
      return
    }
    res.json({userInfo, message:`User ${req.params.id} has been deleted`});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;