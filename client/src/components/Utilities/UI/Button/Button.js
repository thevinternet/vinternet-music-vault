import React from "react";

import "./Button.scss";

//===============================================================================================================//

const button = props => (
  <button
    className={["btn", ["btn--" + props.type]].join(" ")}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

//===============================================================================================================//

export default button;
