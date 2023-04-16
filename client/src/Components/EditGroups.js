import { useHistory, Link } from 'react-router-dom'
import { useEffect, React } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

function EditGroups({groups, fetchGroups, setGroups}) {
    useEffect(() => {fetchGroups()}, [])
    const history = useHistory()
    const formSchema = yup.object().shape({
            name: yup.string().required('Enter group name, dummy!')
        })

    function handleDelete(id) {
        const newGroups = groups.filter(group => {
            return group.id !== id
        })
        fetch(`/group/${id}`, {
            method: 'DELETE'
        }).then(() => setGroups(newGroups))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: (values, {resetForm}) => {
            fetch('/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...values}),
            }).then((response) => {
                if(response.ok) {
                    response.json().then((data) => {
                        history.push('/editgroups')
                        fetchGroups()
                        resetForm({ values: ''})
                        fetch('/groupusers', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({user_id: data.user_id, group_id: data.id}),
                        }).then(res => res.json()).then(data => console.log(data))
                    })
                }
            })
        }
    })

    console.log(groups)
    const renderGroups = groups.map((group) => {
        return (
            <div key={group.id} >
            <ul className='groupcard' >
                <li > {group.name} </li>
                <button className='button-30' onClick={() => handleDelete(group.id)} > Delete </button>
                <Link to={`/addusers/${group.id}`} > Add Users </Link>
            </ul>
            </div>
            )
    })
    return (
        <div>
            <h1> Edit Groups </h1>
            <h2 style={{color:'red'}} > {formik.errors.name} </h2>
            <form className='groupform' onSubmit={formik.handleSubmit}>
                <label> Name: </label>
                <textarea
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                />
                <input className='button-30' type='submit' />
            </form>
            <div className='groupscontainer' > {renderGroups} </div>
        </div>
    )
}

export default EditGroups