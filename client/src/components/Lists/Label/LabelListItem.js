import React from "react";
import { Link } from "react-router-dom";

import "./LabelListItem.scss";

import avatar from "../../../assets/images/labels/avatar.jpg";

//===============================================================================================================//

const labelListItem = props => {
  return (
    <li>
      <div className="card--small">
        <figure>
          <picture>
            <img
              key={props.labelName}
              src={props.picture.map(picture =>
                picture.location
                  ? require(`../../../assets/images/labels/${picture.location}`)
                  : avatar
              )}
              alt={props.labelName}
              width="60px"
              height="60px"
            />
          </picture>
        </figure>
        <div className="card__details">
          <h2>
            <Link to={{ pathname: "/labels/" + props.labelId }}>
              {props.labelName}
            </Link>
          </h2>
        </div>
      </div>
    </li>
  );
};

//===============================================================================================================//

export default labelListItem;
