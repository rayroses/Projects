import { NavLink } from 'react-router'

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" >home page</NavLink> </li>
                <li><NavLink to="/buyHome">buy a home</NavLink></li>
                <li><NavLink to="/sellHome">sell a home</NavLink></li>

            </ul>

        </nav>
    )
}
