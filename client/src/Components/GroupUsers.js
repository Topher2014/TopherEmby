function GroupUsers({users, user}) {
    console.log(users)
    const renderUsers = users.map((thisUser) => {
        if(user.id === thisUser.id){
            return null
        }
        return (
            <div key={thisUser.id} >
                <ul className='usercard' >
                    <li>
                        <h4> {thisUser.name} </h4>
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