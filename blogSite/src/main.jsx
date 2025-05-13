import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Blogs from './Blogs.jsx'
import Blog from './Blog.jsx'

import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element=<App /> >
        <Route index='true' element=<Blogs /> />
        <Route path='/blogs' element=<Blogs /> />
        <Route path='blog/:blogId/:usersName' element=<Blog/> />
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>,
)
