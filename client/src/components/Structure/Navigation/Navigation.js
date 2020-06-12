import React from "react";
import "./Navigation.scss";

import NavigationItem from "./NavigationItem/NavigationItem";

//===============================================================================================================//

const navigation = props => (
  <nav>
    <ul>
      <NavigationItem link="/">Dashboard</NavigationItem>
      {!props.isAuth ? (
        <NavigationItem link="/artists">Artists</NavigationItem>
      ) : null}
      {!props.isAuth ? (
        <NavigationItem link="/labels">Labels</NavigationItem>
      ) : null}
      {!props.isAuth ? (
        <NavigationItem link="/releases">Releases</NavigationItem>
      ) : null}
      {/* {props.isAuth ? (
        <NavigationItem link="/logout">Sign Out</NavigationItem>
      ) : null}
      {!props.isAuth ? (
        <NavigationItem link="/auth">Sign In</NavigationItem>
      ) : null} */}
    </ul>
  </nav>
);

//===============================================================================================================//

export default navigation;
