import React, { useRef } from "react";
import he from "he";

import "./StatusMessage.scss";

import Button from "../Button/Button";

import SetElementFocus from "../../../../hooks/accessibility/SetElementFocus";

//===============================================================================================================//

const StatusMessage = props => {

	const statusMessageButton = useRef(null);
	SetElementFocus(statusMessageButton, "Status Effect Effect Running!")

	return (
		<div
			className={["status--highlight", ["theme--" + props.status]].join(" ")}
			aria-live="polite"
			role="status"
		>
			<h2>{he.decode(props.headline)}</h2>
			{props.message.length ? (
				<ul>
					{props.message.map((message, index) =>
						<li key={index}>
							{he.decode(`${message.msg} | value passed = '${message.value}'`)}
						</li>
					)}
					<li>{he.decode(props.response)}</li>
				</ul>
			) : null }
			<Button type={props.status} clicked={props.action} elmRef={statusMessageButton}>
				{props.buttonText}
			</Button>
		</div>
	);
};

//===============================================================================================================//

export default StatusMessage;
