import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const CreateNewForm = ({ setBlogs, setNotify }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await blogService.postBlog({ title, author, url });
      const updatedBlogs = await blogService.getAll();
      setNotify(`a new blog ${title} by ${author}`);
      setAuthor("");
      setTitle("");
      setUrl("");
      setBlogs(updatedBlogs);
      setTimeout(() => {
        setNotify("");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={title}
          name="Title"
          placeholder="Title"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
        <input
          type="text"
          value={author}
          name="Author"
          placeholder="Author"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
        <input
          type="text"
          value={url}
          name="URL"
          placeholder="URL"
          onChange={({ target }) => setUrl(target.value)}
        ></input>
        <button onClick={handleCreate}>create</button>
      </form>
    </div>
  );
};
CreateNewForm.PropType = {
  setBlogs: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
};
export default CreateNewForm;
