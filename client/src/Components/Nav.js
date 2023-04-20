import {useHistory} from 'react-router-dom'
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
import {List, AppBar, Toolbar, Button, Box, Container} from '@mui/material'
import index from '../index.js'
import {palette, theme} from '@mui/system'

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
        <Box sx={{bgcolor: 'primary.secondary'}}>
        {/* // <Container > */}
         {/* <Container sx={{color:'#282828'}}> */}
            <AppBar position='sticky' sx={{marginTop: 2}}>
            <Toolbar >
            <Button sx={{color: 'primary.contrastText'}} onClick={() => history.push('/')} > Topher Emby </Button>
                <Button sx={{color: 'primary.contrastText'}} onClick={() => history.push('/groups')} >  Groups </Button>
                <Button sx={{color: 'primary.contrastText'}} onClick={() => history.push('/addrequest')} >  Add Request </Button>
                <Button sx={{color: 'primary.contrastText'}} onClick={() => history.push('/friendsusers')} >  Friends/Users </Button>
                <Button sx={{color: 'primary.contrastText'}} onClick={handleLogout} >  Logout  </Button>
            </Toolbar> 
            </AppBar>
        </Box>
    )
}

export default Nav