import { PropTypes } from 'prop-types'

export default function Property(props) {
  const { street, city, state, zip } = props.address
  return (
    <div className="property">
      <div className="text">
        <h3>Address:</h3>
        <p>{street}</p>
        <p>{`${city} ${state}, ${zip}`}</p>
        <h3>Price:</h3>
        <p>{props.price}</p>
      </div>
      <img src={props.imgSrc} alt="" />

    </div>
  )
}
Property.propTypes = {
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired
  }).isRequired,
  price: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
}
