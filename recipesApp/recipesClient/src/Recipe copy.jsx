//import './Recipe.css';
import ListComponent from './ListComponent';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './Recipe.css'
import ErrorElem from './Error.jsx'
// in this version of recipe im using the /id endpoint on the server and fetching the recipe only instead of getting recipes passed as props
export default function Recipe(props) {
  const { /*recipes, */ showRecipeForm, /*errorString = undefined*/ } = props
  const [pictureShowing, togglePictureShowing] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError]=useState({errorString:null, errorMessage:null})
  useEffect(() => {
    (async () => {
      try {

        const r = await fetch(`http://localhost:3001/recipes-api/${id}`);
        if (!r.ok) {
          // const msg = await r.text();
          throw new Error(`${r.status} - ${r.statusText}  `);
        }
        const response = await r.json();
        console.log('response: ', response)

        setRecipe(response);


      }
      catch (e) {
        console.error(e);
        setError(e.message, 'Recipe cannot be loaded at this time. Please try again later or contact the site administrator.')

      }
    })()
  }, [])


  const togglePicture = () => {
    togglePictureShowing(!pictureShowing);
  }
  //const recipe = recipes?.find(r => r.id === Number(id));

  const recipeJsx = recipe ?
    <div className="recipe">
      <h2>{recipe.name}</h2>
      <div id="pictureDiv">
        {pictureShowing ? <img src={recipe.image ? `http://localhost:3001${recipe.image}` : '/defaultImg.png'} /> : null}
        <br />
        <button id="showHidePicture" onClick={togglePicture}>{pictureShowing ? 'hide picture' : 'show picture'}</button>
      </div>
      <ListComponent name="ingredients" list={recipe.ingredients} />
      <ListComponent name="directions" list={recipe.directions} />
      <button onClick={(e) => { showRecipeForm(e, recipe) }}>edit recipe</button>
    </div>
    : /*errorString ? <ErrorElem errorString={errorString} errorMessage={'Recipe cannot be loaded due to an invalid url or server error. Please try again later or contact the site administrator'} />*/
    error.errorMessage? <ErrorElem errorString={error.errorString} errorMessage={error.errorMessage} />

      : <div>loading...</div>
  return (


    recipeJsx
  )
}
Recipe.propTypes = {

 /* recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    directions: PropTypes.string.isRequired,
    image: PropTypes.string
  })).isRequired, */

  showRecipeForm: PropTypes.func/*.isRequired*/


}