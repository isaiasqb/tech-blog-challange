const router = require('express').Router();
const { userInfo } = require('os');
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  User.findAll()
  .then(userInfo => res.json(userInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
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

// POST /api/users
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(userInfo => res.json(userInfo))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
  //req.body provides the new data we want 
  User.update(req.body, {
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

// DELETE /api/users/1
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
    res.json(userInfo);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;