import React from "react";
import { Link } from "react-router-dom";

import "./Release.scss";

import avatar from "../../../assets/images/releases/avatar.jpg";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const release = props => {
  return (
    <Auxiliary>
      <div className="profile__picture">
        <img
          key={props.releaseTitle}
          src={props.releasePicture.map(picture =>
            picture.location
              ? require(`../../../assets/images/releases/${picture.location}`)
              : avatar
          )}
          alt={props.releaseTitle}
          height="200px"
          width="200px"
        />
      </div>
      <div className="profile__details">
        <h1>{props.releaseTitle}</h1>
        <dl>
          {props.releaseArtist.length ? (
            <Auxiliary>
              <dt>Artists</dt>
              <dd>
                {props.releaseArtist.map((artist, index, arr) =>
                  arr.length - 1 === index ? (
                    <span key={artist.name}>
                      <Link to={`/artists/${artist.id}`}>
                        {artist.name}
                      </Link>
                    </span>
                  ) : (
                    <span key={artist.name}>
                      <Link to={`/artists/${artist.id}`}>
                        {artist.name}
                      </Link>
                      ,{" "}
                    </span>
                  )
                )}
              </dd>
            </Auxiliary>
          ) : null}
          {props.releaseLabel.length ? (
            <Auxiliary>
              <dt>Label</dt>
              <dd>
                {props.releaseLabel.map((label, index, arr) =>
                  <Link key={label.name} to={`/labels/${label._id}`}>
                    {label.name}
                  </Link>
                )}
              </dd>
              <dt>Catalogue</dt>
              <dd>{props.releaseCat}</dd>
              <dt>Year</dt>
              <dd>{props.releaseYear}</dd>
            </Auxiliary>
          ) : null }
          {props.releaseFormat.length ? (
            <Auxiliary>
              <dt>Format</dt>
              <dd>
                {props.releaseFormat.map((format, index, arr) =>
                  arr.length - 1 === index ? (
                    <span key={format}>
                      {format}
                    </span>
                  ) : (
                    <span key={format}>
                      {format},{" "}
                    </span>
                  )
                )}
              </dd>
            </Auxiliary>
          ) : null}
          {props.releaseLink ? (
            <Auxiliary>
              <dt>Reference Website</dt>
              <dd>
                <a href={props.releaseLink} target="_blank" rel="noopener noreferrer">Discogs</a>
              </dd>
            </Auxiliary>
          ) : null }
        </dl>
        <h2>Tracks</h2>
        {props.releaseTracks.length ? (
          <ol className={"list--block"}>
            {props.releaseTracks.map(track =>
              <li key={track.track_number}>
                <div className="card--small">
                  <figure>
                    <picture>
                      <img
                        key={track.track_number}
                        src={props.releasePicture.map(picture =>
                          picture.location
                            ? require(`../../../assets/images/releases/${picture.location}`)
                            : avatar
                        )}
                        alt={track.track_number}
                        width="60px"
                        height="60px"
                      />
                    </picture>
                  </figure>
                  <div className="card__details">
                    <h2>
                      {track.artist_name.map((artist, index, arr) =>
                        arr.length - 1 === index ? (
                          <span key={artist.name}>
                            {artist.name}
                          </span>
                        ) : (
                          <span key={artist.name}>
                            {artist.name}{" & "}
                          </span>
                        )
                      )}
                      {" - "}{track.title}
                    </h2>
                    <ul className="details--inline">
                      <li><strong>Track:</strong> {track.track_number}</li>
                      <li><strong>Genre:</strong> {track.genre}</li>
                      <li><strong>Key:</strong> {track.mixkey}</li>
                    </ul>
                  </div>
                </div>
              </li>
            )}
          </ol>
        ) : null }
        <div className="profile__actions">
          <Link
            to={{ pathname: "/releases/" + props.releaseId + "/edit" }}
            className="btn btn--primary"
          >
            Edit Release
          </Link>
        </div>
      </div>
    </Auxiliary>
  );
};

//===============================================================================================================//

export default release;
