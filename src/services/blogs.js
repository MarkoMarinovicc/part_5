import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};
const postBlog = async (payload) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, payload, config);
  const response = await request;
  return response.data;
};

const likeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(
    `http://localhost:3003/api/blogs/like/${id}`,
    null,
    config
  );
  const response = await request;
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`http://localhost:3003/api/${id}`, config);
  const response = await request;
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, postBlog, setToken, likeBlog,deleteBlog };
