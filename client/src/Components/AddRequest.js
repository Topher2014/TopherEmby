import { useState, useEffect } from 'react'
import EnterManually from "./EnterManually"
import Search from "./Search"
import {Button, Container, Typography, MenuItem} from '@mui/material';

function AddRequest({groups, fetchGroups, user}) {
    const [showManual, setShowManual] = useState(false)
    useEffect(() => {fetchGroups()}, [])
    const groupOptions = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.user_id === user.id).map(group => {
        return (
            // <option value={group.groups.id} key={group.groups.id} > {group.groups.name} </option>
            <MenuItem value={group.groups.id} key={group.groups.id} > {group.groups.name} </MenuItem>
        )
    })
    function handleClick() {
        setShowManual(toggle => !toggle)
    }
    const buttonText = showManual ? <Button onClick={handleClick} > Search </Button> : <Button onClick={handleClick} > Don't see what you're looking for? Enter it manually! </Button> 
    const requestMethod = showManual ? <EnterManually buttonText={buttonText} groupOptions={groupOptions} /> : <Search buttonText={buttonText} groupOptions={groupOptions} /> 
    return (
        <Container sx={{marginTop: 10}} >
            <Typography> Add Request </Typography>
            {requestMethod}
            <br></br>
        </Container>
    )
}

export default AddRequest