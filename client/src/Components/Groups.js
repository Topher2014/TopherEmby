import { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import Requests from './Requests'

function Groups({groups, fetchGroups, user}){
    useEffect(() => {fetchGroups()}, [])
    const [groupID, setGroupID] = useState(null)
    console.log(groupID)
    // console.log(groups)
    const mappedGroups = groups.map(group => group.groupuser).flat()
    // console.log(mappedGroups)
    const filteredGroups = mappedGroups.filter(filteredGroup => filteredGroup.group_id === 1)
    console.log(filteredGroups)
    const users = filteredGroups.map(group => group.users)
    console.log(users)
    // function setID(id) {
    //     // setGroupID(id)
    // console.log(id)
    // }

    const renderGroups = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.user_id === user.id).map(group => {
        // console.log(group.groups.id)
        return (
            <div key={group.groups.id} >
            <ul className='groupcard' >
                <li >
                {/* <Link to={`/groups/${group.groups.id}/requests`}> {group.groups.name} </Link> */}
                {/* <Link to={`/groups/${group.groups.id}/requests`} onClick={() => setID(group.groups.id)} > {group.groups.name} </Link> */}
                <Link to={`/groups/${group.groups.id}/requests`} onClick={() => setGroupID(group.groups.id)} > {group.groups.name} </Link>
                </li>
                <li >
                {users[0].name}
                </li>
            </ul>
            </div>
            )
    })

    return (
        <div>
            <h1>Groups</h1>
            <Link to={`/editgroups`}> Edit Groups </Link>
            <div className='groupscontainer'> {renderGroups} </div>
            <Route path={`/groups/:groupId/requests`}>
                <Requests />
            </Route>
            {/* <Route
            <Users/>
            <Route */}
        </div>
    )
}

export default Groups