import { useEffect, useState } from 'react'
import {useHistory } from 'react-router-dom'
import Requests from './Requests'
import GroupUsers from './GroupUsers'
import {Button, List, Container, Box, Typography, MenuItem, TextField} from '@mui/material';
import { styled } from '@mui/system';

function Groups({groups, fetchGroups, user}){
    useEffect(() => {fetchGroups()}, [])
    const [groupID, setGroupID] = useState(null)
    const [showUsers, setShowUsers] = useState(null)
    const [initial, setInitial] = useState(true)
    const [label, setLabel] = useState('Select a group...')
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
            <MenuItem   key={group.groups.id} onClick={() => {setGroupID(group.groups.id); setInitial(false); setLabel(group.groups.name)}} > {group.groups.name}  </MenuItem>
        )
    })

    return (
        <Container >
            <Typography >Groups</Typography>
            <Button onClick={() => history.push('/editgroups')}> Edit Groups </Button>
            <TextField label={label} select name='group_id' >
              {renderGroups}
            </TextField>
            {initalButtonText}
            {initialRenderInfo}
        </Container>
    )
}

export default Groups