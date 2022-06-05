const { Likes } = require('../models');

const likesExamples = [
  {
    user_id: 6,
    post_id: 4
  }, 
  {
    user_id: 6,
    post_id: 5
  }, 
  {
    user_id: 6,
    post_id: 6
  }, 
  {
    user_id: 6,
    post_id: 7
  }, 
  {
    user_id: 1,
    post_id: 2
  }, 
  {
    user_id: 1,
    post_id: 3
  },   {
    user_id: 1,
    post_id: 4
  }, 
  {
    user_id: 4,
    post_id: 12
  },   {
    user_id: 4,
    post_id: 16
  },   {
    user_id: 4,
    post_id: 7
  },   {
    user_id: 5,
    post_id: 10
  },   {
    user_id: 5,
    post_id: 11
  },   {
    user_id: 6,
    post_id: 15
  },   {
    user_id: 6,
    post_id: 20
  }, 
];

const likesSeed = () => Likes.bulkCreate(likesExamples);

module.exports = likesSeed;