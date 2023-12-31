import React, { useState } from "react";
import PropTypes from "prop-types";

const TogglableBlog = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={{ display: "flex" }}>
          <p className="test">{props.blog}</p>
          <button id={props.label+props.index} onClick={toggleVisibility}>{props.label}</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  );
});

TogglableBlog.propTypes = {
  label: PropTypes.string.isRequired,
};

export default TogglableBlog;
