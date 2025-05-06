import { PropTypes } from 'prop-types';
import './RecipeInfo.css'

export default function RecipeInfo(props) {
    const { name, category, image } = props;
    const imgJsx = image ? <img src={`${image}`} /> : <img src='public/images/defaultImg.png' />

    return (
        <>
            <div className='imgInRecipeInfo'>
                {imgJsx}
            </div>
            <p>{name}</p>
            <p className='category'>{category}</p>
        </>
    )
}
RecipeInfo.propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}
