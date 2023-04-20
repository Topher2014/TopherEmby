import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Requests from './Requests'
import GroupUsers from './GroupUsers'
import {Button, ListItem, List, Container, Box, TextField, Typography} from '@mui/material';

function Groups({groups, fetchGroups, user}){
    useEffect(() => {fetchGroups()}, [])
    const [groupID, setGroupID] = useState(null)
    const [showUsers, setShowUsers] = useState(null)
    const [initial, setInitial] = useState(true)
    const history = useHistory()
    // const [buttonState, setButtonState] = useState(initalState)
    // const initialState = {group1: false}
    // setButtonState
    function handleClick() {
        fetchGroups()
        setShowUsers((toggle) => !toggle)
    }
    const users = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.group_id === groupID).map(group => group.users)
    // const buttonText = showUsers ? <button onClick={handleClick} > Show Requests </button> : <button onClick={handleClick} > Show Users </button>
    const buttonText = showUsers ? <Button onClick={handleClick} > Show Requests </Button> : <Button onClick={handleClick} > Show Users </Button>
    const initalButtonText = !initial ? buttonText : null
    const renderInfo = showUsers ? <GroupUsers users={users} user={user} /> : <Requests groupID={groupID} /> 
    const initialRenderInfo = !initial ? renderInfo : null

    const renderGroups = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.user_id === user.id).map(group => {

        return (
            <Container key={group.groups.id} >
            <List className='groupcard' >
                <Button onClick={() => {setGroupID(group.groups.id); setInitial(false)}} > {group.groups.name} </Button>
                {/* <div>
                {group.groups.name} 
                </div>
                <button onClick={() => {setGroupID(group.groups.id); handleClick()}} > {buttonText} </button> */}
            </List>
            </Container>
            )
    })

    return (
        <Container>
            <Typography>Groups</Typography>
            {/* <Link to={`/editgroups`}> Edit Groups </Link> */}
            <Button onClick={() => history.push('/editgroups')} > Edit Groups </Button>
            {initalButtonText}
            <Box className='groupscontainer'> {renderGroups} </Box>
            {initialRenderInfo}
        </Container>
    )
}

export default Groups