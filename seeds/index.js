const userSeed = require('./user-seeds');
const postSeed = require('./post-seeds');
// const commentSeed = require('./comment-seeds');
// const likesSeed = require('./like-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('=-=-=-=-=-=-=-=-=-=-=-SYNC COMPLETED=-=-=-=-=-=-=-=-=-=-=-');

  await userSeed();
  console.log('=-=-=-=-=-=-=-=-=-=-=-USER EXAMPLES SEEDED=-=-=-=-=-=-=-=-=-=-=-');

  await postSeed();
  console.log('=-=-=-=-=-=-=-=-=-=-=-POSTS EXAMPLES SEEDED=-=-=-=-=-=-=-=-=-=-=-');

  // await commentSeed();
  // console.log('=-=-=-=-=-=-=-=-=-=-=-COMMENT EXAMPLES SEEDED=-=-=-=-=-=-=-=-=-=-=-');

  // await likesSeed();
  // console.log('=-=-=-=-=-=-=-=-=-=-=-LIKES EXAMPLES SEEDED=-=-=-=-=-=-=-=-=-=-=-');

  process.exit(0);
};

seedAll();