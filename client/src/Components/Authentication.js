import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Authentication({updateUser}) {
    const [error, setError] = useState(false)
    const [signUp, setSignUp] = useState(false)
    const history = useHistory()

    const handleClick = () => setSignUp((signUp) => !signUp)
    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a user name"),
        password: yup.string().required('Please enter your password'),
        email: yup.string().email('Please enter a valid email')
      })

    const formik = useFormik({
        initialValues: {
            name:'',
            email:'',
            password:''
        },
        validationSchema: formSchema,
        validateOnChange:false,
        onSubmit: (values) => {
            fetch(signUp?'/adduser':'/login',{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            .then(res => {
              if(res.ok){
                res.json().then(user => {
                  updateUser(user)
                  history.push('/')
                })
              } else {
                res.json().then(error => setError(error.message))
              }
            })
           
        },
    })
    return (
        <Container
           sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
          <Typography sx={{color:'red'}}> {formik.errors.name} </Typography>
          <Typography style={{color:'red'}}> {formik.errors.password} </Typography>
          <Typography style={{color:'red'}} > {formik.errors.email} </Typography>
          {error&& <h2 style={{color:'red'}} > {error}</h2>}
          <Typography > Please Log in or Sign up! </Typography>
          <Typography> {signUp?'Have an account?':'Not a member yet?'} </Typography>
          <Button variant='contained'  onClick={handleClick}>
          {signUp?'Log In':'Signup'}
          </Button>
            <Box component='form' onSubmit={formik.handleSubmit}>
              <Grid>
                <TextField label='Username' name='name' value={formik.values.name} onChange={formik.handleChange}/>
              </Grid>
              <Grid>
                <TextField label='Password' type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
              </Grid>
            {signUp&&(
              <Grid>
                <TextField label='Email' name='email' value={formik.values.email} onChange={formik.handleChange} />
              </Grid>
            )}
            <Button type='submit'   > {signUp?'Sign Up!':'Log In!'} </Button>
            </Box>
        </Container>

    )
}

export default Authentication