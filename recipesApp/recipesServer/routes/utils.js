import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { recipeSchema } from './recipes.js';

export default async function processRecipeImage({ buffer, originalName, recipeName, recipeId }) {
    const ext = path.extname(originalName).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
        const error = new Error("Only .jpg or .jpeg files are allowed");
        error.status = 415;
        throw error;
    }

    const safeFileName = `${recipeName}-${recipeId}.jpg`.replaceAll(' ', '-');
    const targetPath = path.join('uploads', safeFileName);
    const publicPath = `/uploads/${safeFileName}`;

    await sharp(buffer)
        .resize(400, 307)
        .toFile(targetPath);

    return publicPath;
}
export  function validateRecipeInputs({name, category, ingredients,  directions}){
    const { error } = recipeSchema.validate({ name: name, category: category, ingredients: ingredients, directions: directions }, { abortEarly: false });
    if (error) {
      error.status = 422;
      throw error;
    }
}