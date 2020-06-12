import React from "react";
import { Link } from "react-router-dom";

import "./Label.scss";

import avatar from "../../../assets/images/labels/avatar.jpg";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const label = props => {
  return (
    <Auxiliary>
      <div className="profile__picture">
        <img
          key={props.labelName}
          src={props.picture.map(picture =>
            picture.location
              ? require(`../../../assets/images/labels/${picture.location}`)
              : avatar
          )}
          alt={props.labelName}
          height="200px"
          width="200px"
        />
      </div>
      <div className="profile__details">
        <h1>{props.labelName}</h1>
        {props.parentLabel.length || props.subsidiaryLabel.length ? (
          <dl>
            {props.parentLabel.length ? (
              <Auxiliary>
                <dt>Parent Label</dt>
                <dd>
                  {props.parentLabel.map(parent => (
                    <Link key={parent._id} to={`/labels/${parent._id}`}>
                      {parent.name}
                    </Link>
                  ))}
                </dd>
              </Auxiliary>
            ) : null}
            {props.subsidiaryLabel.length ? (
              <Auxiliary>
                <dt>Subsidiary Labels</dt>
                <dd>
                  {props.subsidiaryLabel.map((subsidiary, index, arr) =>
                    arr.length - 1 === index ? (
                      <span key={subsidiary.name}>
                        <Link to={`/labels/${subsidiary._id}`}>
                          {subsidiary.name}
                        </Link>
                      </span>
                    ) : (
                      <span key={subsidiary.name}>
                        <Link to={`/labels/${subsidiary._id}`}>
                          {subsidiary.name}
                        </Link>
                        ,{" "}
                      </span>
                    )
                  )}
                </dd>
              </Auxiliary>
            ) : null}
          </dl>
        ) : null}
        <h2>Profile</h2>
        <p>{props.profile}</p>
        {props.website.length ? (
          <Auxiliary>
            <h3>Websites</h3>
            <ul>
              {props.website.map(site =>
                site.url ? (
                  <li key={site.name}>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.name}
                    </a>
                  </li>
                ) : null
              )}
            </ul>
          </Auxiliary>
        ) : null}
        <div className="profile__actions">
          <Link
            to={{ pathname: "/labels/" + props.labelId + "/edit" }}
            className="btn btn--primary"
          >
            Edit Label
          </Link>
        </div>
      </div>
    </Auxiliary>
  );
};

//===============================================================================================================//

export default label;
