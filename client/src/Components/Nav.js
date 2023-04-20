import {  NavLink, useHistory, Route} from 'react-router-dom'
// import {Route} from 'react-router'
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Home from './Home';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
// import { Button } from 'bootstrap';
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

        <Container>
            <Button onClick={() => history.push('/')} > Topher Emby </Button>

            <List>
                <Button onClick={handleLogout} >  Logout  </Button>
                <Button onClick={() => history.push('/groups')} >  Groups </Button>
                <Button onClick={() => history.push('/addrequest')} >  Add Request </Button>
                <Button onClick={() => history.push('/friendsusers')} >  Friends/Users </Button>
            </List>
        </Container>


    )
}

export default Nav