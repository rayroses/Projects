import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'
import recipesRouter from './routes/recipes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.locals.__dirname=__dirname;

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));


/*
app.use((req, res, next)=>{
  //use * to allow all clients or specify a client if you want to
  res.header('Access-Control-Allow-Origin',  'http://localhost:3000');
next();

});*/
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

//app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/recipes-api', recipesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log('in error at server----', process.env.MYSQL_PASSWORD, process.env.MYSQL_USER)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;
