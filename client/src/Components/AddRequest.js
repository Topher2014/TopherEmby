import { useState, useEffect } from 'react'
import EnterManually from "./EnterManually"
import Search from "./Search"

function AddRequest({groups, fetchGroups, user}) {
    const [showManual, setShowManual] = useState(false)
    const requestMethod = showManual ? <EnterManually groups={groups} fetchGroups={fetchGroups} user={user} /> : <Search /> 
    return (
        <div>
            <h1> Add Request </h1>
            {requestMethod}
        </div>
    )
}

export default AddRequest