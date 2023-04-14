import { useHistory, Link, Route } from 'react-router-dom'
import { useState, useEffect, React } from 'react'
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
        console.log(id)
        fetch(`/group/${id}`, {
            method: 'DELETE'
        }).then(() => setGroups(newGroups))
    }

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...values}),
            }).then((response) => {
                if(response.ok) {
                    response.json().then(() => {
                        // history.push('/editgroups')
                        fetchGroups()
                        // window.location.reload()
                    })
                }
            })
        }
    })

    const renderGroups = groups.map((group) => {
        return (
            <div key={group.id} >
            <ul className='groupcard' >
                <li key={group.id}> {group.name} </li>
                <button className='button-30' onClick={() => handleDelete(group.id)}> Delete </button>
            </ul>
            </div>
            )
    })
    return (
        <div>
            <h1> Edit Groups </h1>
            <h2 style={{color:'red'}}> {formik.errors.name} </h2>
            <form className='groupform' onSubmit={formik.handleSubmit}>
                <label> Name: </label>
                <textarea
                type='text'
                name='name'
                value={formik.values.text}
                onChange={formik.handleChange}
                />
                <input className='button-30' type='submit' />
            </form>
            <div className='groupscontainer'> {renderGroups} </div>
        </div>
    )
}

export default EditGroups