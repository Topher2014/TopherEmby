import { useEffect, useState } from 'react'

function Friends({user, users, fetchUsers}) {
    useEffect(() => {fetchUsers()}, [])

    // {id} = useParams()
    const currentUserID = user.id
    const thisUser = user ? user.id === parseInt(user.id) : false
    console.log(user)
    const friendIDs = user.friends.map(friend => friend.id)
    console.log(friendIDs)
    console.log(users)
    const userIDs = users.map(user => user.id)
    console.log(userIDs)

    // let isFriend = false
    if (user) {
        // const friendIDs = users.map(user => user.friends).map(friend => console.log(friend))
        // const friendIDs = users.map(user => user.map(friends => console.log(friends)))
    }
    // if (user) {
    //     const friendIDs = user.friends.map(friend => friend.id)
    //     isFriend = thisUser ? false : friendIDs.includes(parseInt(user.id))
    //     // isFriend = thisUser ? false : friendIDs.includes(parseInt(id))
    // }

    function handleAddFriendClick() {
        fetch('/friendships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // user_id: parseInt(id),
                user_id: parseInt(user.id),
                friend_id: parseInt(user.id)
            })
        })
        .then(res => {
            if(res.ok) {
                // isFriend = true
                window.location.reload(true)
            } else console.log('error adding friend')
        })
    }

    function handleDeleteFriendClick() {
        fetch('/friendships', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: parseInt(user.id),
                friend_id: parseInt(user.id)
                // friend_id: parseInt(id)
            })
        })
        .catch(err => console.log(err))
        window.location.reload(true)
    }
    const renderUsers = users.map(user => {
        const isFriend = friendIDs.includes(user.id)
        if (user.id === currentUserID){
            return ''
        }
        return (
        <div>
            {user.name}
            {isFriend ? <button onClick={handleDeleteFriendClick}> Delete Friend </button> : <button onClick={handleAddFriendClick}> Add Friend </button>}
        </div>
        )
    })
    // console.log(user)
    return (
        <div>
            <h1> Users </h1>
            {renderUsers}
        </div>
    )
}

export default Friends