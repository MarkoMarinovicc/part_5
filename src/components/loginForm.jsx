import React from "react";
import PropTypes from 'prop-types'

const LoginForm = ({username,password,setPassword,setUsername,handleLogin}) => {
    
  return (
    <>
      <form>
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button id="submit" type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm;
