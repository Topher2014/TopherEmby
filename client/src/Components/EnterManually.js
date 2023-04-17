import { useFormik } from 'formik'
import * as yup from 'yup'

function EnterManually({buttonText, groupOptions}) {
    const formSchema = yup.object().shape({
            name: yup.string().required('Enter a name, dummy!'),
            type: yup.string().required('You really should add a type, dummy!'),
            quality: yup.string().required('You really should add a quality, dummy!'),
            group_id: yup.number().required('Choose a group, dummy!')
        })
    const form = useFormik({
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
                        resetForm({ values: ''})
                }
            })
        }
    })
  
    return (
        <div>
            {/* <h1> Add Request </h1> */}
            <h2 style={{color:'red'}}> {form.errors.name} </h2>
            <h2 style={{color:'red'}}> {form.errors.type} </h2>
            <h2 style={{color:'red'}}> {form.errors.quality} </h2>
            <h2 style={{color:'red'}}> {form.errors.group_id} </h2>
            <form className='requestform' onSubmit={form.handleSubmit} >
                <label> Name: </label>
                <input type='text' name='name' value={form.values.name} onChange={form.handleChange} />
                <label> Type: </label>
                <select name='type' value={form.values.type} onChange={form.handleChange} >
                    <option value='' >  </option>
                    <option value='movie' > Movie </option>
                    <option value='tv' > Show </option>
                </select>
                <label> Quality: </label>
                <select name='quality' value={form.values.quality} onChange={form.handleChange} >
                    <option value='' >  </option>
                    <option value='720p' > 720p </option>
                    <option value='1080p' > 1080p </option>
                    <option value='4k' > 4k </option>
                </select>
                <label> Group: </label>
                <select name='group_id' value={form.values.group_id} onChange={form.handleChange} >
                    <option value='' >  </option>
                    {groupOptions}
                </select>
                <input className='button-30' type='submit' />
            </form>
            <br></br>
            {buttonText}
        </div>
    )
}

export default EnterManually