import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Button, ListItem, List, Container, Box, TextField, Typography} from '@mui/material';

function AddDelUsers({users, fetchUsers, user, groups, fetchGroups}) {
    const {groupId} = useParams()
    useEffect(() => {fetchUsers(); fetchGroups()}, [])

    function handleAddClick(user_id, group_id){
        fetch(`/groupusers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user_id, group_id: group_id}),
        })
            window.location.reload(true)
    }

    function handleDeleteClick(user_id, group_id){
        fetch(`/groupusers`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user_id, group_id: group_id}),
        })
            window.location.reload(true)
    }
    console.log(users)

    const groupIDs = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroup => filteredGroup.group_id === parseInt(groupId)).map(group => group.user_id)
    const addUsers = user.friends.map((user) => {
        if (groupIDs.includes(user.id)){
            return null
            }
        return (
            <Container key={user.id} >
            <List className='usercard' >
                <ListItem > {user.name} </ListItem>
                <Button className='button-30' onClick={() => handleAddClick(user.id, groupId)} > Add </Button>
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
                        <Typography> {thisUser.name} </Typography>
                        <Button className='button-30' onClick={() => handleDeleteClick(thisUser.id, groupId)} > Remove </Button>
                    </ListItem>
                </List>
            </Container>
        )
    })
    const [showFriends, setShowFriends] = useState(false)
    function handleClick() {
        setShowFriends((toggle) => !toggle)
    }
    const buttonText = showFriends ? <Button onClick={handleClick} > Add Friends to Group </Button> : <Button onClick={handleClick} > Remove Users from Group </Button>
    const renderUsers = showFriends ? removeUsers : addUsers
    return (
        <Container>
            <Typography> Add/Remove Users to Group</Typography>
            {buttonText}
            <Typography> {renderUsers} </Typography>
        </Container>
    )
}

export default AddDelUsers