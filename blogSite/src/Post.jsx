
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchData } from './App';
import Comments from './Comments';

export default function Post(props) {
    const [commentsState, toggleComments] = useState(false);
    const [divClass, setClass] = useState('');
    let [comments, setComments] = useState([]);



    useEffect(() => {
        if (commentsState) {
            setClass('showingComments')

        }
        else {
            setClass('')
        }

    }, [commentsState])

    const updateComments = (comments) => {
        setComments(comments)
    }

    const handleButtonClicked = () => {
        toggleComments(!commentsState);
    }

    const buttonText = commentsState ? 'hide comments' : 'show comments'
    const commentsJsx = commentsState ? <Comments comments={comments} setComments={updateComments} postId={props.postId} /> : null


    return (

        <div className={`post ${divClass}`}>
            <div id="mainPostBody">
                <h3>{props.postTitle}</h3>
                <p>{props.postBody}</p>
                <button className='showHideComments' onClick={handleButtonClicked}>{buttonText}</button>
            </div>
            <div className={`comments ${divClass}`}>
                {commentsJsx}
            </div>
        </div>

    )
}
Post.propTypes = {
    postId: PropTypes.number.isRequired,
    postTitle: PropTypes.string.isRequired,
    postBody: PropTypes.string.isRequired
}
