import { useEffect, useState } from 'react';
import Property from './Property'

export default function BuyHome() {
  
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const r = await fetch('./properties.json');
                /*the previous line fetches properties from a json file. to fetch from a db:
                const r= await fetch('http://localhost:3003/')*/
                if (!r.ok) {
                    throw new Error(`${r.status}- ${r.statusText}`)
                }
                const properties = await r.json();
                setProperties(properties)

            }
            catch (e) {
                console.error(e)
            }
        })();
    }, [])
    const propertiesJsx = properties.length ?
        <div>
            {properties.map((p, index) =>
                <Property key={index} address={p.address} price={p.price} imgSrc={p.imgSrc} />)
            }
            <p>images from <a href="https://www.pexels.com/search/property/">pexels</a></p>
        </div> : ""
    return (
        <div className="buyHome">
            <h2>buy one of our beautiful properties</h2>
            {propertiesJsx}
        </div>
    )
}
