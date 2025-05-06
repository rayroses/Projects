//import './Recipe.css';
import ListComponent from './ListComponent';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useParams } from 'react-router';
import './Recipe.css'
import ErrorElem from './Error.jsx'

export default function Recipe(props) {
  const { recipes, showRecipeForm, errorString = undefined } = props
  const [pictureShowing, togglePictureShowing] = useState(true);
  const { id } = useParams();


  const togglePicture = () => {
    togglePictureShowing(!pictureShowing);
  }
  const recipe = recipes?.find(r => r.id === Number(id));

  const recipeJsx = recipe ?
    <div className="recipe">
      <h2>{recipe.name}</h2>
      <div id="pictureDiv">
        {pictureShowing ? <img src={recipe.image ? `${recipe.image}` : '/defaultImg.png'} /> : null}
        <br />
        <button id="showHidePicture" onClick={togglePicture}>{pictureShowing ? 'hide picture' : 'show picture'}</button>
      </div>
      <ListComponent name="ingredients" list={recipe.ingredients} />
      <ListComponent name="directions" list={recipe.directions} />
      <button onClick={(e) => { showRecipeForm(e, recipe) }}>edit recipe</button>
    </div>
    : errorString ? <ErrorElem errorString={errorString} errorMessage={'Recipe cannot be loaded due to an invalid url or server error. Please try again later or contact the site administrator'} />
      : <div>loading...</div>
  return (
    recipeJsx
  )
}
Recipe.propTypes = {

  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    directions: PropTypes.string.isRequired,
    image: PropTypes.string
  })).isRequired,
  showRecipeForm: PropTypes.func


}