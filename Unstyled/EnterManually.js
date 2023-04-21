import { useFormik } from 'formik'
import * as yup from 'yup'
import {Container, Box, TextField, Button, Typography, MenuItem} from '@mui/material';
// import { Button } from 'bootstrap';

function EnterManually({buttonText, groupOptions}) {
    const formSchema = yup.object().shape({
            name: yup.string().required('Enter a name, dummy!'),
            type: yup.string().required('You really should add a type, dummy!'),
            quality: yup.string().required('You really should add a quality, dummy!'),
            group_id: yup.number().required('Choose a group, dummy!')
        })
    const form = useFormik({
        initialValues: {
            name: '',
            type: '',
            quality: '',
            group_id: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: (values, {resetForm}) => {
            fetch('/addrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...values}),
            }).then((response) => {
                if(response.ok) {
                        resetForm({ values: ''})
                }
            })
        }
    })
  
    return (
        <Container>
            <Typography style={{color:'red'}}> {form.errors.name} </Typography>
            <Typography style={{color:'red'}}> {form.errors.type} </Typography>
            <Typography style={{color:'red'}}> {form.errors.quality} </Typography>
            <Typography style={{color:'red'}}> {form.errors.group_id} </Typography>
            <Box component='form' className='requestform' onSubmit={form.handleSubmit} >
                <TextField  label='Name' type='text' style={{width: '23%'}} name='name' value={form.values.name} onChange={form.handleChange} />
                <TextField select style={{width: '23%'}} label='Type' name='type' value={form.values.type} onChange={form.handleChange} >
                    <MenuItem value='movie' > Movie </MenuItem>
                    <MenuItem value='tv' > Show </MenuItem>
                </TextField>
                <TextField select  style={{width: '23%'}} label='Quality' name='quality' value={form.values.quality} onChange={form.handleChange} >
                    <MenuItem value='720p' > 720p </MenuItem>
                    <MenuItem value='1080p' > 1080p </MenuItem>
                    <MenuItem value='4k' > 4k </MenuItem>
                </TextField>
                <TextField select name='group_id' style={{width: '23%'}} label='Group' value={form.values.group_id} onChange={form.handleChange} >
                    {groupOptions}
                </TextField>
                <Button className='button-30' type='submit' > Submit </Button>
            </Box>
            <br></br>
            {buttonText}
        </Container>
    )
}

export default EnterManually