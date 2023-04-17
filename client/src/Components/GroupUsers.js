function GroupUsers({users}) {
    console.log(users)
    const renderUsers = users.map((user) => {
        return (
            <div key={user.id} >
                <ul className='usercard' >
                    <li>
                        <h4> {user.name} </h4>
                    </li>
                </ul>
            </div>
        )
    })

    return (
        <div>
        <h1> Users </h1>
        <h4> {renderUsers} </h4>
        </div>
    )
}

export default GroupUsers