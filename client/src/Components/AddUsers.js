import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AddUsers({users, fetchUsers}) {
    const {groupId} = useParams()
    useEffect(() => {fetchUsers()}, [])
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
    const renderUsers = users.map((user) => {
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