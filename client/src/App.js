import Home from './Components/Home'
import Nav from './Components/Nav'
import Authentication from './Components/Authentication'
import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Groups from './Components/Groups'
import EditGroups from './Components/EditGroups'
import AddRequest from './Components/AddRequest'
import AddUsers from './Components/AddUsers'

function App() {
    const [user, setUser] = useState(null)
    const [groups, setGroups] = useState([])

    const fetchGroups = () => (
        fetch('/groups').then(res => res.json()).then(data => setGroups(data))
    )

    useEffect(() => {
        fetch('/authorized')
        .then(response => {
            if(response.ok) {
                response.json().then(user => setUser(user))
            } else {
                setUser(null)
            }
        })
    }, [])

    const updateUser = (user) => setUser(user)
    if(!user) return (
    <>
        <Nav/>
        <Authentication updateUser={updateUser} />
    </>
    )

    return (
    <div className='App' >
        <div className='container' >
        <Nav updateUser={updateUser} />
        <Switch>
            <Route exact path='/' >
                <Home />
            </Route>
            <Route path='authentication'>
                <Authentication updateUser={updateUser} />
            </Route>
            <Route path='/groups'>
                <Groups groups={groups} fetchGroups={fetchGroups} user={user} />
            </Route>
            <Route exact path={`/editgroups`} >
                <EditGroups groups={groups} fetchGroups={fetchGroups} setGroups={setGroups} />
            </Route>
            <Route path={`/addrequest`} >
                <AddRequest groups={groups} fetchGroups={fetchGroups} />
            </Route>
            <Route path={`/addusers/:groupId`} >
                <AddUsers />
            </Route>
        </Switch>
        </div>
    </div>
    )
}

export default App;