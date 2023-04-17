import { useState, useEffect } from 'react'
import EnterManually from "./EnterManually"
import Search from "./Search"

function AddRequest({groups, fetchGroups, user}) {
    const [showManual, setShowManual] = useState(false)
    useEffect(() => {fetchGroups()}, [])
    const groupOptions = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.user_id === user.id).map(group => {
        return (
            <option value={group.groups.id} key={group.groups.id} > {group.groups.name} </option>
        )
    })
    function handleClick() {
        setShowManual(toggle => !toggle)
    }
    const buttonText = showManual ? <button onClick={handleClick} > Search </button> : <button onClick={handleClick} > Don't see what you're looking for? Enter it manually! </button> 
    const requestMethod = showManual ? <EnterManually buttonText={buttonText} groupOptions={groupOptions} /> : <Search buttonText={buttonText} groupOptions={groupOptions} /> 
    return (
        <div>
            <h1> Add Request </h1>
            {requestMethod}
            <br></br>
        </div>
    )
}

export default AddRequest