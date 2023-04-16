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