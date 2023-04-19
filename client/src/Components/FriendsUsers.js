import { useEffect, useState } from 'react'

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
    const buttonText = showFriends ? <button onClick={handleClick} > Show Friends </button> : <button onClick={handleClick} > Show All Users </button>
    
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
            <div key={filteredUser.id}>
                {filteredUser.name}
                {isFriend ? <button onClick={() => handleDeleteFriendClick(filteredUser.id)}> Delete Friend </button> : <button onClick={() => handleAddFriendClick(filteredUser.id)}> Add Friend </button>}
            </div>
            )
            }
            else return null
            }
        else if (showFriends){
            return (
            <div key={filteredUser.id}>
                {filteredUser.name}
                {isFriend ? <button onClick={() => handleDeleteFriendClick(filteredUser.id)}> Delete Friend </button> : <button onClick={() => handleAddFriendClick(filteredUser.id)}> Add Friend </button>}
            </div>
            )
            }
    return null
    })

    return (
        <div>
            <h1> Users </h1>
            {buttonText}
            <br></br>
            <br></br>
            <input onChange={(event) => handleChange(event)}/>  
            <br></br>
            <br></br>
            {renderUsers}
        </div>
    )
}

export default FriendsUsers