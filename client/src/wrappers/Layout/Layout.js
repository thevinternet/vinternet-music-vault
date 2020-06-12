import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Layout.scss";

import Auxiliary from "../Auxiliary/Auxiliary";
import Header from "../../components/Structure/Header/Header";
import Footer from "../../components/Structure/Footer/Footer";

//===============================================================================================================//

class Layout extends Component {
  state = {
    isAuthenticated: false
  };

  render() {
    return (
      <Auxiliary>
        <Link
          to={{ hash: "#content" }}
          className="skip-to-content"
          id="skiplink"
        >
          Skip to main content
        </Link>
        <Header isAuthenticated={this.state.isAuthenticated} />
        <main id="content">{this.props.children}</main>
        <Footer />
      </Auxiliary>
    );
  }
}

//===============================================================================================================//

export default Layout;
