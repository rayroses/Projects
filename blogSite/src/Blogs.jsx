
import { NavLink } from 'react-router';
import { fetchData } from './App.jsx';
import BlogInfo from './BlogInfo.jsx'
import { useEffect, useState } from 'react';

export default  function BlogList() {
    const [blogsInfo, setBlogsInfo]= useState([]);

    useEffect(()=>{
       ( async ()=>{
            const usersInfo = await fetchData('https://jsonplaceholder.typicode.com/users');
            setBlogsInfo(usersInfo);
        })()
    }, []);

    const blogListJsx = blogsInfo.length? blogsInfo.map((bi) => <NavLink  to={`/blog/${bi.id}/${bi.name}`}  key={bi.id}> <BlogInfo    name={bi.name} website={bi.website} company={bi.company}/> </NavLink>): ''

    return (
        <div id="blogsDiv" >
            <h2>blogs</h2>
            <div id="blogs">
                {blogListJsx}
            </div>
        </div>
    )
}

