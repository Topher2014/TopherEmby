import { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

function Nav({updateUser}) {
    const history = useHistory()
    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
        }).then(res => {
            if(res.ok) {
                updateUser(null)
                history.push('/authentication')
            }
        })
    }

    return (
        <nav className = 'navigation'>
            <NavLink className='brand-name' exact to='/'>
                <strong> Topher Emby </strong>
            </NavLink>
            <ul>
                <li onClick={handleLogout}> <NavLink exact to='/logout'> Logout </NavLink> </li>
                <li> <NavLink exact to='/groups'> Groups </NavLink> </li>
                <li> <NavLink to='/addrequest'> Add Request </NavLink> </li>
            </ul>
        </nav>
    )
}

export default Nav