import React, { Component } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./ReleaseList.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import ReleaseListItem from "../../../components/Lists/Release/ReleaseListItem";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as releaseActions from "../../../store/actions/index";

//===============================================================================================================//

class ReleaseList extends Component {
  componentDidMount() {
    this.props.onFetchReleases();
  }

  //===============================================================================================================//

  render() {
    let releaseList = <Loader />;
    if (!this.props.stateLoading) {
      releaseList = (
        <div className="container">
          <h1>Releases</h1>
          {this.props.stateError ? (
            <StatusMessage status={"warning"} message={this.props.stateError} />
          ) : (
            <Auxiliary>
              {this.props.stateSuccess ? (
                <StatusMessage
                  status={"success"}
                  message={this.props.stateSuccess}
                />
              ) : null}
              <p>Showing {this.props.stateReleases.length} results</p>
              <ol className="list--block">
                {this.props.stateReleases.map(release => (
                  <ReleaseListItem
                    key={release._id}
                    releaseId={release._id}
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
          )}
        </div>
      );
    }
    return releaseList;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateReleases: state.release.releases,
    stateLoading: state.release.loading,
    stateError: state.release.error,
    stateSuccess: state.release.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchReleases: () => dispatch(releaseActions.fetchReleasesSend())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleaseList);

//===============================================================================================================//
