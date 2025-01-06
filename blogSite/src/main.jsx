import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BlogsDiv from './BlogsDiv.jsx'
import PostsDiv from './PostsDiv.jsx'

import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element=<App /> >
          <Route index='true' element=<BlogsDiv/> />
          <Route path='/blogsDiv' element=<BlogsDiv  /> />
          <Route path='posts/:blogId/:usersName' element=<PostsDiv /> />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
