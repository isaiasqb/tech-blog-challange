const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turning the routes ON
app.use(routes);

// turning ON the connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`${PORT} is now listening`));
});