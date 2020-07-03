import React from "react";

import "./Input.scss";

import Auxiliary from "../../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case "text":
      inputElement = (
        <Auxiliary>
          <label htmlFor={props.elementLabelFor}>{props.elementLabel}</label>
          {props.invalid && props.shouldValidate && props.touched ? (
            <p
              className="message--error"
              aria-live="polite"
              aria-describedby={props.elementId}
            >
              {props.errorMessage}
            </p>
          ) : null}
          <input
						type={props.elementType}
						name={props.elementName}
            id={props.elementId}
						value={props.elementValue}
            onChange={props.changed}
            aria-invalid={props.invalid ? "true" : "false"}
          />
        </Auxiliary>
      );
    break;
    case "textarea":
      inputElement = (
        <Auxiliary>
          <label htmlFor={props.elementLabelFor}>{props.elementLabel}</label>
          {props.invalid && props.shouldValidate && props.touched ? (
            <p
              className="message--error"
              aria-live="polite"
              aria-describedby={props.elementId}
            >
              {props.errorMessage}
            </p>
          ) : null}
          <textarea
						name={props.elementName}
						id={props.elementId}
						value={props.elementValue}
            onChange={props.changed}
            aria-invalid={props.invalid ? "true" : "false"}
          />
        </Auxiliary>
      );
    break;
    case "select":
      inputElement = (
        <Auxiliary>
          <label htmlFor={props.elementLabelFor}>{props.elementLabel}</label>
          {props.invalid && props.shouldValidate && props.touched ? (
            <p
              className="message--error"
              aria-live="polite"
              aria-describedby={props.elementId}
            >
              {props.errorMessage}
            </p>
          ) : null}
          <select
            onChange={props.changed}
            aria-invalid={props.invalid ? "true" : "false"}
          >
            {props.elementAttr.options.map(option => (
              <option key={option.value} value={option.elementValue}>
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
					{props.invalid && props.shouldValidate && props.touched ? (
						<p
							className="message--error"
							aria-live="polite"
							aria-describedby={props.elementId}
						>
							{props.errorMessage}
						</p>
					) : null}
					<input
						type={props.elementType}
						name={props.elementName}
						id={props.elementId}
						value={props.elementValue}
						onChange={props.changed}
						aria-invalid={props.invalid ? "true" : "false"}
						//checked={props.elementValue === "yes" ? true : false }
					/>
					<label htmlFor={props.elementLabelFor}>{props.elementLabel}</label>
				</div>
			);
    break;
    default:
      inputElement = (
        <Auxiliary>
          <label htmlFor={props.elementLabelFor}>{props.elementLabel}</label>
          {props.invalid && props.shouldValidate && props.touched ? (
            <p
              className="message--error"
              aria-live="polite"
              aria-describedby={props.elementId}
            >
              {props.errorMessage}
            </p>
          ) : null}
          <input
						type={props.elementType}
						name={props.elementName}
						id={props.elementId}
            value={props.elementValue}
            onChange={props.changed}
            aria-invalid={props.invalid ? "true" : "false"}
          />
        </Auxiliary>
      );
  }
  return inputElement;
};

//===============================================================================================================//

export default input;
