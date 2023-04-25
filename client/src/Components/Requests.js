import {useState, useEffect} from 'react'
import { Container, Typography, List, Box, Chip } from '@mui/material';

function Requests({ groupID }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (groupID)
      fetch(`/dbgroups/${groupID}/requests`)
        .then((res) => res.json())
        .then((data) => setRequests(data));
  }, [groupID]);

  function handleDeleteClick(id){
    console.log(id)
      fetch(`/dbdeleterequest`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: id}),
      })
          window.location.reload(true)
  }

  const renderRequests = requests.map((request) => {
    let type = '';
    if (request.type === 'movie') {
      type = request.type.charAt(0).toUpperCase() + request.type.slice(1);
    } else if (request.type === 'tv') {
      type = 'Show';
    }
    return (
      <List key={request.id}>
         <Chip label={`${type} ${request.name} ${request.quality} ${request.imdb_id}`} onDelete={() => handleDeleteClick(request.id)}/>
      </List>
    );
  });

  return (
    <Container>
      <Typography fontSize={24}>
        Requests
      </Typography>
      {requests.length > 0 ? (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {renderRequests}
        </List>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography>No requests found.</Typography>
        </Box>
      )}
    </Container>
  );
}

export default Requests;
