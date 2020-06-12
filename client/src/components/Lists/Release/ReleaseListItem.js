import React from "react";
import { Link } from "react-router-dom";

import "./ReleaseListItem.scss";

import avatar from "../../../assets/images/releases/avatar.jpg";

//===============================================================================================================//

const releaseListItem = props => {
  return (
    <li>
      <div className="card--small">
        <figure>
          <picture>
            <img
              key={props.releaseName}
              src={props.picture.map(picture =>
                picture.location
                  ? require(`../../../assets/images/releases/${picture.location}`)
                  : avatar
              )}
              alt={props.releaseName}
              width="60px"
              height="60px"
            />
          </picture>
        </figure>
        <div className="card__details">
          <h2>
            <Link to={{ pathname: "/releases/" + props.releaseId }}>
              {props.releaseName}
            </Link>
          </h2>
          <ul className="details--inline">
            {props.releaseCat ? <li><strong>Label:</strong> {props.releaseCat}</li> : null }
            {props.releaseYear ? <li><strong>Released:</strong> {props.releaseYear}</li> : null}         
          </ul>
        </div>
      </div>
    </li>
  );
};

//===============================================================================================================//

export default releaseListItem;
