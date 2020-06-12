import React from "react";

import "./Header.scss";

import Navigation from "../Navigation/Navigation";

//===============================================================================================================//

const header = props => {
  return (
    <header>
      <Navigation isAuth={props.isAuthenticated} />
      <div>{props.children}</div>
    </header>
  );
};

//===============================================================================================================//

export default header;
