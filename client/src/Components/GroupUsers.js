import { ListItem, List, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

function GroupUsers({ users, user }) {
  console.log(users);

  const renderUsers = users.map((thisUser) => {
    if (user.id === thisUser.id) {
      return null;
    }

    return (
      <Container key={thisUser.id}>
            <ListItem>{thisUser.name}</ListItem>
      </Container>
    );
  });

  return (
    <Container>
      <Typography fontSize={24}>
        Users
      </Typography>
      {renderUsers}
    </Container>
  );
}

export default GroupUsers;
