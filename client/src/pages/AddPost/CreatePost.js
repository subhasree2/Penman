import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useEffect, useContext } from 'react';
import { AuthContext } from "../../Helpers/AuthContext";
import Navbar from '../../components/Navbar';
import ReactHtmlParser from 'react-html-parser';

const Quill = ReactQuill.Quill;
let Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik", "Sans-Serif", "Times New Roman"];
Quill.register(Font, true);

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: Font.whitelist }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
        ]
    ]
};

const formats = [
    "header", "font", "bold", "italic", "underline", "strike", "blockquote", "background", "code", "script", "list",
    "bullet", "indent", "link", "image", "video",
];

function CreatePost() {
    const { authStatus } = useContext(AuthContext);
    const Navigate = useNavigate();

    useEffect(() => {
        if (!authStatus.status) {
            alert("User not logged In!");
            Navigate("/login");
        }
    }, []);

    const initialValues = {
        title: "",
        postText: "",
        UserId: 0,
        username: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).max(250).required(),
        postText: Yup.string().min(10).required()
    })

    const onSubmit = (data) => {
        data.UserId = authStatus.id;
        data.username = authStatus.username;
        axios.post("http://localhost:3001/posts", data, { headers: { accessToken: sessionStorage.getItem("accessToken") } }).then((response) => {
            console.log(data);
            Navigate("/home");
        }
        );
    }

    return (
        <div className='createPostPage'>
            <Navbar />
            <h1 className='title'>Post your thoughts!</h1>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Title : </label>
                    <Field id="inputCreatePost" name="title" placeholder="Books" />
                    <ErrorMessage name="title" component="div" />

                    <label>Post : </label>
                    <Field as="textarea" id="TextCreatePost" name="postText" placeholder="">
                        {({ field }) => 
                                <div className='textedit'>
                                    <ReactQuill theme='snow' value={field.value} onChange={field.onChange(field.name)} modules={modules} formats={formats} />
                                    <div className='preview'>{ReactHtmlParser(field.value)}</div>
                                </div>
                        }
                    </Field>
                    <ErrorMessage name="postText" component="div" />

                    <button type='submit' className='createPost'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost;