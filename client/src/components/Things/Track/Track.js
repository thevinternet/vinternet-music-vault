import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import "./Track.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const track = props => {
  return (
    <Auxiliary>
      <div className="profile__picture">
        <img
					key={ReactHtmlParser(props.trackName)}
					src={props.trackPicture.map(pictures =>
						pictures.picture.map(picture =>
							picture.location
								? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
								: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
						)
          )}
          alt={ReactHtmlParser(props.trackName)}
          height="200px"
          width="200px"
        />
      </div>
      <div className="profile__details">
        <h1>{ReactHtmlParser(props.trackName)}</h1>
        <dl>
          {props.trackArtist.length ? (
            <Auxiliary>
              <dt>Artists</dt>
              <dd>
                {props.trackArtist.map((artist, index, array) =>
                  array.length - 1 === index ? (
                    <span key={ReactHtmlParser(artist.name)}>
                      <Link to={`/artists/${artist._id}`}>
                        {ReactHtmlParser(artist.name)}
                      </Link>
                    </span>
                  ) : (
                    <span key={ReactHtmlParser(artist.name)}>
                      <Link to={`/artists/${artist._id}`}>
                        {ReactHtmlParser(artist.name)}
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
                  <Link key={ReactHtmlParser(label.name)} to={`/labels/${label._id}`}>
                    {ReactHtmlParser(label.name)}
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
										{ReactHtmlParser(catalogue.catalogue)}
									</Link>
								)}
              </dd>
            </Auxiliary>
          ) : null}
					<Auxiliary>
						<dt>Genre</dt>
						<dd>{ReactHtmlParser(props.trackGenre)}</dd>
						<dt>Key</dt>
						<dd>{ReactHtmlParser(props.trackMixkey)}</dd>
					</Auxiliary>
        </dl>
      </div>
    </Auxiliary>
  );
};

//===============================================================================================================//

export default track;
