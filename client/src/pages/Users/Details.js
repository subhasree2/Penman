import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Helpers/AuthContext';

function Details() {
    const Navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        if(authStatus.status) Navigate("/home");
    })

    const initialValues = {
        description : "",
        location : "",
        Link : ""
    };

    const validationSchema = Yup.object().shape({
        description : Yup.string().max(100).required(),
        location: Yup.string().required(),
        Link: Yup.string()
    })

    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3001/auth/details", data).then((res) => {
            console.log(res);
        })
        Navigate("/login");
    }

    return (
        <div className='Details'>
            <div className='DetailsContent'>
                <h1>Additional Details</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className='DetailsContainer'>
                        <label>Description : </label>
                        <Field as="textarea" id="description" name="description" placeholder="I'm a ..." />
                        <ErrorMessage name="description" component="div" />

                        <label>Location : </label>
                        <Field id="location" name="location" placeholder="Chennai" />
                        <ErrorMessage name="location" component="div" />

                        <label>Website : </label>
                        <Field id="Link" name="Link" placeholder="Link to know more about you" />
                        <ErrorMessage name="Link" component="div" />

                        <button type='submit' className='details'>Add Details</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Details;