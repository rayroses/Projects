import { NavLink } from 'react-router'
import { PropTypes } from 'prop-types'
import RecipeInfo from './RecipeInfo';
import './RecipeList.css'
import Pagination from './Pagination';
import ErrorElem from './Error'

export default function RecipeList(props) {
  const { recipes, prevPage, nextPage, getPage, page, totalPages, hideError, errorString, errorMessage } = props;

  return (
    <div id="recipes"  >
      <h1>Recipes</h1>
      {errorString ?
        <ErrorElem hideError={hideError} errorString={errorString} errorMessage={errorMessage} />
        : <div id="recipeInfos" >
          {recipes.length ?
            recipes.map(r =>
              <NavLink className='recipeInfo' to={`recipe/${r.id}`} key={r.id}>
                <RecipeInfo name={r.name} category={r.category} image={r.image} />
              </NavLink>
            )
            : <div>loading....</div>}
        </div>}
      {recipes.length ? <Pagination prevPage={prevPage} nextPage={nextPage} getPage={getPage} page={page} totalPages={totalPages} /> : null}
    </div>
  )
}
RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    directions: PropTypes.string.isRequired,
    image: PropTypes.string

  })),
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  getPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  errorString: PropTypes.string,
  errorMessage: PropTypes.string,
  hideError: PropTypes.func
}