import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.scss";

//===============================================================================================================//

const navigationItem = props => (
  <li>
    <NavLink to={props.link} exact activeClassName={"test"}>
      {props.children}
    </NavLink>
  </li>
);

//===============================================================================================================//

export default navigationItem;
