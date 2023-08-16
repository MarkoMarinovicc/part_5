import React from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleDelete,user }) => {
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
          <button
            id={
              blog.user && blog.liked.includes(blog.user[0].id)
                ? "unlike"
                : "like"
            }
            onClick={handleLike}
          >
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
      {user.username===blog.user[0].username ? (
        <button id="remove" onClick={handleDelete}>
          Remove
        </button>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
