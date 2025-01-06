import { Outlet } from 'react-router'
import './App.css'
import Header from './Header'

export async function fetchData(fetchUrl) {
  try {
    const r = await fetch(fetchUrl);
    if (!r.ok) {
      throw new Error(`${r.status}- ${r.statusText}`);
    }
    const fetchedInfo = await r.json();
    return fetchedInfo;
  }
  catch (e) {
    console.error(e);
  }
}
function App() {

  //<MyContext.provider/> is a way to pass the fetchData param to all <Outlet> components
  return (
    <>
      <Header />
      <div className="outlet">
        <Outlet />
      </div>

    </>
  )
}

export default App
