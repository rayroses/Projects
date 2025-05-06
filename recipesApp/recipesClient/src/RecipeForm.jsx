import './recipeForm.css'
import PropTypes from 'prop-types';
import { useState } from 'react';
import ErrorElem from './Error'

export default function RecipeForm(props) {
    const { name, category, ingredients, directions, image } = props.recipeToEdit || {}
    const [state, setState] = useState(
        {
            id: props.recipeToEdit?.id || '',
            name: name || '',
            category: category || '',
            ingredients: ingredients || '',
            directions: directions || '',
            image: image || ''
        }
    )
    const [showError, setShowError] = useState(false)
    const { closeForm, addRecipe, editRecipe, error } = props;
    const { errorString, errorMessage } = error || {};


    const handleInputChange = e => {
        const { name, value, files, type } = e.target;

        if (type === 'file') {
            setState(prev => ({ ...prev, [name]: files[0] })); // store the File object
        } else {
            setState(prev => ({ ...prev, [name]: value }));
        }
    }
    const handleClear = () => {
        setState({
            name: '',
            category: '',
            ingredients: '',
            directions: '',
            image: ''
        })
    }
    const handleRecipeSubmit = async e => {
        let completed;
        e.preventDefault();
        if (error.errorMessage) {
            setShowError(true)
        }
        if (props.recipeToEdit) {
            completed = await editRecipe(state);
        }
        else {
            completed = await addRecipe(state);
        }
        if (completed) {
            closeForm();
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleRecipeSubmit} encType='multipart/form-data'>
                    <span className="close" onClick={closeForm}>&times;</span>
                    <h3>Enter recipe information</h3>
                    <h4>name :</h4>  <input name="name" type="text" onChange={handleInputChange} value={state.name} required minLength={2} />
                    <label htmlFor="category"><h4>category :</h4></label>
                    <select name="category" id="category" onChange={handleInputChange} value={state.category} required>
                        <option hidden></option>
                        <option value="mains">mains</option>
                        <option value="soups">soups</option>
                        <option value="salads">salads</option>
                        <option value="sides">sides</option>
                        <option value="desserts">desserts</option>
                        <option value="drinks">drinks</option>
                    </select>
                    <h4>ingredients :</h4> <input name="ingredients" type="text" onChange={handleInputChange} value={state.ingredients} required />
                    <h4>directions :</h4> <input name="directions" type="text" onChange={handleInputChange} value={state.directions} required />
                    <h4>image :</h4><input name="image" type="file" onChange={handleInputChange} />
                    {showError ? <ErrorElem errorString={errorString} errorMessage={errorMessage} /> : null}
                    <div>
                        <button type="reset" onClick={handleClear}>clear</button>
                        <button type="submit">{props.recipeToEdit ? 'edit' : 'submit recipe'}</button>

                        <button type="button" onClick={closeForm}>cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )


}
RecipeForm.propTypes = {
    recipeToEdit: PropTypes.object,
    closeForm: PropTypes.func.isRequired,
    addRecipe: PropTypes.func.isRequired,
    editRecipe: PropTypes.func.isRequired,
    error: PropTypes.object
}
