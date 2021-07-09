import React from "react";

import "./Input.scss";

import Auxiliary from "../../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const input = props => {
	let inputElement = null;

	switch (props.elementAttributes.type) {
		case "text":
			inputElement = (
				<Auxiliary>
					<label htmlFor={props.elementAttributes.labelFor}>{props.elementAttributes.label}</label>
					{props.elementValid && props.elementAttributes.validationRequired && props.elementAttributes.touched ? (
						<p
							className="message--error"
							aria-live="polite"
							aria-describedby={props.elementAttributes.id}
						>
							{props.elementAttributes.validationFeedback}
						</p>
					) : null}
					<input
						type={props.elementAttributes.type}
						name={props.elementAttributes.name}
						id={props.elementAttributes.id}
						value={props.elementAttributes.value}
						onChange={props.changed}
						aria-invalid={props.elementValid ? "true" : "false"}
					/>
				</Auxiliary>
			);
		break;
		case "textarea":
			inputElement = (
				<Auxiliary>
					<label htmlFor={props.elementAttributes.labelFor}>{props.elementAttributes.label}</label>
					{props.elementValid && props.elementAttributes.validationRequired && props.elementAttributes.touched ? (
						<p
							className="message--error"
							aria-live="polite"
							aria-describedby={props.elementAttributes.id}
						>
							{props.elementAttributes.validationFeedback}
						</p>
					) : null}
					<textarea
						name={props.elementAttributes.name}
						id={props.elementAttributes.id}
						value={props.elementAttributes.value}
						onChange={props.changed}
						aria-invalid={props.elementValid ? "true" : "false"}
					/>
				</Auxiliary>
			);
		break;
		case "select":
			inputElement = (
				<Auxiliary>
					<label htmlFor={props.elementAttributes.labelFor}>{props.elementAttributes.label}</label>
					{props.elementValid && props.elementAttributes.validationRequired && props.elementAttributes.touched ? (
						<p
							className="message--error"
							aria-live="polite"
							aria-describedby={props.elementAttributes.id}
						>
							{props.elementAttributes.validationFeedback}
						</p>
					) : null}
					<select
						onChange={props.changed}
						aria-invalid={props.elementValid ? "true" : "false"}
					>
						{props.elementAttributes.options.map(option => (
							<option key={option.value} value={option.value}>
								{option.option}
							</option>
						))}
					</select>
				</Auxiliary>
			);
		break;
		case "checkbox":
			inputElement = (
				<div className="input-group__inline">
					{props.elementValid && props.elementAttributes.validationRequired && props.elementAttributes.touched ? (
						<p
							className="message--error"
							aria-live="polite"
							aria-describedby={props.elementAttributes.id}
						>
							{props.elementAttributes.validationFeedback}
						</p>
					) : null}
					<input
						type={props.elementAttributes.type}
						name={props.elementAttributes.name}
						id={props.elementAttributes.id}
						value={props.elementAttributes.value}
						onChange={props.changed}
						aria-invalid={props.elementValid ? "true" : "false"}
						checked={props.elementAttributes.value === "yes" ? true : false }
					/>
					<label htmlFor={props.elementAttributes.labelFor}>{props.elementAttributes.label}</label>
				</div>
			);
		break;
		case "number":
			inputElement = (
				<Auxiliary>
					<label htmlFor={props.elementAttributes.labelFor}>{props.elementAttributes.label}</label>
					{props.elementValid && props.elementAttributes.validationRequired && props.elementAttributes.touched ? (
						<p
							className="message--error"
							aria-live="polite"
							aria-describedby={props.elementAttributes.id}
						>
							{props.elementAttributes.validationFeedback}
						</p>
					) : null}
					<input
						type={props.elementAttributes.type}
						name={props.elementAttributes.name}
						id={props.elementAttributes.id}
						value={props.elementAttributes.value}
						min={props.elementAttributes.min}
						max={props.elementAttributes.max}
						onChange={props.changed}
						size={20}
						aria-invalid={props.elementValid ? "true" : "false"}
					/>
				</Auxiliary>
			);
		break;
		default:
			inputElement = (
				<Auxiliary>
					<label htmlFor={props.elementAttributes.labelFor}>{props.elementAttributes.label}</label>
					{props.elementValid && props.elementAttributes.validationRequired && props.elementAttributes.touched ? (
						<p
							className="message--error"
							aria-live="polite"
							aria-describedby={props.elementAttributes.id}
						>
							{props.elementAttributes.validationFeedback}
						</p>
					) : null}
					<input
						type={props.elementAttributes.type}
						name={props.elementAttributes.name}
						id={props.elementAttributes.id}
						value={props.elementAttributes.value}
						onChange={props.changed}
						aria-invalid={props.elementValid ? "true" : "false"}
					/>
				</Auxiliary>
			);
	}
	return inputElement;
};

//===============================================================================================================//

export default input;
