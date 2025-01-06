import { useParams } from 'react-router'
import { fetchData } from './App';
import { useEffect, useState } from 'react';
import Post from './Post'

export default function PostsDiv() {
  const { blogId, usersName} = useParams();
  const [postsInfo, setPostsInfo]= useState([]);
  useEffect(() => {
    (async () => {
      const postsInfo = await fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${blogId}`);
      setPostsInfo(postsInfo);

    })();

  }, [])
  const postsDivJsx = postsInfo.length ? postsInfo.map((pi, index) => <Post   key={index} postTitle={pi.title} postBody={pi.body} postId={pi.id} /> ) : ''
  return (
    <div id='postsDiv'>
        <h2>Posts from {usersName}</h2>
        <div id="posts">
        {postsDivJsx}
        </div>
    </div>
  )
}
