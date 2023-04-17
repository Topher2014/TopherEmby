import { useState } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'

function Search({groupOptions}) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [type, setType] = useState('')
  const formSchema = yup.object().shape({
          name: yup.string().required('Enter a name, dummy!'),
          type: yup.string().required('You really should add a type, dummy!'),
          quality: yup.string().required('You really should add a quality, dummy!')
      })
  const form = useFormik({ 
      enableReinitialize:true,
      initialValues: {
          name: selectedMovie,
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
              body: JSON.stringify({...values, name: selectedMovie}),
          }).then((response) => {
              if(response.ok) {
                      resetForm({ values: ''})
              }
          })
      }
  })

  const searchSchema = yup.object().shape({
    type: yup.string().required('What is your type?'),
    searchterm: yup.string().required('You need a search term, dummy!'),
  })
  const search = useFormik({
    // enableReinitialize:true,
    initialValues: {
      type: '',
      searchterm: '',
      // searchterm: searchQuery 
    },
    validationSchema: searchSchema,
    validateOnChange: false,
    onSubmit: (event) => {
      // console.log(event.searchterm)
      searchMovies(event)
    }
  })

  function handleClick(movie) {
    console.log(movie)
    setSelectedMovie(movie.title)
    return (
      null
    )
  }
  console.log(selectedMovie)
  function searchMovies(e) {
    // e.preventDefault();
    console.log(e.type)
    console.log(e.searchterm)
    fetch(
      `https://api.themoviedb.org/3/search/${e.type}?api_key=a09c757d39c1b519b0f90f145b75e716&query=${e.searchterm}`
    )
      .then((res) => res.json())
      .then((data) => renderMovies(data))
  }

  // function searchMovies(e) {
  //   e.preventDefault();
  //   console.log(e)
  //   fetch(
  //     `https://api.themoviedb.org/3/search/movie?api_key=a09c757d39c1b519b0f90f145b75e716&query=${encodeURIComponent(
  //       searchQuery
  //     )}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => renderMovies(data))
  // }
  function renderMovies(movies) {
  console.log(movies.results)
  const movieCards = movies.results.map(movie => {
    return (
      <div key={movie.id} >
        <ul className='searchcard' >
          <li>
            <h4> {movie.title} </h4> <button onClick={() => handleClick(movie)} > Search </button>
          </li>
          <li>
            <h4> {movie.overview} </h4>
          </li>
            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`} alt={movie.title} />
        </ul>
      </div>

    )
  })
  setMovies(movieCards)
  return null
  }

  function handleInputChange(event) {
    setSearchQuery(event.target.value);
  }
  function test(e){
    e.preventDefault()
    console.log(e.target[0].value)
    setType(e.target[0].value)
    console.log(type)
  }

  return (
    <div>
      <h2 style={{color:'red'}}> {form.errors.name} </h2>
      <h2 style={{color:'red'}}> {form.errors.type} </h2>
      <h2 style={{color:'red'}}> {form.errors.quality} </h2>
      <h2 style={{color:'red'}}> {search.errors.type} </h2>
      <h2 style={{color:'red'}}> {search.errors.searchterm} </h2>
      <form className='requestform' onSubmit={form.handleSubmit} >
          <label> Name: {selectedMovie} </label>
          {/* <output type='text' name='name' value={formik.values.name} onChange={formik.handleChange} > {selectedMovie} </output> */}
          {/* <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} /> */}
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
              {/* <option value={groupOptions} > {groupOptions} </option> */}
              {groupOptions}
          </select>
          <input className='button-30' type='submit' />
      </form>
      {/* <h1>Search</h1> */}
      <br></br>
      {/* <form onSubmit={(e) => {test(e);search.handleSubmit()}}> */}
      <form onSubmit={search.handleSubmit}>
        <label> Type: </label>
        {/* <select name='type' value={form.values.type} onChange={() => {form.handleChange(); setType()}} > */}
        {/* <select name='type' value={search.values.type} onChange={() => {search.handleChange(); setType('Movie')}} > */}
        <select name='type' value={search.values.type} onChange={search.handleChange} >
            <option value='' >  </option>
            <option value='movie' > Movie </option>
            <option value='show' > Show </option>
        </select>
        <input
          type="text"
          name='searchterm'
          // value={searchQuery}
          value={search.values.searchterm}
          // onChange={handleInputChange}
          onChange={search.handleChange}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      {movies}
    </div>
  );
}

export default Search;