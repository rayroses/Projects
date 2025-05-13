import { PropTypes } from 'prop-types'

export default function BlogInfo(props) {
    const { name, website, company } = props;

    return (
        <div className='blogInfo' >
            <p>By: {name}</p>
            <p>website: <a className="anchorInBlogInfo" >{website}</a></p>
            <p>company: {company.name}</p>
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
