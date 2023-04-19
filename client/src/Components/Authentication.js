import React, {useState} from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Authentication({updateUser}) {
    const [error, setError] = useState(false)
    const [signUp, setSignUp] = useState(false)
    const history = useHistory()

    const handleClick = () => setSignUp((signUp) => !signUp)
    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a user name"),
        email: yup.string().email()
      })

    const formik = useFormik({
        initialValues: {
            name:'',
            email:'',
            password:''
        },
        validationSchema: formSchema,
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
                //15.2 render the error if the user's authentication fails
                res.json().then(error => setError(error.message))
              }
            })
           
        },
    })
    return (
      // <ThemeProvider >
        <> 
        <h2 style={{color:'red'}}> {formik.errors.name}</h2>
        {error&& <h2 style={{color:'red'}}> {error}</h2>}
        <h2>Please Log in or Sign up!</h2>
        <h2>{signUp?'Have an account?':'Not a member yet?'}</h2>
        {/* <Button variant='contained' color='primary' onClick={handleClick}> */}
        <Button variant='contained'  onClick={handleClick}>
        {signUp?'Log In':'Signup'}
        </Button>
        {/* <button onClick={handleClick}>{signUp?'Log In':'Signup'}</button> */}
        <Form onSubmit={formik.handleSubmit}>
        <label>
          Username
          </label>
        <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
        <label>
           Password
           </label>
           <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
        {signUp&&(
          <>
          <label>
          Email
          </label>
          <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
           
           </>
        )}
        <input type='submit' value={signUp?'Sign Up!':'Log In!'} />
      </Form>
        </>

      // </ThemeProvider>
    )
}

export default Authentication

export const Form = styled.form`
display:flex;
flex-direction:column;
width: 400px;
margin:auto;
font-family:Arial;
font-size:30px;
input[type=submit]{
  background-color:#42ddf5;
  color: white;
  height:40px;
  font-family:Arial;
  font-size:30px;
  margin-top:10px;
  margin-bottom:10px;
}
`