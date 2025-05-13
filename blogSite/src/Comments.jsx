import { useEffect } from 'react';
import { fetchData } from './App';
import PropTypes from 'prop-types';


export default function Comments(props) {
    const { comments, setComments, postId } = props

    useEffect(() => {
        (async () => {
            if (!comments?.length) {
                const fetchedComments = await fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                setComments(fetchedComments);
            }
        })();
    }, [postId, comments, setComments]);
    const commentsJsx = comments?.length ?
        comments.map(c => (
            <div className="comment" key={c.id}>
                <h3>
                    {c.name}
                </h3>
                <p>
                    {c.body}

                </p>
            </div>))
        : null

    return (
        <>{commentsJsx}</>
    )
}
Comments.propTypes = {
    postId: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    setComments: PropTypes.func

}