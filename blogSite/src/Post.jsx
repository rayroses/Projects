
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchData } from './App';

export default function Post(props) {
    const [commentsState, toggleComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [postClass, setPostClass] = useState('post');
    
    const setClass = (pClass) => {
        setPostClass(`post ${pClass}`);
    }
    useEffect(() => {
        (async () => {
            const comments = await fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${props.postId}`);
            setComments(comments);
        })();
    }, [])
    useEffect(() => {
        if (commentsState) {
            setClass('commentsClicked')

        }
        else {
            setClass('post')
        }

    }, [commentsState])



    const handleButtonClicked = () => {
        toggleComments(!commentsState);
    }

    const buttonText = commentsState ? 'hide comments' : 'show comments'
    const commentsDivJsx = commentsState ?
        <div className='commentsDiv'>
            {comments.map(c => <div className='comment' key={c.id}><h3>{c.name}</h3> <p>{c.body}</p></div>)}
        </div> : null
    return (

        <div className={postClass}>
            <div id="mainPostBody">
                <h3>{props.postTitle}</h3>
                <p>{props.postBody}</p>
                <button className='showHideComments' onClick={handleButtonClicked}>{buttonText}</button>
            </div>
            {commentsDivJsx}
        </div>

    )
}
Post.propTypes = {
    postId: PropTypes.number.isRequired,
    postTitle: PropTypes.string.isRequired,
    postBody: PropTypes.string.isRequired
}
