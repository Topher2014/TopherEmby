import { useEffect } from 'react'
import { useFormik } from 'formik'

function AddRequest({groups, fetchGroups}) {
    useEffect(() => {fetchGroups()}, [])
    console.log(groups)
    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            quality: ''
        }
    })
    return (
        <div>
            <h1> Add Request </h1>
            <form className='requestform' onSubmit={formik.handleSubmit} >
                <label> Name: </label>
                <textarea type='text' name='name' value={formik.values.text} onChange={formik.handleChange} />
                <label> Type: </label>
                <select name='type' value={formik.values.type} onChange={formik.handleChange} >
                    <option value='Movie' > Movie </option>
                    <option value='Show' > Show </option>
                </select>
                <label> Quality: </label>
                <select name='quality' value={formik.values.quality} onChange={formik.handleChange} >
                    <option value='720p' > 720p </option>
                    <option value='1080p' > 1080p </option>
                    <option value='4k' > 4k </option>
                </select>
            </form>
        </div>
    )
}

export default AddRequest