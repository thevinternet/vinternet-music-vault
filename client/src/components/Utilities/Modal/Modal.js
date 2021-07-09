import React, { useRef } from "react";
import he from "he";

import "./Modal.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import Backdrop from "../UI/Backdrop/Backdrop";
import Button from "../UI/Button/Button";

import SetElementFocus from "../../../hooks/accessibility/SetElementFocus";

//===============================================================================================================//

const Modal = props => {

	const modalButton = useRef(null);
	SetElementFocus(modalButton, "Modal Effect Running!")

	return (
		<Auxiliary>
			<Backdrop show={props.show} clicked={props.hide} />
			<div
				className={"modal"}
				style={{
					transform: props.show ? "translateY(0)" : "translateY(-100vh)",
					opacity: props.show ? "1" : "0"
				}}
				aria-live="polite"
				aria-modal="true"
				role="dialog"
			>
				<Auxiliary>
					<div className={["status--highlight", ["theme--" + props.status]].join(" ")}>
						<h2>{he.decode(props.headline)}</h2>
						{props.message && props.message.length ? (
							<ul>
								{props.message.map((message, index) =>
									<li key={index}>
										{he.decode(message.msg)}
									</li>
								)}
								<Auxiliary>
									{ props.response ? <li>{he.decode(props.response)}</li> : null }
								</Auxiliary>
							</ul>
						)	: null }
						{ props.bespokeText ? <p>{ he.decode(props.bespokeText) }</p> : null }
					</div>
					<Button type={props.status} clicked={props.action} elmRef={modalButton}>
						{props.buttonText}
					</Button>
				</Auxiliary>
				{props.children}
			</div>
		</Auxiliary>
	);
};

//===============================================================================================================//

export default Modal;
