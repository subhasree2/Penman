import { useContext, useEffect, useState } from "react";
import PwdImage from "../../Images/Password.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import axios from 'axios';

function ChangePassword() {
    const [oldpassword, setoldpassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [checkpwd, setcheckpwd] = useState("");
    const { authStatus } = useContext(AuthContext);
    const Navigate = useNavigate("");

    useEffect(() => {
        if (!authStatus.status) Navigate("/login");
    })

    const Updatepwd = () => {
        if (newpassword !== checkpwd) alert("New password doesnt match");
        else {
            axios.put("http://localhost:3001/auth/changepwd", { Old: oldpassword, New: newpassword }, {
                headers: { accessToken: sessionStorage.getItem("accessToken") }
            }
            ).then((res) => {
                if (res.data.error) alert(res.data.error);
            })
        }
    }

    return (
        <div className="Changepwd">
            <div className='PwdImg'>
                <img src={PwdImage} alt="Password"/>
            </div>

            <div className="ChangePwdContent">
                <h1>Update Password</h1>
                <form className="PwdContainer">
                    <label>Old Password : </label>
                    <input type="password" placeholder="54321" onChange={(e) => setoldpassword(e.target.value)} autoComplete="on" />

                    <label>New Password : </label>
                    <input type="password" placeholder="12345" onChange={(e) => setnewpassword(e.target.value)} autoComplete="on" />

                    <label>Confirm New Password : </label>
                    <input type="password" placeholder="12345" onChange={(e) => setcheckpwd(e.target.value)} autoComplete="on" />

                    <button type='submit' className='Change pwd' onClick={Updatepwd}>Change password</button>
                    <div>Go to home page -&gt; <Link to="/home">Home</Link></div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;