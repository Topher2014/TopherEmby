import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AddUsers({users, fetchUsers, user, groups, fetchGroups}) {
    const {groupId} = useParams()
    // useEffect(() => {fetchUsers()}, [])
    useEffect(() => {fetchUsers(); fetchGroups()}, [])
    function handlePost(user_id, group_id){
        fetch(`/groupusers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: user_id, group_id: group_id}),
        })
        return (
            null
        )
    }
    // console.log(user)
    // console.log(groups)
    // const currentUsers = groups.map(group => console.log(group.groupuser))
    // const groupOptions = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => console.log(filteredGroups.group_id === groupId))
    const groupOptions = groups.map(mappedGroups => mappedGroups.groupuser).flat()
    // console.log(groupOptions)
    console.log(groupId)
    const id = 1
    console.log(id)
    // const group = groupOptions.filter(group => group.group_id === groupId) 
    // const renderUsers = users.map((user) => {
    const renderUsers = user.friends.map((user) => {
    const group = groupOptions.filter(group => group.group_id === groupId) 
        // console.log('user.id', user.id, 'currentUsers', currentUsers)
    console.log(group)
        //  if (currentUsers.includes(user.id)){
        //     return ''
        //     }
        return (
            <div key={user.id} >
            <ul className='usercard' >
                <li > {user.name} </li>
                <button className='button-30' onClick={() => handlePost(user.id, groupId)} > Add </button>
            </ul>
            </div>
        )
    })
    return (
        <div>
            <h1> Add Users </h1>
            <h4> {renderUsers} </h4>
        </div>
    )
}

export default AddUsers