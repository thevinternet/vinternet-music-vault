import React, { Component } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./ArtistList.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import ArtistListItem from "../../../components/Lists/Artist/ArtistListItem";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as artistActions from "../../../store/actions/index";

//===============================================================================================================//

class ArtistList extends Component {
  componentDidMount() {
    this.props.onFetchArtists();
  }

  //===============================================================================================================//

  render() {
    let artistList = <Loader />;
    if (!this.props.stateLoading) {
      artistList = (
        <div className="container">
          <h1>Artists</h1>
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
              <p>Showing {this.props.stateArtists.length} results</p>
              <ol className="list--block">
                {this.props.stateArtists.map(artist => (
                  <ArtistListItem
                    key={artist._id}
                    artistId={artist._id}
                    artistName={artist.name}
                    picture={artist.picture}
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
    return artistList;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateArtists: state.artist.artists,
    stateLoading: state.artist.loading,
    stateError: state.artist.error,
    stateSuccess: state.artist.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchArtists: () => dispatch(artistActions.fetchArtistsSend())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistList);

//===============================================================================================================//
