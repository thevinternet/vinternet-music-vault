import React from "react";

import "./FuzzyInput.scss";

//===============================================================================================================//

const fuzzyInput = props => {
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
        {...props.elementAttr}
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
            key={match._id}
            onClick={props.clicked}
            onKeyUp={props.keyup}
            value={match.name}
            id={match._id}
            name={match.name}
            tabIndex="0"
          >
            {match.name}
          </option>
        ))}
      </datalist>
    </div>
  );
};

//===============================================================================================================//

export default fuzzyInput;
