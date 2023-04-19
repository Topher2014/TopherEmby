import { NavLink, useHistory } from 'react-router-dom'
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';


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
        // <ThemeProvider theme={theme}>
        <nav className = 'navigation'>
            <NavLink className='brand-name' exact to='/'>
                <strong> Topher Emby </strong>
            </NavLink>
            <ul>
                <li onClick={handleLogout}> <NavLink exact to='/logout'> Logout </NavLink> </li>
                <li> <NavLink exact to='/groups'> Groups </NavLink> </li>
                <li> <NavLink to='/addrequest'> Add Request </NavLink> </li>
                <li> <NavLink to='/friendsusers'> Friends/Users </NavLink> </li>
            </ul>
        </nav>

        // </ThemeProvider>
    )
}

export default Nav