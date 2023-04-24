import { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  List,
  Container,
  Box,
  TextField,
  Typography,
  Chip, Divider, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { styled } from '@mui/system';

  const EditButton = styled(Button)({
    margin: '16px 0',
    fontWeight: 'bold',
    color: 'white',
    background: '#2e7d32',
    '&:hover': {
      background: '#1b5e20',
    },
  });

const EditGroups = ({ groups, fetchGroups, setGroups, user }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formSchema = yup.object().shape({
    name: yup.string().required('Enter group name'),
  });

  useEffect(() => {
    fetchGroups();
  // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    const newGroups = groups.filter((group) => group.id !== id);
    fetch(`/group/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setLoading(false);
      setGroups(newGroups);
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: formSchema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      fetch('/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
      }).then((response) => {
        setLoading(false);
        if (response.ok) {
          response.json().then((data) => {
            history.push('/editgroups');
            fetchGroups();
            resetForm({ values: '' });
            fetch('/groupusers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id: data.user_id, group_id: data.id }),
            });
          });
        }
      });
    },
  });

  const renderGroups = groups
    .map((mappedGroups) => mappedGroups.groupuser)
    .flat()
    .filter((filteredGroups) => filteredGroups.user_id === user.id)
    .map((group) => (
      <Container key={group.groups.id}>
        <List className='groupcard'>
          <Chip
            label={group.groups.name}
            color='primary'
            onDelete={() => handleDelete(group.groups.id)}
            deleteIcon={<DeleteIcon />}
          />
          <Button
            variant='outlined'
            size='small'
            startIcon={<PersonAddIcon />}
            onClick={() => history.push(`/addremoveusers/${group.groups.id}`)}
          >
            Add/Remove Users
          </Button>
        </List>
      </Container>
    ));

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography> Edit Groups </Typography>
      <Box sx={{ my: 2 }}>
        <Typography color='error' gutterBottom>
          {formik.errors.name}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label='Name'
              name='name'
              size='small'
              variant='outlined'
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Box sx={{ ml: 1 }}>
              <EditButton
                type='submit'
                variant='contained'
                disabled={loading}
                size='large'
              >
                Add Group
              </EditButton>
            </Box>
          </Box>
       
          {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <CircularProgress size={20} />
          <Box sx={{ ml: 1 }}>Adding Group...</Box>
        </Box>
      )}
    </form>
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