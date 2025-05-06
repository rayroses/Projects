import './ListComponent.css';
import PropTypes from 'prop-types'

export default function ListComponent(props) {
  let { name, list } = props;
  if (typeof list === 'string') {
    list = list.split(',')
  }
  return (
      <div id={name}>
      <h5>{name}:</h5>
        <ul className="bulletless item">
          {list.map((i, index) => <li key={index}>{i}</li>)}
        </ul>
      </div>

  )
}
ListComponent.propTypes = {
  name: PropTypes.string,
  list: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
}