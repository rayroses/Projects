
import { NavLink } from 'react-router'

export default function Navbar() {
    return (
        <NavLink to='/blogList'>
            <a id="blogsLink">blogs</a>
        </NavLink>
    )
}
