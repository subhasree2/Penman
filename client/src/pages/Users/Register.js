import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import RegisterImg from "../../Images/Register.webp";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Helpers/AuthContext';

function Register() {
    const Navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        if(authStatus.status) Navigate("/home");
    })

    const initialValues = {
        username: "",
        password: "",
        emailId: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((res) => {
            console.log(res);
            Navigate("/details");
        })
    }

    return (
        <div className='Register'>
            <div className='RegImg'>
                <img src={RegisterImg} alt="Registration"/>
            </div>

            <div className='RegContent'>
                <h1>Registration Form</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className='RegContainer'>
                        <label>Username : </label>
                        <Field id="inputCreateUser" name="username" placeholder="John" />
                        <ErrorMessage name="username" component="div" />

                        <label>Email Id : </label>
                        <Field id="inputCreateUser" name="emailId" placeholder="abc@gmail.com" />
                        <ErrorMessage name="emailId" component="div" />

                        <label>Password : </label>
                        <Field id="inputCreateUser" name="password" placeholder="12345" type="password" />
                        <ErrorMessage name="password" component="div" />

                        <button type='submit' className='createUser'>Create User</button>
                        <div>Already have an account ? <Link to="/login">Login here</Link></div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Register;