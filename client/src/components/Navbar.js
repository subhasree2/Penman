import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

function Navbar() {
    const { setAuthStatus, authStatus } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const Navigate = useNavigate();

    const Clear = () => {
        sessionStorage.removeItem("accessToken");
        setAuthStatus({
            username: "",
            id: 0,
            status: false
        });
        Navigate("/login");
    }


    return (
        <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
            <div className="Navbar">
                <span><Link to="/home">Home Page</Link></span>

                <span onClick={() => show ? setShow(false) : setShow(true)}>Add Posts</span>

                {show &&
                <div className="dropdown">
                    <span className="menu"><Link to="/createpost">Text Editor</Link></span>
                    <span className="menu"><Link to="/markdown">Markdown Editor</Link></span>
                </div>
                }

                <span><Link to="/liked">Liked Posts</Link></span>

                {!authStatus.status &&
                    <>
                        <span><Link to="/login">Login</Link></span>
                        <span><Link to="/register">Register</Link></span>
                    </>
                }
                {authStatus.status &&
                    <>
                        <span onClick={Clear} style={{ color: 'white' }}>Logout</span>
                        <Link to={`/profile/${authStatus.id}`}><i class="bi bi-person-fill-gear" style={{ fontSize: '35px' }}></i></Link>
                    </>
                }
            </div>
        </AuthContext.Provider>
    )
}

export default Navbar;
