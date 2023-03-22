import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Navbar from "../components/Navbar";
import { AuthContext } from "../Helpers/AuthContext";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authStatus } = useContext(AuthContext);
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/posts",
            { headers: { accessToken: sessionStorage.getItem("accessToken") } }
        )
            .then((response) => {
                if (response.data.error) {
                    alert("User not logged In!");
                    Navigate("/login");
                }
                setListOfPosts(response.data.listOfPosts);
                setLikedPosts(response.data.likedPosts.map((like) => { return like.PostId }));
            })
    }, [authStatus.id])

    const likePost = (PostId) => {
        axios.post("http://localhost:3001/likes",
            { PostId: PostId },
            { headers: { accessToken: sessionStorage.getItem("accessToken") } })
            .then((res) => {
                setListOfPosts(listOfPosts.map((post) => {
                    if (post.id === PostId) {
                        if (res.data.liked) return { ...post, Likes: [...post.Likes, 0] };
                        else {
                            const likesArray = post.Likes;
                            likesArray.pop();
                            return { ...post, Likes: likesArray };
                        }
                    }
                    else return post;
                }))

                if (likedPosts.includes(PostId)) {
                    setLikedPosts(likedPosts.filter((id) => { return id !== PostId }));
                }
                else setLikedPosts([...likedPosts, PostId]);
            })
    }

    return (
        <div className="PostsPage">
            <Navbar />
            <h1 className="Title">The Author's Thoughts</h1>
            <div className="Posts">
                {listOfPosts.map((value, key) => {
                    return (
                        <div className="post">
                            <div className="title">{value.title}</div>
                            <div className="footer"><Link to={`/profile/${value.UserId}`}>By @{value.username}</Link></div>
                            <div className="body">{ReactHtmlParser(value.postText)}</div>
                            <div className="icons">
                                <i className={likedPosts.includes(value.id) ? "bi bi-heart-fill" : "bi bi-heart"} onClick={() => likePost(value.id)}></i>
                                <span>{value.Likes.length}</span>
                                <button onClick={() => Navigate(`/post/${value.id}`)}>View Post</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;