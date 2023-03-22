import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/AddPost/CreatePost";
import Post from "./pages/ViewPost/Post";
import CreateEditor from "./pages/AddPost/CreateEditor";
import Login from "./pages/Users/Login";
import Register from "./pages/Users/Register";
import { useState, useEffect } from "react";
import { AuthContext } from "./Helpers/AuthContext";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Users/Profile";
import LikedPosts from "./pages/ViewPost/LikedPosts";
import Details from "./pages/Users/Details";
import MarkdownEditor from "./pages/AddPost/CreateMarkdown";
import EditPost from "./pages/EditPost/EditPost";
import ChangePassword from "./pages/Users/ChangePassword";

function App() {
  const [authStatus, setAuthStatus] = useState({
    username: "",
    id: 0,
    status: false
  });

  useEffect(() => {
    axios.get('http://localhost:3001/auth/user', {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then((res) => {
      if (res.data.error) setAuthStatus({
        ...authStatus, status: false
      });
      else {
        setAuthStatus({
          username: res.data.username,
          id: res.data.id,
          status: true
        });
      }
    })
  }, [authStatus])

  return (
    <div className="App">
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/createposteditor" element={<CreateEditor />} />
            <Route path="/markdown" element={<MarkdownEditor />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details" element={<Details />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/changepwd" element={<ChangePassword />} />
            <Route path="/liked" element={<LikedPosts />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App;
