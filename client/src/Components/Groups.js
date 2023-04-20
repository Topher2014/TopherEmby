import { useEffect, useState } from 'react'
import {useHistory } from 'react-router-dom'
import Requests from './Requests'
import GroupUsers from './GroupUsers'
import {Button, List, Container, Box, Typography} from '@mui/material';

function Groups({groups, fetchGroups, user}){
    useEffect(() => {fetchGroups()}, [])
    const [groupID, setGroupID] = useState(null)
    const [showUsers, setShowUsers] = useState(null)
    const [initial, setInitial] = useState(true)
    const history = useHistory()
    function handleClick() {
        fetchGroups()
        setShowUsers((toggle) => !toggle)
    }
    const users = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.group_id === groupID).map(group => group.users)
    const buttonText = showUsers ? <Button onClick={handleClick} > Show Requests </Button> : <Button onClick={handleClick} > Show Users </Button>
    const initalButtonText = !initial ? buttonText : null
    const renderInfo = showUsers ? <GroupUsers users={users} user={user} /> : <Requests groupID={groupID} /> 
    const initialRenderInfo = !initial ? renderInfo : null

    const renderGroups = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.user_id === user.id).map(group => {

        return (
            <Container key={group.groups.id} >
            <List className='groupcard' >
                <Button onClick={() => {setGroupID(group.groups.id); setInitial(false)}} > {group.groups.name} </Button>
            </List>
            </Container>
            )
    })

    return (
        <Container sx={{ 
            // ml: 50, 
            // bgcolor: 'red',
            // borderRadius: '555%',
            // width: 15,
            // height: 25,
            // display: 'flex',
            // position: 'absolute',
            // zIndex: 'modal',
            // bottom: 0,
            // alignItems:'center',
            // justifyContent: 'center'               
        //   }}
            // marginTop: 8,
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
        }}>
        <br></br>
            <Typography sx={{marginTop: 8}}>Groups</Typography>
            <Button  onClick={() => history.push('/editgroups')} > Edit Groups </Button>
            {initalButtonText}
            <Box className='groupscontainer'> {renderGroups} </Box>
            {initialRenderInfo}
        </Container>
    )
}

export default Groups