import './Error.css'
import {PropTypes} from 'prop-types'
export default function Error(props) {
    return (
        <div id="error" >
          <p>{props.errorMessage}</p>
            <p >status: {props.errorString?.message || props.errorString}</p>
        </div>
    )
}
Error.propTypes={
    errorMessage:PropTypes.string.isRequired,
    errorString:PropTypes.string.isRequired

}