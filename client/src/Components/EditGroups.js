import { useHistory, Link } from 'react-router-dom'
import { useEffect, React } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {Button, ListItem, List, Container, Box, TextField, Typography} from '@mui/material';

function EditGroups({groups, fetchGroups, setGroups, user}) {
    useEffect(() => {fetchGroups()}, [])
    const history = useHistory()
    const formSchema = yup.object().shape({
            name: yup.string().required('Enter group name, dummy!')
        })

    function handleDelete(id) {
        const newGroups = groups.filter(group => {
            return group.id !== id
        })
        fetch(`/group/${id}`, {
            method: 'DELETE'
        }).then(() => setGroups(newGroups))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: (values, {resetForm}) => {
            fetch('/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...values}),
            }).then((response) => {
                if(response.ok) {
                    response.json().then((data) => {
                        history.push('/editgroups')
                        fetchGroups()
                        resetForm({ values: ''})
                        fetch('/groupusers', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({user_id: data.user_id, group_id: data.id}),
                        })
                    })
                }
            })
        }
    })

    const renderGroups = groups.map(mappedGroups => mappedGroups.groupuser).flat().filter(filteredGroups => filteredGroups.user_id === user.id).map(group => {
        console.log(group)
        return (
            <Container key={group.groups.id} >
            <List className='groupcard' >
                <ListItem > {group.groups.name} </ListItem>
                <Button className='button-30' onClick={() => handleDelete(group.groups.id)} > Delete Group </Button>
                <Button onClick={() => history.push(`/addremoveusers/${group.groups.id}`)} > Add/Remove Users  </Button>
                {/* <Link to={`/addremoveusers/${group.groups.id}`} > Add Users </Link> */}
            </List>
            </Container>
            )
    })
    return (
        <Container>
            <Typography> Edit Groups </Typography>
            <Typography style={{color:'red'}} > {formik.errors.name} </Typography>
            <Box className='groupform' component='form' onSubmit={formik.handleSubmit}>
                <TextField label='Name: ' name='name' value={formik.values.name} onChange={formik.handleChange} />
                {/* <label> Name: </label>
                <textarea
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                /> */}
                <Button type='submit' > Add Group </Button>
                {/* <input className='button-30' type='submit' /> */}
            </Box>
            <Box className='groupscontainer' > {renderGroups} </Box>
        </Container>
    )
}

export default EditGroups