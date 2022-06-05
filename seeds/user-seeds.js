const { User } = require('../models');

const userExamples = [
  {
    username: "Lilia",
    email: "lilia@email.com",
    github: "liliagit",
    password: "liliapass"
  },
  {
    username: "Eduardo",
    email: "eduardo@email.com",
    github: "eduardogit",
    password: "eduardopass"
  },
  {
    username: "Arturo",
    email: "arturo@email.com",
    github: "arturogit",
    password: "arturopass"
  },
  {
    username: "Adrian",
    email: "adrian@email.com",
    github: "adriangit",
    password: "adrianpass"
  },
  {
    username: "Isaias",
    email: "isaias@email.com",
    github: "isaiasqb",
    password: "isaiaspass"
  },
  {
    username: "Lucia",
    email: "lucia@email.com",
    github: "luciagit",
    password: "luciapass"
  }
];

const userSeed = () => User.bulkCreate(userExamples);

module.exports = userSeed;