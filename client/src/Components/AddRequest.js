import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

function AddRequest({groups, fetchGroups}) {
    useEffect(() => {fetchGroups()}, [])
    const formSchema = yup.object().shape({
            name: yup.string().required('Enter name, dummy!'),
            type: yup.string().required('Enter type, dummy!'),
            quality: yup.string().required('Enter quality, dummy!')
        })
    const formik = useFormik({
        initialValues: {
            name: '',
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
                body: JSON.stringify({...values}),
            }).then((response) => {
                if(response.ok) {
                    response.json().then(request => {
                        resetForm({ values: ''})
                    })
                }
            })
        }
    })
    const groupOptions = groups.map(group => {
        return (
            <option value={group.id} key={group.id} > {group.name} </option>
        )
    })
    return (
        <div>
            <h1> Add Request </h1>
            <h2 style={{color:'red'}}> {formik.errors.name} </h2>
            <h2 style={{color:'red'}}> {formik.errors.type} </h2>
            <h2 style={{color:'red'}}> {formik.errors.quality} </h2>
            <form className='requestform' onSubmit={formik.handleSubmit} >
                <label> Name: </label>
                <textarea type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
                <label> Type: </label>
                <select name='type' value={formik.values.type} onChange={formik.handleChange} >
                    <option value='' >  </option>
                    <option value='Movie' > Movie </option>
                    <option value='Show' > Show </option>
                </select>
                <label> Quality: </label>
                <select name='quality' value={formik.values.quality} onChange={formik.handleChange} >
                    <option value='' >  </option>
                    <option value='720p' > 720p </option>
                    <option value='1080p' > 1080p </option>
                    <option value='4k' > 4k </option>
                </select>
                <label> Group: </label>
                <select name='group_id' value={formik.values.group_id} onChange={formik.handleChange} >
                    {groupOptions}
                </select>
                <input className='button-30' type='submit' />
            </form>
        </div>
    )
}

export default AddRequest