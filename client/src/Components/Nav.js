import {useHistory} from 'react-router-dom'
import {AppBar, Toolbar, Button, Box, Stack} from '@mui/material'
import TopherEmby from '../Images/TopherEmby.png'

function Nav({updateUser}) {
    const history = useHistory()
    const handleLogout = () => {
        fetch('/dblogout', {
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
            <Toolbar sx={{justifyContent: 'space-between'}} >
                <Box sx={{flexGrow: 1}}>
                    <Button sx={{color: 'primary.contrastText'}} startIcon={<img src={TopherEmby} alt={'TopherEmby'} style={{marginTop: '-14px', marginBottom: '-14px'}} />} onClick={() => history.push('/')} > </Button>
                </Box>
            <Box sx={{display: 'flex',flexWrap: 'wrap',flexDirection: {xs:'column', sm:'row'}}}>
                <Button sx={{color: 'primary.contrastText', fontSize: {xs:'12px',sm:'14px'}, my:.2,py:0}} onClick={() => history.push('/about')} > About </Button>
                <Button sx={{color: 'primary.contrastText', fontSize: {xs:'12px',sm:'14px'}, my:.2,py:0}} onClick={() => history.push('/groups')} >  Groups </Button>
                <Button sx={{color: 'primary.contrastText', fontSize: {xs:'12px',sm:'14px'}, my:.2,py:0}} onClick={() => history.push('/addrequest')} >  Add Request </Button>
                <Button sx={{color: 'primary.contrastText', fontSize: {xs:'12px',sm:'14px'}, my:.2,py:0}} onClick={() => history.push('/friendsusers')} >  Friends/Users </Button>
                <Button sx={{color: 'primary.contrastText', fontSize: {xs:'12px',sm:'14px'}, my:.2,py:0}} onClick={handleLogout} >  Logout  </Button>
            </Box>
            </Toolbar> 
            </AppBar>
        </Box>
    )
}

export default Nav