import React, { Component } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./Label.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import LabelComponent from "../../../components/Things/Label/Label";
import ReleaseListItem from "../../../components/Lists/Release/ReleaseListItem";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as labelActions from "../../../store/actions/index";

//===============================================================================================================//

class Label extends Component {
  componentDidMount() {
    this.props.onFetchLabel(this.props.match.params.id, false);
    this.props.onFetchReleases(this.props.match.params.id);
  }
  //===============================================================================================================//

  render() {
    let label = <Loader />;
    if (!this.props.stateLoading && this.props.stateError) {
      label = (
        <StatusMessage status={"warning"} message={this.props.stateError} />
      );
    }
    if (!this.props.stateLoading && this.props.stateLabel) {
      label = (
        <Auxiliary>
          <div className="panel">
            <LabelComponent
              labelId={this.props.stateLabel._id}
              labelName={this.props.stateLabel.name.trim()}
              parentLabel={this.props.stateLabel.parent_label}
              subsidiaryLabel={this.props.stateLabel.subsidiary_label}
              profile={this.props.stateLabel.profile.trim()}
              website={this.props.stateLabel.website}
              picture={this.props.stateLabel.picture}
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
    return <div className="container">{label}</div>;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateLabel: state.label.label,
    stateReleases: state.release.releases,
    stateLoading: state.artist.loading,
    stateError: state.artist.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLabel: (labelId, edit) =>
      dispatch(labelActions.fetchLabelSend(labelId, edit)),
    onFetchReleases: labelId => dispatch(labelActions.fetchReleasesByLabelSend(labelId))
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Label);

//===============================================================================================================//
