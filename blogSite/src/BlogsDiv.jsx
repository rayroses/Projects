
import { NavLink } from 'react-router';
import { fetchData } from './App';
import Blog from './blog.jsx'
import { useEffect, useState } from 'react';

export default  function BlogsDiv() {
    const [blogsInfo, setBlogsInfo]= useState([]);

    useEffect(()=>{
       ( async ()=>{
            const usersInfo = await fetchData('https://jsonplaceholder.typicode.com/users');
            setBlogsInfo(usersInfo);
        })()
    }, []);

    const blogsDivJsx = blogsInfo.length? blogsInfo.map((ui) => <NavLink  to={`/posts/${ui.id}/${ui.name}`}  key={ui.id}> <Blog    name={ui.name} website={ui.website} company={ui.company}/> </NavLink>): ''

    return (
        <div id="blogsDiv" >
            <h2>blogs</h2>
            <div id="blogs">
                {blogsDivJsx}
            </div>
        </div>
    )
}

