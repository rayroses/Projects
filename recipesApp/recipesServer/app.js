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

app.locals.__dirname = __dirname;

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
app.use('/recipes-api', (req, res, next) => {
  const err = new Error(`API route not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

app.get('*', (req, res) => {
  if (req.method !== 'GET') return next(); 
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  console.log('in error at server')
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});



export default app;
