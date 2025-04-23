import {NavLink} from 'react-router'
import { PropTypes } from 'prop-types'
import './header.css'

export default function Header(props) {
    return (
        <header >
            <button type="button" className="addRecipeButton" onClick={(e)=>props.showRecipeForm(e)}>Add Recipe</button>
                <h1>Recipes App</h1>
                <NavLink to={'/'}>Reicpes</NavLink>
        </header>
    )
}
Header.propTypes = {
showRecipeForm: PropTypes.func/*.isRequired*/
}