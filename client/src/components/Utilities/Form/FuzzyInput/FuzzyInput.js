import React from "react";

import "./FuzzyInput.scss";

//===============================================================================================================//

const fuzzyInput = props => {
	props.matches.map(match => (console.log(match.item._id) ));
  return (
    <div className="input-group__dropdown">
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
        lists={props.dataListId}
        aria-invalid={props.invalid ? "true" : "false"}
      />
      <datalist
        id={props.dataListId}
        style={{ display: props.showDropdown === "true" ? "block" : "none" }}
        aria-labelledby={props.elementLabelFor}
      >
        {props.matches.map(match => (
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
