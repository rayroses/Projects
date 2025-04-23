import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import RecipeList from './RecipeList.jsx'
import Recipe from './Recipe.jsx'
import 'bootstrap/dist/css/bootstrap.css';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Routes>
      <Route path="/" element={<App/>}>
      <Route index="true" element={<RecipeList/>}/> 
      <Route path="addRecipe" element={<AddRecipeForm/>}/>
      <Route path="recipe/:id" element={<Recipe/>}/> 
      </Route>
    </Routes>*/}
      <App />
    </BrowserRouter>

  </StrictMode>,
)