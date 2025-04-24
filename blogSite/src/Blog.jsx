import { useParams } from 'react-router'
import { fetchData } from './App';
import { useEffect, useState } from 'react';
import Post from './Post'

export default function Blog() {
  const { blogId, usersName } = useParams();
  let [postsInfo, setPostsInfo] = useState([]);
  useEffect(() => {
    (async () => {
      const postsInfo = await fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${blogId}`);
      setPostsInfo(postsInfo);

    })();

  }, [blogId])
  const postsDivJsx = postsInfo.length ? postsInfo.map((pi, index) => <Post key={index} postTitle={pi.title} postBody={pi.body} postId={pi.id} />) : ''
  return (
    <div id='blogDiv'>
      <h2>Posts from {usersName}</h2>
      <div id="posts">
        {postsDivJsx}
      </div>
    </div>
  )
}
