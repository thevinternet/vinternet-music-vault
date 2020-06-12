import React, { Component } from "react";
import { Link } from "react-router-dom";

import avatarArtist from "../../assets/images/site/avatar-artist.jpg";
import avatarLabel from "../../assets/images/site/avatar-label.jpg";
import avatarRelease from "../../assets/images/site/avatar-release.jpg";

//===============================================================================================================//

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <h2>Artists</h2>
        <ol className="list--block">
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarArtist}
                    alt={"Artists"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/artists" }}>View All Artists</Link>
                </h2>
              </div>
            </div>
          </li>
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarArtist}
                    alt={"Artists"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/artists/new" }}>Add New Artist</Link>
                </h2>
              </div>
            </div>
          </li>
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarArtist}
                    alt={"Artists"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/artists/5d92607d76ed50de35d9904a" }}>
                    Example Artist: Soul Intent
                  </Link>
                </h2>
              </div>
            </div>
          </li>
        </ol>
        <h2>Labels</h2>
        <ol className="list--block">
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarLabel}
                    alt={"Labels"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/labels" }}>View All Labels</Link>
                </h2>
              </div>
            </div>
          </li>
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarLabel}
                    alt={"Labels"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/labels/new" }}>Add New Label</Link>
                </h2>
              </div>
            </div>
          </li>
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarLabel}
                    alt={"Labels"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/labels/5d8e508e785b016aa48d4923" }}>
                    Example Label: Lossless Music
                  </Link>
                </h2>
              </div>
            </div>
          </li>
        </ol>
        <h2>Releases</h2>
        <ol className="list--block">
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarRelease}
                    alt={"Releases"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/releases" }}>View All Releases</Link>
                </h2>
              </div>
            </div>
          </li>
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarRelease}
                    alt={"Releases"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/releases/new" }}>Add New Release</Link>
                </h2>
              </div>
            </div>
          </li>
          <li>
            <div className="card--small">
              <figure>
                <picture>
                  <img
                    src={avatarRelease}
                    alt={"Releases"}
                    width="60px"
                    height="60px"
                  />
                </picture>
              </figure>
              <div className="card__details">
                <h2>
                  <Link to={{ pathname: "/releases/5dbaaa2e33a7f0b867c24e3e" }}>
                    Example Release: Drifting [Exkursions] (EXKUR001)
                  </Link>
                </h2>
              </div>
            </div>
          </li>
        </ol>
      </div>
    );
  }
}

export default Dashboard;
