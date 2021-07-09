import React from "react";
import { Link } from "react-router-dom";
import he from "he";

import "./Track.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const track = props => {
  return (
    <Auxiliary>
      <div className="profile__picture">
        <img
					key={he.decode(props.trackName)}
					src={props.trackPicture.map(pictures =>
						pictures.picture.map(picture =>
							picture.location
								? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
								: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
						)
          )}
          alt={he.decode(props.trackName)}
          height="200px"
          width="200px"
        />
      </div>
      <div className="profile__details">
        <h1>{he.decode(props.trackName)}</h1>
        <dl>
          {props.trackArtist.length ? (
            <Auxiliary>
              <dt>Artists</dt>
              <dd>
                {props.trackArtist.map((artist, index, array) =>
                  array.length - 1 === index ? (
                    <span key={he.decode(artist.name)}>
                      <Link to={`/artists/${artist._id}`}>
                        {he.decode(artist.name)}
                      </Link>
                    </span>
                  ) : (
                    <span key={he.decode(artist.name)}>
                      <Link to={`/artists/${artist._id}`}>
                        {he.decode(artist.name)}
                      </Link>
                      ,{" "}
                    </span>
                  )
                )}
              </dd>
            </Auxiliary>
          ) : null}
          {props.trackLabel.length ? (
            <Auxiliary>
              <dt>Label</dt>
              <dd>
                {props.trackLabel.map((label) =>
                  <Link key={he.decode(label.name)} to={`/labels/${label._id}`}>
                    {he.decode(label.name)}
                  </Link>
                )}
              </dd>
            </Auxiliary>
          ) : null }
          {props.trackCat.length ? (
            <Auxiliary>
              <dt>Release</dt>
              <dd>
                {props.trackCat.map((catalogue) =>
                  <Link key={catalogue.catalogue_id} to={`/releases/${catalogue._id}`}>
										{he.decode(catalogue.catalogue)}
									</Link>
								)}
              </dd>
            </Auxiliary>
          ) : null}
					<Auxiliary>
						<dt>Genre</dt>
						<dd>{he.decode(props.trackGenre)}</dd>
						<dt>Key</dt>
						<dd>{he.decode(props.trackMixkey)}</dd>
					</Auxiliary>
        </dl>
      </div>
    </Auxiliary>
  );
};

//===============================================================================================================//

export default track;
