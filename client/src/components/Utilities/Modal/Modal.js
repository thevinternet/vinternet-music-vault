import React from "react";

import "./Modal.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import Backdrop from "../UI/Backdrop/Backdrop";

//===============================================================================================================//

const modal = props => (
  <Auxiliary>
    <Backdrop show={props.show} clicked={props.hide} />
    <div
      className={"modal"}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Auxiliary>
);

//===============================================================================================================//

export default modal;
