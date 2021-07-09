import React from "react";

import "./Backdrop.scss";

//===============================================================================================================//

const backdrop = props =>
	props.show ? (
		<div className={"backdrop"} onClick={props.clicked}></div>
	) : null;

export default backdrop;
