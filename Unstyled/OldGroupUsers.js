import {ListItem, List, Container, Typography} from '@mui/material';

function GroupUsers({users, user}) {
    console.log(users)
    const renderUsers = users.map((thisUser) => {
        if(user.id === thisUser.id){
            return null
        }
        return (
            <Container key={thisUser.id} >
                <List className='usercard' >
                    <ListItem>
                        <Typography> {thisUser.name} </Typography>
                    </ListItem>
                </List>
            </Container>
        )
    })

    return (
        <Container>
        <Typography> Users </Typography>
        {renderUsers}
        </Container>
    )
}

export default GroupUsers