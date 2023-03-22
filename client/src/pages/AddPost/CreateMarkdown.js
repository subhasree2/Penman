import React, { useContext, useEffect, useState } from 'react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Helpers/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import ReactHtmlParser from 'react-html-parser';

function MarkdownEditor() {
    const [markdown, setMarkdown] = useState('');
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
        data.postText = marked(data.postText)

        axios.post("http://localhost:3001/posts", data, { headers: { accessToken: sessionStorage.getItem("accessToken") } }).then((response) => {
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
                        {
                            ({ field }) => 
                                <div className='markedit'>
                                    <textarea value={field.value} onChange={field.onChange(field.name)} />
                                    <div className='preview'>{ReactHtmlParser(marked(field.value))}</div>
                                </div>
                        }
                </Field>
                <ErrorMessage name="postText" component="div" />
                
                <button type='submit' className='createPost'>Create Post</button>
              </Form>
          </Formik>
      </div>
    );
  }

export default MarkdownEditor;
