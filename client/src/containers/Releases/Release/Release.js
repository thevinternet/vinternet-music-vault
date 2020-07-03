import React, { Component } from "react";
import { connect } from "react-redux";

import "./Release.scss";

import ReleaseComponent from "../../../components/Things/Release/Release";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as releaseActions from "../../../store/actions/index";

//===============================================================================================================//

class Release extends Component {

  componentDidMount() {
    this.props.onFetchRelease(this.props.match.params.id, false);
  }

  //===============================================================================================================//

  render() {
    let release = <Loader />;
    if (!this.props.stateLoading && this.props.stateError) {
      release = (
        <StatusMessage status={"warning"} message={this.props.stateError} />
      );
    }

    if (!this.props.stateLoading && this.props.stateRelease) {

      const artistNamesArray = [];
      let artistNames = [];
      let releaseFormats = [];
    
      if (this.props.stateRelease.track.length) {
        this.props.stateRelease.track.map(track =>
          track.artist_name.map(artist =>
            artistNamesArray.push({ name : artist.name, id : artist._id })
          )     
        )
        artistNames = artistNamesArray.reduce((accumulator, currentArtist) => {
          const uniqueArtist = accumulator.find(item => item.id === currentArtist.id);
          return !uniqueArtist ? accumulator.concat([currentArtist]) : accumulator
        }, []);
      }

      if (this.props.stateRelease.format.length) {
        this.props.stateRelease.format.map(format => {
          if (format.release === "yes") { releaseFormats.push(format.name) }
          return releaseFormats;
        })
      }

      //============================================================================================================//

      release = (
        <div className="panel">
          <ReleaseComponent
            releaseId={this.props.stateRelease._id}
            releaseArtist={artistNames}
            releaseTitle={this.props.stateRelease.title.trim()}
            releaseLabel={this.props.stateRelease.label_name}
            releaseCat={this.props.stateRelease.catalogue}
            releaseTracks={this.props.stateRelease.track}
            releaseYear={this.props.stateRelease.year}
            releaseFormat={releaseFormats}
            releasePicture={this.props.stateRelease.picture}
            releaseLink={this.props.stateRelease.discogs_url}
          />
        </div>
      );
    }
    return <div className="container">{release}</div>;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateRelease: state.release.release,
    stateLoading: state.release.loading,
    stateError: state.release.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRelease: (releaseId, edit) =>
      dispatch(releaseActions.fetchReleaseSend(releaseId, edit))
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Release);

//===============================================================================================================//
