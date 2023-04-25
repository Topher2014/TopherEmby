import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Box, TextField, Button, MenuItem,} from '@mui/material';
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

function EnterManually({ buttonText, groupOptions }) {
  const formSchema = yup.object().shape({
    name: yup.string().required('Enter a name, dummy!'),
    type: yup.string().required('You really should add a type, dummy!'),
    quality: yup.string().required('You really should add a quality, dummy!'),
    group_id: yup.number().required('Choose a group, dummy!'),
  });
  const form = useFormik({
    initialValues: {
      name: '',
      type: '',
      quality: '',
      group_id: '',
    },
    validationSchema: formSchema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      fetch('/dbaddrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
      }).then((response) => {
        if (response.ok) {
          resetForm({ values: '' });
        }
      });
    },
  });

  return (
    <Container>
      <Box
        component="form"
        className="requestform"
        onSubmit={form.handleSubmit}
        sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
      >
        <TextField
          label="Name"
          type="text"
          sx={{ width: 'calc(50% - 10px)' }}
          name="name"
          value={form.values.name}
          onChange={form.handleChange}
          error={form.touched.name && Boolean(form.errors.name)}
          helperText={form.touched.name && form.errors.name}
        />
        <TextField
          select
          label="Type"
          name="type"
          value={form.values.type}
          onChange={form.handleChange}
          sx={{ width: 'calc(50% - 10px)' }}
          error={form.touched.type && Boolean(form.errors.type)}
          helperText={form.touched.type && form.errors.type}
        >
          <MenuItem value="movie">Movie</MenuItem>
          <MenuItem value="tv">Show</MenuItem>
        </TextField>
        <TextField
          select
          label="Quality"
          name="quality"
          value={form.values.quality}
          onChange={form.handleChange}
          sx={{ width: 'calc(50% - 10px)' }}
          error={form.touched.quality && Boolean(form.errors.quality)}
          helperText={form.touched.quality && form.errors.quality}
        >
          <MenuItem value="720p">720p</MenuItem>
          <MenuItem value="1080p">1080p</MenuItem>
          <MenuItem value="4k">4k</MenuItem>
        </TextField>
        <TextField
          select
          name="group_id"
          label="Group"
          value={form.values.group_id}
          onChange={form.handleChange}
          sx={{ width: 'calc(50% - 10px)' }}
          error={form.touched.group_id && Boolean(form.errors.group_id)}
          helperText={form.touched.group_id && form.errors.group_id}
        >
          {groupOptions}
        </TextField>
        <EditButton
          className="button-30"
          type="submit"
          sx={{ mt: '16px', ml: 'auto' }}
        >
          Submit
        </EditButton>
      </Box>
      <Box sx={{ mt: '16px' }}>{buttonText}</Box>
      </Container>
  )
}

export default EnterManually