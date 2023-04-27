import {List, Container, Typography, Chip, Box} from '@mui/material';

function GroupUsers({ users, user }) {
  console.log(users);

  const renderUsers = users.map((thisUser) => {
    if (user.id === thisUser.id) {
      return null;
    }

    return (
      <List key={thisUser.id}>
              <Chip  label={thisUser.name}/>
      </List>
    );
  });

  return (
    <Container>
      <Typography fontSize={30} >
        Friends
      </Typography>
      {users.length > 1 ? (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {renderUsers}
        </List>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography component='p' variant='secondary' >No friends appear to be associated with this group.</Typography>
        </Box>
      )}
    </Container>
  );
}

export default GroupUsers;
