import React from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.url && <span>{blog.url} </span>}
      {blog.liked && (
        <span>
          {blog.liked?.length}
          <button onClick={handleLike}>
            {blog.user && blog.liked.includes(blog.user[0].id)
              ? "unlike"
              : "like"}
          </button>
        </span>
      )}{" "}
      {blog.author && <span>{blog.author}</span>}
      {blog.user && (
        <div>
          Users:
          {blog.user.map((user) => (
            <span key={user.id}>{user.username}</span>
          ))}
        </div>
      )}
      <button onClick={handleDelete}>Remove</button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
