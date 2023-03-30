import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import { AuthContext } from "../../Helpers/AuthContext";

function Profile() {
    let { id } = useParams();
    const [basicInfo, setbasicinfo] = useState({});
    const [details, setdetails] = useState({});
    const [listOfPosts, setPosts] = useState([]);
    const Navigate = useNavigate();
    const { authStatus } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/userinfo/${id}`).then((res) => {
            setbasicinfo(res.data.basicInfo);
            setdetails(res.data.details);
        })

        axios.get(`http://localhost:3001/posts/user/${id}`).then((res) => {
            setPosts(res.data);
        })
    }, [id])
    
    let d = new Date(Date.parse(basicInfo.createdAt));

    return (
        <>
            <Navbar />
            <div className="Profile">
                <div className="userDesc">
                    <div className="Image">
                        <i class="bi bi-person"></i>
                    </div>
                    <div className="Desc">
                        <div className="Name">{basicInfo.username}</div>
                        <Link to={`mailto:${basicInfo.emailId}?&subject=Feedback from the users`}><i class="bi bi-envelope-at-fill"></i>{basicInfo.emailId}</Link>
                        <div className="details"><i class="bi bi-lightbulb-fill"></i>{details.description}</div>
                    </div>
                    <div className="additional">
                        <div className="Date">Joined on {d.toDateString()}</div>
                        <div>Location : {details.location}</div>
                        {details.Link !== "" && <a href={"https://" + details.Link}>To know about me : {details.Link}</a>}
                        {basicInfo.id === authStatus.id && <button><Link to="/changepwd"><i class="bi bi-key-fill"></i>Change Password</Link></button>}
                    </div>
                </div>

                <h1>My Posts</h1>
                <div className="Posts">
                    {listOfPosts.map((value, key) => {
                        return (
                            <div className="post">
                                <div className="title">{value.title}</div>
                                <div className="footer">By @{value.username}</div>
                                <div className="body">{ReactHtmlParser(value.postText)}</div>
                                <div className="icons">
                                    <i className="bi bi-hearts"></i>
                                    <span>{value.Likes.length}</span>
                                    <button onClick={() => Navigate(`/post/${value.id}`)}>View Post</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Profile;
