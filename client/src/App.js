import Home from './Components/Home'
import Nav from './Components/Nav'
import Authentication from './Components/Authentication'
import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Groups from './Components/Groups'
import EditGroups from './Components/EditGroups'
import AddRequest from './Components/AddRequest'
import AddDelUsers from './Components/AddDelUsers'
import FriendsUsers from './Components/FriendsUsers'
import Header from './Components/Header'
import About from './Components/About'

function App() {
    const [user, setUser] = useState(null)
    const [groups, setGroups] = useState([])
    const [users, setUsers] = useState([])

    const fetchGroups = () => (
        fetch('/dbgroups').then(res => res.json()).then(data => setGroups(data))
    )
    const fetchUsers = () => (
        fetch('/dbusers').then(res => res.json()).then(data => setUsers(data))
    )

    useEffect(() => {
        fetch('/dbauthorized')
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
        <Header />
        <Switch>
            <Route exact path='/' >
                <Home />
            </Route>
            <Route path='/about' >
                <About />
            </Route>
            <Route path='/authentication'>
                <Authentication updateUser={updateUser} />
            </Route>
            <Route path='/groups'>
                <Groups groups={groups} fetchGroups={fetchGroups} user={user} />
            </Route>
            <Route path={`/editgroups`} >
                <EditGroups groups={groups} fetchGroups={fetchGroups} setGroups={setGroups} user={user} />
            </Route>
            <Route path={`/addrequest`} >
                <AddRequest groups={groups} fetchGroups={fetchGroups} user={user} />
            </Route>
            <Route path={`/addremoveusers/:groupId`} >
                <AddDelUsers users={users} fetchUsers={fetchUsers} user={user} groups={groups} fetchGroups={fetchGroups} />
            </Route>
            <Route path={`/friendsusers`} >
                <FriendsUsers user={user} users={users} fetchUsers={fetchUsers} />
            </Route>
        </Switch>
        </div>
    </div>
    )
}

export default App;