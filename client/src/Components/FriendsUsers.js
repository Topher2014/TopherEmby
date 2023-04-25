import {useEffect, useState} from 'react'
import {Button, Container, TextField, Typography, Chip} from '@mui/material';

function FriendsUsers({user, users, fetchUsers}) {
    // eslint-disable-next-line
    useEffect(() => {fetchUsers()}, [])
    const [filteredUsers, setFilteredUsers] = useState([])
    useEffect(() => {setFilteredUsers(users)}, [users])

    function handleAddFriendClick(friend_id) {
        fetch('/dbfriendships', {
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
        fetch('/dbfriendships', {
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
    const buttonText = showFriends ? <Button variant='contained' onClick={handleClick} > Show Friends </Button> : <Button variant='contained' onClick={handleClick} > Show All Users </Button>
    const searchText = showFriends ? 'Search All Users' : 'Search Friends' 
    
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
                <br></br>
                {isFriend ? <Chip color='primary' label={filteredUser.name} onDelete={() => handleDeleteFriendClick(filteredUser.id)} />  : <Chip color='primary' label={filteredUser.name} onClick={() => handleAddFriendClick(filteredUser.id)} /> }
                <br></br>
            </Container>
            )
            }
            else return null
            }
        else if (showFriends){
            return (
            <Container key={filteredUser.id}>
                <br></br>
                {isFriend ? <Chip color='primary' label={filteredUser.name} onDelete={() => handleDeleteFriendClick(filteredUser.id)} /> : <Chip color='primary' label={filteredUser.name} onClick={() => handleAddFriendClick(filteredUser.id)} />}
                <br></br>
            </Container>
            )
            }
    return null
    })

    return (
        <Container sx={{marginTop: 10}}>
            <Typography> Users and Friends </Typography>
            {buttonText}
            <br></br>
            <br></br>
            <TextField label={searchText} onChange={(event) => handleChange(event)}/>  
            <br></br>
            <br></br>
            {renderUsers}
        </Container>
    )
}

export default FriendsUsers