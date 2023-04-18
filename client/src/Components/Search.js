
import { useState } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'

function Search({buttonText, groupOptions}) {
  const [renderCards, setRenderCards] = useState([]);
  const initialValue = '-----------------'
  const [selectedProgram, setSelectedProgram] = useState(initialValue);
  const [type, setType] = useState('')
  const [imdb_id, setImdb_id] = useState('')
  const [selectedID, setSelectedID] = useState('')

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
              body: JSON.stringify({...values/* , name: selectedProgram, imdb_id: imdb_id */}),
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
      .then((data) => createProgramCards(data))
  }

  function handleClick(program) {
    console.log(program)
    program.title ? setSelectedProgram(program.title) : setSelectedProgram(program.name) 
    setImdb_id(program.id)
    setSelectedID(program.id)
    return (
      null
    )
  }
  console.log(imdb_id)
  console.log(selectedID)

  function createProgramCards(programs) {
  const programCards = programs.results.map(program => {
    // console.log(program.id)
  console.log(selectedID === program.id)
  
    return (
      <div key={program.id} >
        <ul className='searchcard' >
          <li>
            <h4> {program.title} <button onClick={() => handleClick(program)} > {selectedID === program.id ? 'Selected' : 'Select'} </button> </h4> 
          </li>
          <li>
            <h4> {program.overview} </h4>
            
          </li>
            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${program.poster_path}`} alt={program.title} />
        </ul>
      </div>

    )
  })
  // setRenderCards(programCards)
  return programCards
  }

  return (
    <div>
      <h2 style={{color:'red'}}> {form.errors.quality} </h2>
      <h2 style={{color:'red'}}> {form.errors.group_id} </h2>
      <h2 style={{color:'red'}}> {search.errors.type} </h2>
      <h2 style={{color:'red'}}> {search.errors.searchterm} </h2>
      <form className='requestform' onSubmit={form.handleSubmit} >
          <label> Name: {selectedProgram} </label>
          <label> Quality: </label>
          <select name='quality' value={form.values.quality} onChange={form.handleChange} >
              <option value='' >  </option>
              <option value='720p' > 720p </option>
              <option value='1080p' > 1080p </option>
              <option value='4k' > 4k </option>
          </select>
          <label> Group: </label>
          <select name='group_id' value={form.values.group_id} onChange={form.handleChange} >
              <option value='' > </option>
              {groupOptions}
          </select>
          <input className='button-30' type='submit' />
      </form>
      <br></br>
      <form onSubmit={search.handleSubmit}>
        <label> Type: </label>
        <select name='type' value={search.values.type} onChange={search.handleChange} >
            <option value='' >  </option>
            <option value='movie' > Movie </option>
            <option value='tv' > Show </option>
        </select>
        <input
          type="text"
          name='searchterm'
          value={search.values.searchterm}
          onChange={search.handleChange}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      <br></br>
      {buttonText}
      {/* {renderCards} */}
      {createProgramCards}
    </div>
  );
}

export default Search;