import React from "react";

import "./File.scss";

import Auxiliary from "../../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const file = props => {
  return (
    <Auxiliary>
      <div className="card">
        <figure>
          <picture>
            <img
              src={
                props.hasUpload
                  ? props.imageUpload
                  : require(`../../../../assets/images/${props.elementImage}`)
              }
              alt={props.title}
              height="100px"
              width="100px"
            />
          </picture>
        </figure>
        <div className="card__details">
          <input
						{...props.elementAttr}
						type={props.elementType}
						name={props.elementName}
            id={props.elementId}
            onChange={props.changed}
          />
          <label htmlFor={props.elementLabelFor} className="btn--primary">
            {props.elementLabel}
          </label>
          <p>
            {props.hasUpload ? props.imageNameUpload : props.elementImageName}
          </p>
        </div>
      </div>
    </Auxiliary>
  );
};

//===============================================================================================================//

export default file;
