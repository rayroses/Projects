import { Outlet } from 'react-router'
import './App.css'
import Header from './Header'

export async function fetchData(fetchUrl) {
  //check local storage and see if you have data matching this url before fetching that isn't older than x date
  try {
    const r = await fetch(fetchUrl);
    if (!r.ok) {
      throw new Error(`${r.status}- ${r.statusText}`);
    }
    const fetchedInfo = await r.json();
    // save fetched info to local storage matching to this url before return, include the date/time
    return fetchedInfo;
  }
  catch (e) {
    console.error(e);
  }
}
function App() {

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
