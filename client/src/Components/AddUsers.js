import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function AddUsers({users, fetchUsers, user, groups, fetchGroups}) {
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
            <div key={user.id} >
            <ul className='usercard' >
                <li > {user.name} </li>
                <button className='button-30' onClick={() => handleAddClick(user.id, groupId)} > Add </button>
            </ul>
            </div>
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
            <div key={thisUser.id} >
                <ul className='usercard' >
                    <li>
                        <h4> {thisUser.name} </h4>
                        <button className='button-30' onClick={() => handleDeleteClick(thisUser.id, groupId)} > Remove </button>
                    </li>
                </ul>
            </div>
        )
    })
    const [showFriends, setShowFriends] = useState(false)
    function handleClick() {
        setShowFriends((toggle) => !toggle)
    }
    const buttonText = showFriends ? <button onClick={handleClick} > Add Friends to Group </button> : <button onClick={handleClick} > Remove Users from Group </button>
    const renderUsers = showFriends ? removeUsers : addUsers
    return (
        <div>
            <h1> Add/Remove Users to Group</h1>
            {buttonText}
            <h4> {renderUsers} </h4>
        </div>
    )
}

export default AddUsers