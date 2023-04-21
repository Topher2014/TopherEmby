/groups/<id>/request
/requests?
const groupID = match ? match.params.groupId : null
<h2 style={{color:'red'}}> {formik.errors.name}</h2>
https://github.com/BrettdeBear/SENG-LIVE-Phase-4-flask-010923/blob/main/06-Auth-pt2/client/src/components/Authentication.js

    // const [name, setName] = useState('')
    // const [formData, setFormData] = useState([])
    //     function handleChange(event){
    //         console.log(event.target.value)
    //         setName(event.target.value)
    //     }
    //     function handleSubmit(values){
    //         <h2 style={{color:'red'}}> {formik.errors.name} </h2>
    //         values.preventDefault()
    //         const data = {name: name}
    //         const array = [...formData, data]
    //         setFormData(array)
    //         console.log(values.target[0].value)
    //         fetch('/groups', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({...values}),
    //         }).then((response) => {
    //             if(response.ok) {
    //                 response.json().then(() => {
    //                     // history.push('/editgroups')
    //                     fetchGroups()
    //                     // window.location.reload()
    //                 })
    //             }
    //         })
    //     }
            <form className='groupform' onSubmit={handleSubmit}>
                value={name}
                onChange={handleChange}
                
                
                onBlur={formik.handleBlur} 
        validateOnBlur: true,

// window.location.reload()
const mappedUsers = groups.map(group => group.groupuser.map(groupuser => groupuser.users))
//

search while typing
function Search() {
  const [movies, setMovies] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  function searchMovies() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a09c757d39c1b519b0f90f145b75e716&query=${searchTerm}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data));
    console.log(movies)
  }
    // fetch('https://api.themoviedb.org/3/search/movie?api_key=a09c757d39c1b519b0f90f145b75e716&query=Jack+Reacher')

  useEffect(() => {
    if (searchTerm) {
      searchMovies();
    }
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      {/* Render movies here */}
    </div>
  );
}

export default Search;