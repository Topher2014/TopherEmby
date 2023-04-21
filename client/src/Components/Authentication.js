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

    const form = useFormik({
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
                justifyContent: 'center'
            }}>
          {error&& <h2 style={{color:'red'}} > {error}</h2>}
          <Typography > Please Log in or Sign up! </Typography>
          <Typography> {signUp?'Have an account?':'Not a member yet?'} </Typography>
          <Button variant='contained'  onClick={handleClick}>
          {signUp?'Log In':'Signup'}
          </Button>
          <Grid container spacing={2} justifyContent='center' >
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}component='form' onSubmit={form.handleSubmit}>
              <Grid>
              <TextField
                type='text'
                name="name"
                label="Username"
                value={form.values.name}
                onChange={form.handleChange}
                sx={{ width: 'calc(120% - 10px)' }}
                error={form.touched.name && Boolean(form.errors.name)}
                helperText={form.touched.name && form.errors.name}
              />
              </Grid>
              <Grid>
              <TextField
                type='password'
                name="password"
                label="Password"
                value={form.values.password}
                onChange={form.handleChange}
                sx={{ width: 'calc(120% - 10px)' }}
                error={form.touched.password && Boolean(form.errors.password)}
                helperText={form.touched.password && form.errors.password}
              />
              </Grid>
            {signUp&&(
              <Grid>
              <TextField
                type='text'
                name="email"
                label="Email"
                value={form.values.email}
                onChange={form.handleChange}
                sx={{ width: 'calc(120% - 10px)' }}
                error={form.touched.email && Boolean(form.errors.email)}
                helperText={form.touched.email && form.errors.email}
              />
              </Grid>
            )}
            <Grid>
            <Button type='submit'   > {signUp?'Sign Up!':'Log In!'} </Button>
            </Grid>
            </Box>
          </Grid>
        </Container>

    )
}

export default Authentication