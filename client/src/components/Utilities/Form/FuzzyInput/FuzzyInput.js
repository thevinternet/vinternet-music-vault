import React from "react";

import "./FuzzyInput.scss";

//===============================================================================================================//

const fuzzyInput = props => {
	return (
		<div className="input-group__dropdown">
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
				lists={`${props.elementAttributes.labelFor}List`}
				aria-invalid={props.elementValid ? "true" : "false"}
			/>
			<datalist
				id={`${props.elementAttributes.labelFor}List`}
				style={{ display: props.elementAttributes.showDropdown === "true" ? "block" : "none" }}
				aria-labelledby={props.elementAttributes.labelFor}
			>
				{props.elementAttributes.matchedRecords.map(match => (
					<option
						key={match.item._id}
						onClick={props.clicked}
						onKeyUp={props.keyup}
						value={match.item.name}
						id={match.item._id}
						name={match.item.name}
						tabIndex="0"
					>
						{match.item.name}
					</option>
				))}
			</datalist>
		</div>
	);
};

//===============================================================================================================//

export default fuzzyInput;
