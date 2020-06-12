import React from "react";
import { Link } from "react-router-dom";

import "./ArtistListItem.scss";

import avatar from "../../../assets/images/artists/avatar.jpg";

//===============================================================================================================//

const artistListItem = props => {
  return (
    <li>
      <div className="card--small">
        <figure>
          <picture>
            <img
              key={props.artistName}
              src={props.picture.map(picture =>
                picture.location
                  ? require(`../../../assets/images/artists/${picture.location}`)
                  : avatar
              )}
              alt={props.artistName}
              width="60px"
              height="60px"
            />
          </picture>
        </figure>
        <div className="card__details">
          <h2>
            <Link to={{ pathname: "/artists/" + props.artistId }}>
              {props.artistName}
            </Link>
          </h2>
        </div>
      </div>
    </li>
  );
};

//===============================================================================================================//

export default artistListItem;
