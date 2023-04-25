import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Button, ListItem, List, Container, Typography, Chip} from '@mui/material';
import { styled } from '@mui/system';

  const EditButton = styled(Button)({
    margin: '16px 0',
    fontWeight: 'bold',
    color: 'white',
    background: '#2e7d32',
    '&:hover': {
      background: '#1b5e20',
    },
  });

function AddDelUsers({users, fetchUsers, user, groups, fetchGroups}) {
    const {groupId} = useParams()
    // eslint-disable-next-line
    useEffect(() => {fetchUsers(); fetchGroups()}, [])

    function handleAddClick(user_id, group_id){
        fetch(`/dbgroupusers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user_id, group_id: group_id}),
        })
            window.location.reload(true)
    }

    function handleDeleteClick(user_id, group_id){
        fetch(`/dbgroupusers`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user_id, group_id: group_id}),
        })
            window.location.reload(true)
    }

    const groupIDs = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroup => filteredGroup.group_id === parseInt(groupId)).map(group => group.user_id)
    const addUsers = user.friends.map((user) => {
        if (groupIDs.includes(user.id)){
            return null
            }
        return (
            <Container key={user.id} >
            <List className='usercard' >
                <Chip color='primary' label={user.name} onClick={() => handleAddClick(user.id, groupId)} />
            </List>
            </Container>
        )
    })
    const removeUsers = users.map((thisUser) => {
        if(user.id === thisUser.id){
            return null
        }
        if (!groupIDs.includes(thisUser.id)){
            return null
            }
        return (
            <Container key={thisUser.id} >
                <List className='usercard' >
                    <ListItem>
                        <Chip color='primary' label={thisUser.name} onDelete={() => handleDeleteClick(thisUser.id, groupId)} />
                    </ListItem>
                </List>
            </Container>
        )
    })
    const [showFriends, setShowFriends] = useState(false)
    function handleClick() {
        setShowFriends((toggle) => !toggle)
    }
    const buttonText = showFriends ? <EditButton onClick={handleClick} > Add Friends to Group </EditButton> : <EditButton onClick={handleClick} > Remove Friends from Group </EditButton>
    const renderUsers = showFriends ? removeUsers : addUsers
    let friendInfo
    const group = groups.filter(group => group.id === parseInt(groupId))
    if(groups.length === 0){
        return null
    }
    else{
     friendInfo = showFriends ? <Typography fontSize={24}> These are your friends currently in {group[0].name}. Click to remove. </Typography> : <Typography fontSize={24}> These are friends who can be added to {group[0].name}. Click to add.  </Typography>
    }
    return (
        <Container sx={{marginTop: 10}}>
            <Typography> Add/Remove Users to Group</Typography>
            {buttonText}
            {friendInfo}
            {renderUsers}
        </Container>
    )
}

export default AddDelUsers