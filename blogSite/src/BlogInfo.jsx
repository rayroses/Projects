import { PropTypes } from 'prop-types'

export default function BlogInfo(props) {
    const { name, website, company } = props;

    return (
        <div className='blog' >
            <p>{name}</p>
            <a className="anchorInBlog" >{website}</a>
            <p>{company.name}</p>
            <p>{company.catchPhrase}</p>
            <p>{company.bs}</p>
        </div>
    )
}
BlogInfo.propTypes = {
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    company: PropTypes.shape({
        name: PropTypes.string.isRequired,
        catchPhrase: PropTypes.string.isRequired,
        bs: PropTypes.string.isRequired
    }).isRequired
}
