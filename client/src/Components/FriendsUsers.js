import { useEffect, useState } from 'react'
import {Button, ListItem, List, Container, Box, TextField, Typography} from '@mui/material';

function FriendsUsers({user, users, fetchUsers}) {
    useEffect(() => {fetchUsers()}, [])
    const [filteredUsers, setFilteredUsers] = useState([])
    useEffect(() => {setFilteredUsers(users)}, [users])

    function handleAddFriendClick(friend_id) {
        fetch('/friendships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: parseInt(user.id),
                friend_id: parseInt(friend_id)
            })
        })
        .then(res => {
            if(res.ok) {
                window.location.reload(true)
            } else console.log('error adding friend')
        })
    }

    function handleDeleteFriendClick(friend_id) {
        fetch('/friendships', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: parseInt(user.id),
                friend_id: parseInt(friend_id)
            })
        })
        .catch(err => console.log(err))
        window.location.reload(true)
    }
    const [showFriends, setShowFriends] = useState(false)
    function handleClick() {
        setShowFriends((toggle) => !toggle)
    }
    const buttonText = showFriends ? <Button onClick={handleClick} > Show Friends </Button> : <Button onClick={handleClick} > Show All Users </Button>
    
    const friendIDs = user.friends.map(friend => friend.id)
    const handleChange = (event) => {
        const search = event.target.value.toLowerCase()
        setFilteredUsers(users.filter(user => {
            const usernameBool = user.name.toLowerCase().includes(search)
            const emailBool = user.email.toLowerCase().includes(search)
            return usernameBool || emailBool
        }))
    }
    const renderUsers = filteredUsers.map(filteredUser => {
        const isFriend = friendIDs.includes(filteredUser.id)
        if (filteredUser.id === user.id){
            return ''
        }
        if (!showFriends){
            if (friendIDs.includes(filteredUser.id)){
            return (
            <Container key={filteredUser.id}>
                {filteredUser.name}
                {isFriend ? <Button onClick={() => handleDeleteFriendClick(filteredUser.id)}> Delete Friend </Button> : <Button onClick={() => handleAddFriendClick(filteredUser.id)}> Add Friend </Button>}
            </Container>
            )
            }
            else return null
            }
        else if (showFriends){
            return (
            <Container key={filteredUser.id}>
                {filteredUser.name}
                {isFriend ? <Button onClick={() => handleDeleteFriendClick(filteredUser.id)}> Delete Friend </Button> : <Button onClick={() => handleAddFriendClick(filteredUser.id)}> Add Friend </Button>}
            </Container>
            )
            }
    return null
    })

    return (
        <Container>
            <Typography> Users </Typography>
            {buttonText}
            <br></br>
            <br></br>
            <TextField onChange={(event) => handleChange(event)}/>  
            <br></br>
            <br></br>
            {renderUsers}
        </Container>
    )
}

export default FriendsUsers