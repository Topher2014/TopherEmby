import { useState, useEffect } from 'react'
import {Button, ListItem, List, Container, Box, TextField, Typography} from '@mui/material';

function Requests({groupID}) {
    const [requests, setRequests] = useState([])
    
    useEffect(() => {
        if (groupID)
        fetch(`/groups/${groupID}/requests`).then(res => res.json()).then(data => setRequests(data))
    }, [groupID])
    const renderRequests = requests.map((request) => {
        console.log(request)
        let type = ''
        if (request.type === 'movie') {
        type = request.type.charAt(0).toUpperCase() + request.type.slice(1)
        }
        else if (request.type === 'tv') {
        type = 'Show'
        }
        return (
            <Container key={request.id} >
                <List className='requestcard' >
                    <ListItem>
                        <Typography> {type} {request.name} {request.quality} {request.imdb_id}</Typography>
                    </ListItem>
                </List>
            </Container>
        )
    })

    return (
        <Container>
        <Typography> Requests </Typography>
        <Typography> {renderRequests} </Typography>
        </Container>
    )
}

export default Requests