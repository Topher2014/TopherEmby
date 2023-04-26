import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Requests from './Requests'
import GroupUsers from './GroupUsers'
import {Button, Container, Typography, MenuItem, TextField} from '@mui/material';

function Groups({ groups, fetchGroups, user }) {
  useEffect(() => {
    fetchGroups()
  // eslint-disable-next-line
  }, [])

  const [groupID, setGroupID] = useState('')
  const [showUsers, setShowUsers] = useState('')
  const [initial, setInitial] = useState(true)
  const [label, setLabel] = useState('Select a group...')
  const history = useHistory()

  function handleClick() {
    fetchGroups()
    setShowUsers((toggle) => !toggle)
  }

  const users = groups
    .map((mappedGroups) => mappedGroups.groupuser)
    .flat()
    .filter((filteredGroups) => filteredGroups.group_id === groupID)
    .map((group) => group.users)

  const buttonText = showUsers ? (
    <Button onClick={handleClick}>Show Requests</Button>
  ) : (
    <Button onClick={handleClick}>Show Users</Button>
  )

  const initalButtonText = !initial ? buttonText : null

  const renderInfo = showUsers ? (
    <GroupUsers users={users} user={user} />
  ) : (
    <Requests groupID={groupID} />
  )

  const initialRenderInfo = !initial ? renderInfo : null

  let renderGroups
  // if (groups.length === 0) {
  //   renderGroups = <MenuItem disabled > You're not associated with any groups yet! </MenuItem>
  // }
  if (groups.length === 0) renderGroups = <MenuItem disabled > You're not associated with any groups yet! </MenuItem>
  else {
  renderGroups = groups
    .map((mappedGroups) => mappedGroups.groupuser)
    .flat()
    .filter((filteredGroups) => filteredGroups.user_id === user.id)
    .map((group) => {
      return (
        <MenuItem
          key={group.groups.id}
          onClick={() => {
            setGroupID(group.groups.id)
            setInitial(false)
            setLabel(group.groups.name)
          }}
        >
          {group.groups.name}
        </MenuItem>
      )
    })
  }

  return (
    <Container sx={{marginTop: 10}} >
      <Typography >Groups</Typography>
      <Button variant='contained' onClick={() => history.push('/editgroups')}>
        Edit Groups
      </Button>
      <TextField label={label} select fullWidth>
        {renderGroups}
        {/* No groups */}
        {/* <MenuItem> Test </MenuItem> */}
      </TextField>
      {initalButtonText}
      {initialRenderInfo}
    </Container>
  )
}

export default Groups