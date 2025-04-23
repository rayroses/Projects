import { useState, useEffect } from 'react';
import Recipe from './Recipe';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import Footer from './Footer';
import Header from './Header'
import { Navigate, Routes, Route } from 'react-router'
import './App.css'

export default function App() {
  const [state, setState] = useState({
    recipes: [],
    page: 1,
    totalPages: 1,
    addingRecipe: false,
    recipeToEdit: null,
  })

  const [errorState, setErrorState] = useState({
    containsError: false,
    errorstring: null,
    errorMessage: null
  })
  useEffect(() => {
    (async () => {
      try {

        const r = await fetch(`/recipes-api?page=${state.page}&limit=9`);
        if (!r.ok) {
          // const msg = await r.text();
          throw new Error(`${r.status} - ${r.statusText}  `);
        }
        const response = await r.json();
        console.log('response: ', response)

        setState(prevState => {
          return {
            ...prevState,
            recipes: response.data,
            totalPages: response.totalPages
          }
        });
        hideError()
        setActivePagination();


      }
      catch (e) {
        console.error(e);
        setError(e.message, 'Recipes cannot be loaded at this time. Please try again later or contact the site administrator.')

      }
    })()
  }, [state.page])
  const prevPage = () => {
    if (state.page > 1) {
      setState(prevState => {
        return {
          ...prevState,
          page: prevState.page - 1
        }
      })
    }

  }
  const nextPage = () => {
    if (state.page < state.totalPages) {
      setState(prevState => {
        return {
          ...prevState,
          page: prevState.page + 1
        }
      })
    }
  }
  const getPage = (page) => {
    if (page <= state.totalPages) {
      setState(prevState => {
        return {
          ...prevState,
          page: page
        }
      })
    }

  }
  const setActivePagination = () => {
    document.querySelector('.activePage')?.classList.remove('activePage');
    document.querySelector(`#page${state.page}`)?.classList.add('activePage');

  }

  const showRecipeForm = (e, recipeToEdit) => {
    setState(prevState => {
      return {
        ...prevState,
        addingRecipe: true,
        recipeToEdit: recipeToEdit
      }
    })
  }
  const closeRecipeForm = () => {
    setState(prevState => {
      return {
        ...prevState,
        addingRecipe: false,
        recipeToEdit: null,

      }
    })
  }
  const setError = (errorString, errorMessage) => {
    setErrorState(prevErrorState => {
      return {
        ...prevErrorState,
        containsError: true,
        errorString,
        errorMessage
      }
    })
  }
  const hideError = () => {
    setErrorState(prevErrorState => {
      return {
        ...prevErrorState,
        constainsError: false,
        errorString: null,
        errorMessage: null

      }
    })
  }
  const createFormData = (recipe) => {
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('category', recipe.category);
    formData.append('ingredients', recipe.ingredients);
    formData.append('directions', recipe.directions);
    if (recipe.image) {
      formData.append('image', recipe.image);
    }
    return formData;
  }
  const addRecipe = async (recipe) => {
    let response;

    //the recipe will be sent  as just text, you cant send an image in  plain text, to send text+img binary, you must use formData
    const formData = createFormData(recipe);
    console.log('recipe: ', recipe)
    console.log('formData:  ', formData)


    try {

      response = await fetch("/recipes-api", {
        method: "POST",
        //not setting content-type to application json because recipe is formData includes strings and a file
        /* headers: {
           "Content-Type": "application/json", // Set content type to JSON
         },*/
        body: formData
      });

      if (!response.ok) {
        //const msg = await response.text();
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const responseText = await response.json()
      recipe.image = responseText.image ? responseText.image : null
      hideError()
      editRecipesArray(recipe)


    } catch (e) {
      console.error(e);
      setError(e.message, 'Recipe cannot be submitted at this time. Please try again later or contact the site administrator')

    }
    return response.ok
  }
  const editRecipe = async (recipe) => {
    let response;
    //the recipe will be sent  as just text, you cant send an image in  plain text, to send text+img binary, you must use formData
    const formData = createFormData(recipe);

    try {
      response = await fetch(`/recipes-api/${recipe.id}`, {
        method: "PUT",
        //not setting headers to application json because recipe is formData includes strings and a file
        /* headers: {
           "Content-Type": "application/json", // Set content type to JSON
         },*/
        //body: JSON.stringify(/*stringifiedRecipe*/recipe)
        body: formData
      });

      if (!response.ok) {
        //const msg = await response.text();
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const responseText = await response.json()
      recipe.image = responseText.image ? responseText.image : null
      hideError()
      editRecipesArray(recipe)

    }
    catch (e) {
      console.error("Error:", e);
      setError(e.message, 'Recipe cannot be edited due to an invalid url or server error. Please try again later or contact the site administrator')
    }

    return response.ok
  }
  const editRecipesArray = (recipe) => {
    const newRecipes = [...state.recipes];
    if (!recipe.id) {
      recipe.id = newRecipes[newRecipes.length - 1].id + 1
      newRecipes.push(
        recipe
      )
    }
    else {
      let recipeIndex = newRecipes.findIndex(r => r.id === recipe.id);
      newRecipes[recipeIndex] = recipe
    }

    setState(prevState => {
      return {
        ...prevState,
        recipes: newRecipes
      }
    });

  }



  return (
    <>
      <Header showRecipeForm={showRecipeForm} />
      {state.addingRecipe && (
        <RecipeForm
          closeForm={closeRecipeForm}
          addRecipe={addRecipe}
          recipeToEdit={state.recipeToEdit}
          editRecipe={editRecipe}
          error={
            { errorString: errorState.errorString, errorMessage: errorState.errorMessage }
          }
        />
      )}
      <Routes>
        <Route index="true" element={<RecipeList prevPage={prevPage} nextPage={nextPage} getPage={getPage} totalPages={state.totalPages} page={state.page} errorString={errorState.errorString} errorMessage={errorState.errorMessage} hideError={hideError} recipes={state.recipes} />} />
        <Route path="/:id" element={<Recipe recipes={state.recipes} showRecipeForm={showRecipeForm} errorString={errorState.errorString} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />

    </>
  )
}

