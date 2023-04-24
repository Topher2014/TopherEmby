import {useHistory} from 'react-router-dom'
// import Button from '@mui/material/Button';
import {AppBar, Toolbar, Button, Box} from '@mui/material'
import TopherEmby from '../Images/TopherEmby.png'

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
            <AppBar position='sticky' sx={{marginTop: 2}}>
            <Toolbar sx={{justifyContent: 'flex-end'}} >
            <Button sx={{color: 'primary.contrastText', marginRight: '40%'}} startIcon={<img src={TopherEmby} alt={'TopherEmby'}/>} onClick={() => history.push('/')} > </Button>
                <Button sx={{color: 'primary.contrastText', marginRight: '0px'}} onClick={() => history.push('/groups')} >  Groups </Button>
                <Button sx={{color: 'primary.contrastText', marginRight: '0px'}} onClick={() => history.push('/addrequest')} >  Add Request </Button>
                <Button sx={{color: 'primary.contrastText', marginLeft: '0px'}} onClick={() => history.push('/friendsusers')} >  Friends/Users </Button>
                <Button sx={{color: 'primary.contrastText', marginLeft: '0px'}} onClick={handleLogout} >  Logout  </Button>
            </Toolbar> 
            </AppBar>
        </Box>
    )
}

export default Nav