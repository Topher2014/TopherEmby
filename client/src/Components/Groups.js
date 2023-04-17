import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Requests from './Requests'
import GroupUsers from './GroupUsers'

function Groups({groups, fetchGroups, user}){
    useEffect(() => {fetchGroups()}, [])
    const [groupID, setGroupID] = useState(null)
    const [showUsers, setShowUsers] = useState(null)
    const [initial, setInitial] = useState(true)
    // const [buttonState, setButtonState] = useState(initalState)
    // const initialState = {group1: false}
    // setButtonState
    function handleClick() {
        fetchGroups()
        setShowUsers((toggle) => !toggle)
    }
    const users = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.group_id === groupID).map(group => group.users)
    const buttonText = showUsers ? <button onClick={handleClick} > Show Requests </button> : <button onClick={handleClick} > Show Users </button>
    const initalButtonText = !initial ? buttonText : null
    const renderInfo = showUsers ? <GroupUsers users={users} /> : <Requests groupID={groupID} /> 
    const initialRenderInfo = !initial ? renderInfo : null

    const renderGroups = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.user_id === user.id).map(group => {

        return (
            <div key={group.groups.id} >
            <ul className='groupcard' >
                <button onClick={() => {setGroupID(group.groups.id); setInitial(false)}} > {group.groups.name} </button>
                {/* <div>
                {group.groups.name} 
                </div>
                <button onClick={() => {setGroupID(group.groups.id); handleClick()}} > {buttonText} </button> */}
            </ul>
            </div>
            )
    })

    return (
        <div>
            <h1>Groups</h1>
            <Link to={`/editgroups`}> Edit Groups </Link>
            {initalButtonText}
            <div className='groupscontainer'> {renderGroups} </div>
            {initialRenderInfo}
        </div>
    )
}

export default Groups