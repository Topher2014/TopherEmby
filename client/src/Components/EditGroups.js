import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Button, List, Container, Box, TextField, Typography, Chip, Divider, CircularProgress} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const EditGroups = ({ groups, fetchGroups, setGroups, user }) => {
  const history = useHistory();
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false)
  const formSchema = yup.object().shape({
    name: yup.string().required('Enter group name'),
  });

  useEffect(() => {
    fetchGroups();
  // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    setRemoving(true);
    const newGroups = groups.filter((group) => group.id !== id);
    fetch(`/dbgroup/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setRemoving(false);
      setGroups(newGroups);
      form.resetForm()
    });
  };

  const form = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: formSchema,
    // validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      setAdding(true);
      fetch('/dbgroups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
      }).then((response) => {
        setAdding(false);
        if (response.ok) {
          response.json().then((data) => {
            resetForm({ values: '' });
            fetch('/dbgroupusers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id: data.user_id, group_id: data.id }),
            });
          });
            fetchGroups();
            console.log(groups)
            history.push('/editgroups');
            if(groups.length === 0) window.location.reload(true)
        }
      });
    },
  });

  const renderGroups = groups
    .map((mappedGroups) => mappedGroups.groupuser)
    .flat()
    .filter((filteredGroups) => filteredGroups.user_id === user.id)
    .map((group) => (
      <Box key={group.groups.id} >
          <Chip
            label={group.groups.name}
            color='primary'
            disabled={removing}
            onDelete={() => handleDelete(group.groups.id)}
            deleteIcon={<DeleteIcon />}
          />
          <Button
            variant='outlined'
            disabled={removing}
            size='small'
            startIcon={<PersonAddIcon />}
            onClick={() => history.push(`/addremoveusers/${group.groups.id}`)}
          >
            Add/Remove Users
          </Button>
      </Box>
    ))
  

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography> Edit Groups </Typography>
      <Box sx={{ my: 2 }}>
        <Box component='form' onSubmit={form.handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label='Name'
              name='name'
              size='small'
              variant='outlined'
              value={form.values.name}
              onChange={form.handleChange}
              error={form.touched.name && Boolean(form.errors.name)}
              helperText={form.touched.name && form.errors.name}
            />
            <Box sx={{ ml: 1 }}>
              <Button
                type='submit'
                variant='contained'
                disabled={adding}
                size='large'
              >
                Add Group
              </Button>
            </Box>
          </Box>
          {removing && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <CircularProgress size={20} />
          <Box sx={{ ml: 1 }}>Removing Group...</Box>
        </Box>
      )}
          {adding && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <CircularProgress size={20} />
          <Box sx={{ ml: 1 }}>Adding Group...</Box>
        </Box>
      )}
    </Box>
  </Box>
  <Divider sx={{ mb: 2 }} />
  <Typography>Your Groups:</Typography>
  <Box sx={{ mt: 2 }}>
    {renderGroups.length > 0 ? (
      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        {renderGroups}
      </List>
    ) : (
      <Typography>You are not a member of any groups yet.</Typography>
    )}
  </Box>
</Container>
  )
    }


export default EditGroups