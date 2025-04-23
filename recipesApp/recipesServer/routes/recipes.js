import express from 'express';
const router = express.Router();
import connectionPool from '../pool.js';
import multer from "multer";
import processRecipeImage from './utils.js'
import joi from 'joi';
import { validateRecipeInputs } from './utils.js';
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});
export const recipeSchema = joi.object({
  name: joi.string().required(),
  category: joi.string().required(),
  ingredients: joi.string().required(),
  directions: joi.string().required()
});

router.get('/', async function (req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const itemsPerPage = Number(req.query.limit) || 9;
    const [response] = await connectionPool.execute(
      'SELECT * FROM recipes'
    );
    const totalPages = Math.ceil(response.length / itemsPerPage);
    const currentIndex = (page - 1) * itemsPerPage;
    const limitedResponses = response.slice(currentIndex, currentIndex + itemsPerPage);
    res.json({ data: limitedResponses, totalPages: totalPages });
  }
  catch (err) {
    next(err.message);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const [response] = await connectionPool.execute(
      'SELECT name, category, ingredients, directions, image FROM recipes WHERE id=?', [req.params.id]
    );
    console.log(response)
    //automatically responds with a 200 ok status code
    //response is an array with one recipe in it
    res.send(response[0]);
  }
  catch (err) {
    next(err);
  }
});
router.post('/', upload.single('image'), async (req, res, next) => {
  const { name, category, ingredients, directions } = req.body;
  try {
    validateRecipeInputs(req.body)
    const response = await connectionPool.execute(
      'INSERT INTO recipes (name, category, ingredients, directions) VALUES (?,?,?,?)', [name, category, ingredients, directions]
    );
    //response is an array and the first index is an object with info about the post 
    const insertedId = response[0].insertId;
    if (req.file) {
      const publicPath = await processRecipeImage({
        buffer: req.file.buffer,
        originalName: req.file.originalname,
        recipeName: name,
        recipeId: insertedId
      });
      await connectionPool.execute(
        'UPDATE recipes SET image = ? WHERE id = ?', [publicPath, insertedId]
      );
      req.body.image = publicPath;
    }
    else {
      const res = await connectionPool.execute(
        'UPDATE recipes SET image = ? WHERE id = ?', ['/public/images/defaultImg.png', insertedId]
      );
      req.body.image = '/public/images/defaultImg.png';
    }
    req.body.id = insertedId;
    res.status(201).location(`/recipes-api/${insertedId}`).send(req.body);
  }
  catch (err) {
    next(err);
  }
});
router.put('/:id', upload.single('image'), async (req, res, next) => {
  const { name, category, ingredients, directions } = req.body;
  const recipeId = req.params.id;

  try {
    validateRecipeInputs(req.body)
    const [response] = await connectionPool.execute(
      'UPDATE  recipes SET name=?, category=?, ingredients=?, directions=? WHERE id=?', [name, category, ingredients, directions, recipeId]
    );
    console.log(response)
    if (!response.affectedRows) {
      return res.status(404).send(`unable to find recipe with id of ${recipeId}`);
    }
    if (req.file) {
      const publicPath = await processRecipeImage({
        buffer: req.file.buffer,
        originalName: req.file.originalname,
        recipeName: name,
        recipeId: recipeId
      });
      await connectionPool.execute(
        'UPDATE recipes SET image = ? WHERE id = ?', [publicPath, recipeId]
      );
      req.body.image = publicPath;
    }
    else {
      const res = await connectionPool.execute(
        'UPDATE recipes SET image = ? WHERE id = ?', ['/public/images/defaultImg.png', recipeId]
      );
      req.body.image = '/public/images/defaultImg.png';

    }
    req.body.id = parseInt(recipeId);
    res.status(200).send(req.body);
  }
  catch (err) {
    console.log(err)
    next(err);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const [response] = await connectionPool.execute(
      'DELETE FROM  recipes WHERE id=?', [req.params.id]
    );
    if (!response.affectedRows) {
      return res.status(404).send(`unable to find recipe with id of ${req.params.id}`);
    }
    //automatically calls res.end();
    res.sendStatus(204);
  }
  catch (err) {
    next(err);
  }
});

export default router;
