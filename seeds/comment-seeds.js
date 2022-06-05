const { Comment } = require('../models');

const commentExamples = [
  {
    comment_content: "Amazing article!",
    user_id: "1",
    post_id: "2"
  },  
  {
    comment_content: "This is a really interesting article!",
    user_id: "1",
    post_id: "3"
  },
  {
    comment_content: "Woow!, excellent explanation",
    user_id: "2",
    post_id: "3"
  },
  {
    comment_content: "I don't really see it that way!",
    user_id: "2",
    post_id: "4"
  },
  {
    comment_content: "Keep on the good work mate!",
    user_id: "3",
    post_id: "4"
  },
  {
    comment_content: "Can you share the url for this information?",
    user_id: "3",
    post_id: "5"
  },
  {
    comment_content: "I think this article belongs to another forum",
    user_id: "4",
    post_id: "10"
  },
  {
    comment_content: "Where are you getting this from? really innacurate",
    user_id: "4",
    post_id: "16"
  },
  {
    comment_content: "Maybe you should do some more reseach about this",
    user_id: "5",
    post_id: "12"
  },
  {
    comment_content: "Can you recommend any other program besides the one you are using?",
    user_id: "5",
    post_id: "14"
  },
  
];

const commentSeed = () => Comment.bulkCreate(commentExamples);

module.exports = commentSeed;