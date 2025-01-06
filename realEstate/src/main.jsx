import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import BuyHome from './BuyHome.jsx'
import SellHome from './sellHome.jsx'
import Home from './Home.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<App />>
          <Route index={true} element=<Home /> />
          <Route path="/buyHome" element=<BuyHome /> />
          <Route path="/sellHome" element=<SellHome /> />
          <Route path="*" element=<h2>404</h2> />
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
