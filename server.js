const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
// set up handlebars as the template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// session modules
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'thisisyourmostprecioussecret',
  cokie: {},
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));

//turning the routes ON
app.use(routes);

// turning ON the connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`${PORT} is now listening`));
});