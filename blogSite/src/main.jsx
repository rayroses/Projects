import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BlogList from './BlogList.jsx'
import Blog from './Blog.jsx'

import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element=<App /> >
        <Route index='true' element=<BlogList /> />
        <Route path='/blogList' element=<BlogList /> />
        <Route path='blog/:blogId/:usersName' element=<Blog /> />
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>,
)
