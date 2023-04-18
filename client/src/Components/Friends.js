import { useEffect, useState } from 'react'

function Friends({user, users, fetchUsers}) {
    useEffect(() => {fetchUsers()}, [])
    const [filteredUsers, setFilteredUsers] = useState([])
    // setFilteredUsers(users)

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
                // isFriend = true
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
        // setFilteredUsers(users)
    }

    console.log(users)
    const handleChange = (event) => {
        const search = event.target.value.toLowerCase()
        setFilteredUsers(users.filter(user => {
            const usernameBool = user.name.toLowerCase().includes(search)
            // const emailBool = user.email.toLowerCase().includes(search)
            // return usernameBool || emailBool
            return usernameBool 
        }))
    }

    const currentUserID = user.id
    const friendIDs = user.friends.map(friend => friend.id)
    const renderUsers = users.map(user => {
    // const renderUsers = filteredUsers.map(user => {
        const isFriend = friendIDs.includes(user.id)
        if (user.id === currentUserID){
            return ''
        }
        return (
        <div>
            {user.name}
            {isFriend ? <button onClick={() => handleDeleteFriendClick(user.id)}> Delete Friend </button> : <button onClick={() => handleAddFriendClick(user.id)}> Add Friend </button>}
        </div>
        )
    })

    return (
        <div>
            <input onChange={(event) => handleChange(event)}/>  
            <h1> Users </h1>
            {renderUsers}
        </div>
    )
}

export default Friends