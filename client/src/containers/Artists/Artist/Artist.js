import React, { Component } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./Artist.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import ArtistComponent from "../../../components/Things/Artist/Artist";
import ReleaseListItem from "../../../components/Lists/Release/ReleaseListItem";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as artistActions from "../../../store/actions/index";

//===============================================================================================================//

class Artist extends Component {
  componentDidMount() {
    this.props.onFetchArtist(this.props.match.params.id, false);
    this.props.onFetchReleases(this.props.match.params.id);
  }
  //===============================================================================================================//

  render() {
    let artist = <Loader />;
    if (!this.props.stateLoading && this.props.stateError) {
      artist = (
        <StatusMessage status={"warning"} message={this.props.stateError} />
      );
    }
    if (!this.props.stateLoading && this.props.stateArtist) {
      artist = (
        <Auxiliary>
          <div className="panel">
            <ArtistComponent
              artistId={this.props.stateArtist._id}
              artistName={this.props.stateArtist.name.trim()}
              realName={this.props.stateArtist.real_name.trim()}
              aliasName={this.props.stateArtist.alias_name}
              profile={this.props.stateArtist.profile.trim()}
              website={this.props.stateArtist.website}
              picture={this.props.stateArtist.picture}
            />
          </div>
          {this.props.stateReleases.length ? (
            <Auxiliary>
              <h2>Releases</h2>
              <p>Showing {this.props.stateReleases.length} results</p>
              <ol className="list--block">
                {this.props.stateReleases.map(release => (
                  <ReleaseListItem
                    key={release._id}
                    releaseId={release._id}
                    releaseArtist={release.artist_name}
                    releaseName={release.title}
                    releaseCat={release.catalogue}
                    releaseYear={release.year}
                    picture={release.picture}
                  />
                ))}
              </ol>
              <Link smooth to="#content">
                Back To Top
              </Link>
            </Auxiliary>
          ) : null }
        </Auxiliary>
      );
    }
    return <div className="container">{artist}</div>;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateArtist: state.artist.artist,
    stateReleases: state.release.releases,
    stateLoading: state.artist.loading,
    stateError: state.artist.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchArtist: (artistId, edit) => dispatch(artistActions.fetchArtistSend(artistId, edit)),
    onFetchReleases: artistId => dispatch(artistActions.fetchReleasesByArtistSend(artistId))
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Artist);

//===============================================================================================================//
