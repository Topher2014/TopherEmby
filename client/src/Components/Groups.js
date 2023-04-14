import { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import Requests from './Requests'
// import EditGroups from './EditGroups'

function Groups({groups, fetchGroups}){
    useEffect(() => {fetchGroups()}, [])

    const renderGroups = groups.map((group) => {
        return (
            <div key={group.id} >
            <ul className='groupcard' >
                <li key={group.id}>
                <Link to={`/groups/${group.id}/requests`}> {group.name} </Link>
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
        </div>
    )
}

export default Groups