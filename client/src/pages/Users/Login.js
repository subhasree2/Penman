import { useContext, useState, useEffect } from "react";
import axios from "axios";
import LoginImg from "../../Images/Login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";

function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const { authStatus, setAuthStatus } = useContext(AuthContext);
    const Navigate = useNavigate("");

    useEffect(() => {
        if(authStatus.status) Navigate("/home");
    })

    const login = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        axios.post("http://localhost:3001/auth/login", data).then((res) => {
            if (res.data.error) alert(res.data.error);
            else {
                sessionStorage.setItem("accessToken", res.data.token);
                setAuthStatus({
                    username: res.data.username,
                    id: res.data.id,
                    status: true
                });
                Navigate("/home");
            }
        })
    }

    return (
        <div className="Login">
            <div className='LogImg'>
                <img src={LoginImg} alt="Login"/>
            </div>

            <div className="LoginContent">
                <h1>Login Page</h1>
                <form className="LoginContainer">
                    <label>Username : </label>
                    <input type="text" placeholder="John" onChange={(e) => setusername(e.target.value)} autoComplete="on" />

                    <label>Password : </label>
                    <input type="password" placeholder="12345" onChange={(e) => setpassword(e.target.value)} autoComplete="on" />

                    <button type='submit' className='loginUser' onClick={login}>Login</button>
                    <div>New User ? <Link to="/register">Register here!</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Login;