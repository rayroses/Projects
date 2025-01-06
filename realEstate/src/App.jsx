
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './Navbar'

function App() {

  return (
    <>
      <Navbar />
      <header>
        <h1>Real Estate</h1>
      </header>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  )
}
export default App
