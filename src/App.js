import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/loginForm";
import CreateNewForm from "./components/createNewForm";
import Togglable from "./components/Togglable";
import TogglableBlog from "./components/TogglableBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notify, setNotify] = useState("");
  const [errormsg, setErrormsg] = useState("");

  useEffect(
    () => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    },
    [],
    blogs
  );
  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const req = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(req));
      blogService.setToken(req.token);
      setUser(req);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrormsg(exception.response.data.error);
      setTimeout(() => {
        setErrormsg("");
      }, 2000);
    }
  };
  const msgErrorStyling = {
    padding: "12px",
    backgroundColor: "grey",
    color: "red",
    border: "1px solid red",
    borderRadius: "4px",
  };
  const msgStyling = {
    padding: "12px",
    backgroundColor: "grey",
    color: "green",
    border: "1px solid green",
    borderRadius: "4px",
  };
  const handleLike = async (blogId) => {
    try {
      await blogService.likeBlog(blogId);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };
  const handleDelete = async (blogID, blogtitle) => {
    try {
      if (window.confirm(`Do you really want to delete ${blogtitle}?`)) {
        await blogService.deleteBlog(blogID);
        const updatedBlogs = await blogService.getAll();
        setBlogs(updatedBlogs);
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };
  const blogsSOrted = blogs.sort((a, b) => b.liked.length - a.liked.length);
  return (
    <div>
      {user === null ? (
        <div>
          {errormsg && <p style={msgErrorStyling}>{errormsg}</p>}
          <Togglable label="login">
            <LoginForm
              username={username}
              password={password}
              setPassword={setPassword}
              setUsername={setUsername}
              handleLogin={handleLogin}
            />
          </Togglable>
        </div>
      ) : (
        <div>
          <h1>blogs</h1>
          {notify && <p style={msgStyling}> {notify}</p>}
          <h1>{user.username} has logged in</h1>
          <button
            onClick={() => {
              window.localStorage.clear();
              setUser(null);
            }}
          >
            Logout
          </button>
          <hr></hr>
          <h1>Create new</h1>
          <Togglable label="create new">
            <CreateNewForm setBlogs={setBlogs} setNotify={setNotify} />
          </Togglable>

          <h2>blogs</h2>
          {blogsSOrted.map((blog) => (
            <TogglableBlog key={blog.id} blog={blog.title} label="view">
              <Blog
                blog={blog}
                handleLike={() => handleLike(blog.id)}
                handleDelete={() => handleDelete(blog.id, blog.title)}
              />
            </TogglableBlog>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
