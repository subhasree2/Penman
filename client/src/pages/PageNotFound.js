import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="Notfound">
            <span className="Error">404</span>
            <span className="content">Page Not found!</span>
            <span className="contentii">The page you are looking for might have been removed had its name changed or is temporarily unavailable</span>
            <div>Go to <Link to="/home">Home</Link></div>
        </div>
    )
}

export default PageNotFound;