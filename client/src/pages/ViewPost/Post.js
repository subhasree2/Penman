import { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { AuthContext } from "../../Helpers/AuthContext";
import Navbar from '../../components/Navbar';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [commentObject, setCommentObject] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authStatus } = useContext(AuthContext);
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
            setPostObject(response.data);
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setCommentObject(response.data);
        })
    }, [])

    const AddComment = (e) => {
        e.preventDefault();
        let data = {
            commentBody: newComment,
            PostId: id
        }
        axios.post("http://localhost:3001/comments/", data, {
            headers: { accessToken: sessionStorage.getItem("accessToken") }
        })
            .then((response) => {
                console.log(response);
                if (response.data.error) alert(response.data.error);
                else {
                    const AddComment = {
                        commentBody: newComment,
                        username: response.data.username,
                        id: response.data.id
                    };
                    setCommentObject([...commentObject, AddComment]);
                    setNewComment("");
                }
            })
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: { accessToken: sessionStorage.getItem("accessToken") },
        })
            .then(() => {
                setCommentObject(commentObject.filter((val) => {
                    return val.id !== id;
                })
                )
            })
    }

    const deletePost = (id) => {
        console.log(id);
        axios.delete(`http://localhost:3001/posts/${id}`, {
            headers: { accessToken: sessionStorage.getItem("accessToken") },
        })
            .then((res) => {
                Navigate("/home");
            })
    }

    const EditPost = (Id) => {
        Navigate(`/edit/${Id}`);
    }


    return (
        <div className='PostPage'>
            <Navbar />
            <div className='postContent'>
                <div className='icons'>
                    {authStatus.id === postObject.UserId && <button onClick={() => deletePost(postObject.id)}><i className='bi bi-trash-fill'></i>Delete Post</button>}
                    {authStatus.id === postObject.UserId && <button onClick={() => EditPost(postObject.id)} className='Edit'><i class="bi bi-pencil-square"></i>Update Post</button>}
                </div>
                <h3 className='PostTitle'>{postObject.title}</h3>
                <div className='PostAuthor'>By @{postObject.username}</div>
                <hr />
                <div className='PostBody'>{ReactHtmlParser(postObject.postText)}</div>
                <hr />
            </div>
            <div className='Comments'>
                <h1>Comments</h1>
                <div className='AddComment'>
                    <form>
                        <textarea placeholder='Leave a constructive comment ...' value={newComment} autoCorrect='on' onChange={(e) => setNewComment(e.target.value)} />
                        <button onClick={AddComment}>Submit</button>
                    </form>
                </div>
                <div className='ShowComment'>
                    {commentObject.map((comment, key) => {
                        return (
                            <div className='Comment'>
                                <div className='Commentuser'>{comment.username}</div>
                                <div className='Commentbody'>{comment.commentBody}</div>
                                {authStatus.username === comment.username && <i class="bi bi-trash-fill" onClick={() => deleteComment(comment.id)}></i>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post;

// id -> exact parameter name used during routing 