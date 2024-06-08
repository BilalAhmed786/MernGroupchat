import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import  con  from './database/db.js';
import session from 'express-session';
import passport from './passportconfig/config.js';
import flash from 'connect-flash';
import router from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'wahwah123', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
