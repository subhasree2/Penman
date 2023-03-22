import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";

function LikedPosts() {
    const [likedPosts, setLikedPosts] = useState([]);
    const [listOfPosts, setListOfPosts] = useState([]);
    const Navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        if(!authStatus.status) {
            Navigate("/login");
        }

        axios.get("http://localhost:3001/posts/liked",
            { headers: { accessToken: sessionStorage.getItem("accessToken") } })
            .then((res) => {
                setLikedPosts(res.data.likedPosts.map((like) => { return like.PostId }));
                setListOfPosts(res.data.listOfPosts);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const UnlikePost = (PostId) => {
        axios.post("http://localhost:3001/likes",
            { PostId: PostId },
            { headers: { accessToken: sessionStorage.getItem("accessToken") }})
            .then((res) => {
                setLikedPosts(likedPosts.filter((id) => { return id!==PostId }));
            })
    }

    return (
        <div className="MyPostsPage">
            <Navbar />
            <h1>Liked posts</h1>
            <div className="myposts">
                {listOfPosts.map((post, key) => {
                    if (likedPosts.includes(post.id)) {
                        return (
                            <div className="content">
                                <div className="title">{post.title}</div>
                                <div className="footer">By @{post.username}</div>
                                <div className="body">{ReactHtmlParser(post.postText)}</div>
                                <div className="icons">
                                    <i className="bi bi-heart-fill" onClick={() => UnlikePost(post.id)}></i>
                                    <button onClick={() => Navigate(`/post/${post.id}`)}>View Post</button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default LikedPosts;