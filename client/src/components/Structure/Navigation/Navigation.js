import React from "react";
import "./Navigation.scss";

import NavigationItem from "./NavigationItem/NavigationItem";

//===============================================================================================================//

const navigation = props => (
  <nav>
    <ul>
      <NavigationItem link="/">Dashboard</NavigationItem>
      <NavigationItem link="/artists">Artists</NavigationItem>
      <NavigationItem link="/labels">Labels</NavigationItem>
      <NavigationItem link="/releases">Releases</NavigationItem>
			<NavigationItem link="/tracks">Tracks</NavigationItem>
      { props.isAuth
				? <NavigationItem link="/profile">Profile</NavigationItem>
      	: null
			}
			{ props.isAuth
				? <NavigationItem link="/logout">Logout</NavigationItem>
      	: <NavigationItem link="/auth">Login</NavigationItem>
			}
    </ul>
  </nav>
);

//===============================================================================================================//

export default navigation;
