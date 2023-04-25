import {useState} from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import {Button, Card, Container, Box, TextField, Typography, MenuItem, ImageList, ImageListItem} from '@mui/material';

function Search({buttonText, groupOptions}) {
  const initialValue = 'Searching...'
  const [selectedProgram, setSelectedProgram] = useState(initialValue);
  const [type, setType] = useState('')
  const [imdb_id, setImdb_id] = useState('')
  const [retrievedData, setRetrievedData] = useState([])

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .test('not-equal-to-initial-value', 'You need to search for something, dummy!', function (value) {
        return value !== initialValue
      })
      .required(),
    quality: yup.string().required('You really should add a quality, dummy!'),
    group_id: yup.number().required('Choose a group, dummy!'),
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
          fetch('/dbaddrequest', {
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


    let programCards;
    
    if (retrievedData.results) {
    programCards = retrievedData.results.map(program => {
    return (
    <Container key={program.id}>
    <Card sx={{maxWidth: '250px'}} className='searchcard'>
    <Typography fontSize={18} noWrap> {program.title} </Typography>
    <Button onClick={() => handleClick(program)}> {imdb_id === program.id ? 'Selected' : 'Select'} </Button>
    <ImageListItem>
    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${program.poster_path}`} alt={program.title} />
    </ImageListItem>
    <Typography fontSize={14} component={'p'} sx={{'&:hover':{'whiteSpace':'normal'}}} noWrap> {program.overview} </Typography>
    </Card>
    </Container>
    )
    });
    }
    
    return (
    <Container>
    <Box component='form' className='requestform' onSubmit={form.handleSubmit}>
    <TextField disabled name='name' label={selectedProgram} error={form.touched.name && Boolean(form.errors.name)} helperText={form.touched.name && form.errors.name} style={{width: '40%'}} />
        <TextField
          select
          label="Quality"
          name="quality"
          value={form.values.quality}
          onChange={form.handleChange}
          sx={{ width: 'calc(20% - 10px)' }}
          error={form.touched.quality && Boolean(form.errors.quality)}
          helperText={form.touched.quality && form.errors.quality}
        >
    <MenuItem value='720p'> 720p </MenuItem>
    <MenuItem value='1080p'> 1080p </MenuItem>
    <MenuItem value='4k'> 4k </MenuItem>
    </TextField>
        <TextField
          select
          name="group_id"
          label="Group"
          value={form.values.group_id}
          onChange={form.handleChange}
          sx={{ width: 'calc(20% - 10px)' }}
          error={form.touched.group_id && Boolean(form.errors.group_id)}
          helperText={form.touched.group_id && form.errors.group_id}
        >
    {groupOptions}
    </TextField>
    <Button variant='contained' className='button-30' type='submit'> Submit </Button>
    </Box>
    <br />
    <Box component='form' onSubmit={search.handleSubmit}>
        <TextField
          select
          label="Type"
          name="type"
          value={search.values.type}
          onChange={search.handleChange}
          sx={{ width: 'calc(20% - 10px)' }}
          error={search.touched.type && Boolean(search.errors.type)}
          helperText={search.touched.type && search.errors.type}
        >
    <MenuItem value='movie'> Movie </MenuItem>
    <MenuItem value='tv'> Show </MenuItem>
    </TextField>
    <TextField
      type='text'
      name="searchterm"
      value={search.values.searchterm}
      onChange={search.handleChange}
      sx={{ width: 'calc(40% - 10px)' }}
      error={search.touched.searchterm && Boolean(search.errors.searchterm)}
      helperText={search.touched.searchterm && search.errors.searchterm}
      placeholder='Enter search term here...'
    />
    <Button variant='contained' type='submit'> Search </Button>
    </Box>
    {buttonText}
    <ImageList cols={3}> {programCards} </ImageList>
    </Container>
    );
    }
    
    export default Search;
    
    
    
    
    