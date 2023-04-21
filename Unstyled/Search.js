import { useState } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'
import {Button, Card, Container, Box, TextField, Typography, MenuItem, ImageList, ImageListItem} from '@mui/material';

function Search({buttonText, groupOptions}) {
  const initialValue = 'Search Movie'
  const [selectedProgram, setSelectedProgram] = useState(initialValue);
  const [type, setType] = useState('')
  const [imdb_id, setImdb_id] = useState('')
  const [retrievedData, setRetrievedData] = useState([])

  const formSchema = yup.object().shape({
          name: yup.string().required('Enter a name, dummy!'),
          type: yup.string().required('You really should add a type, dummy!'),
          quality: yup.string().required('You really should add a quality, dummy!'),
          group_id: yup.number().required('Choose a group, dummy!')
      })
  const form = useFormik({ 
      enableReinitialize:true,
      initialValues: {
          name: selectedProgram,
          type: type,
          quality: '',
          group_id: '',
          imdb_id: imdb_id
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
                      setSelectedProgram(initialValue)
              }
          })
      }
  })

  const searchSchema = yup.object().shape({
    type: yup.string().required('What is your type?'),
    searchterm: yup.string().required('You need a search term, dummy!'),
  })
  const search = useFormik({
    initialValues: {
      type: '',
      searchterm: '',
    },
    validationSchema: searchSchema,
    validateOnChange: false,
    onSubmit: (event, {resetForm}) => {
      searchPrograms(event)
      resetForm({ values: '' })
    }
  })

  function searchPrograms(e) {
    setSelectedProgram(initialValue)
    setType(e.type)
    fetch(
      `https://api.themoviedb.org/3/search/${e.type}?api_key=a09c757d39c1b519b0f90f145b75e716&query=${e.searchterm}`
    )
      .then((res) => res.json())
      .then((data) => setRetrievedData(data))
  }

  function handleClick(program) {
    program.title ? setSelectedProgram(program.title) : setSelectedProgram(program.name) 
    setImdb_id(program.id)
    return (
      null
    )
  }

  let programCards
  if (retrievedData.results) {
    programCards = retrievedData.results.map(program => {
    return (
      <Container key={program.id} >
         <Card sx={{maxWidth: '250px'}}className='searchcard' >
            <Typography noWrap> {program.title}  </Typography> <Button onClick={() => handleClick(program)} > {imdb_id === program.id ? 'Selected' : 'Select'} </Button>
            <ImageListItem>  <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${program.poster_path}`} alt={program.title} /> </ImageListItem>
            {/* <ImageListItem>  <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${program.poster_path}`} onerror="this.onerror=null;this.src='https://github.com/linjdiana/flatiron_abs/blob/main/images/chad.jpeg';" alt={program.title} /> </ImageListItem> */}
            <Typography component={'p'} sx={{'&:hover':{'whiteSpace':'normal'}}} noWrap> {program.overview} </Typography>

         </Card>
       </Container>

      )}
  )}

  return (
    <Container>
      <Typography style={{color:'red'}}> {form.errors.quality} </Typography>
      <Typography style={{color:'red'}}> {form.errors.group_id} </Typography>
      <Typography style={{color:'red'}}> {search.errors.type} </Typography>
      <Typography style={{color:'red'}}> {search.errors.searchterm} </Typography>
      <Box component='form' className='requestform' onSubmit={form.handleSubmit} >
          <TextField disabled label={selectedProgram} style={{width: '25%'}} > {selectedProgram} </TextField>
          <TextField label='Quality' select name='quality' style={{width: '25%'}} value={form.values.quality} onChange={form.handleChange} >
              <MenuItem value='720p' > 720p </MenuItem>
              <MenuItem value='1080p' > 1080p </MenuItem>
              <MenuItem value='4k' > 4k </MenuItem>
          </TextField>
          <TextField label='Group' select name='group_id' style={{width: '25%'}} value={form.values.group_id} onChange={form.handleChange} >
              {groupOptions}
          </TextField>
          <Button className='button-30' type='submit' > Submit </Button>
      </Box>
      <br></br>
      <Box component='form' onSubmit={search.handleSubmit}>
        <TextField select label='Type' name='type' style={{width: '10%'}} value={search.values.type} onChange={search.handleChange} >
            <MenuItem value='movie' > Movie </MenuItem>
            <MenuItem value='tv' > Show </MenuItem>
        </TextField >
        <TextField type="text" name='searchterm' value={search.values.searchterm} onChange={search.handleChange} placeholder='Enter movie title'></TextField> 
        <Button type='submit' > Search </Button>
      </Box>
      {buttonText}
      <ImageList  cols={3}>  {programCards} </ImageList>
    </Container>
  );
}

export default Search;