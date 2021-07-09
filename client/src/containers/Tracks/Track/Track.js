import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./Track.scss";

import TrackComponent from "../../../components/Things/Track/Track";

import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as trackActions from "../../../store/actions/index";

//===============================================================================================================//

const Track = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const { onFetchTrack, match, history } = props;
	const [getShouldRedirect, setShouldRedirect] = useState(false);

	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Track Effect Running!")
		onFetchTrack(match.params.id, false);
	}, [onFetchTrack, match]);

	useEffect(() => {
		if(getShouldRedirect) { history.push({ pathname: "/tracks" }); }
	}, [getShouldRedirect, history])

	//===============================================================================================================//
	// Track Action Helpers
	//===============================================================================================================//

	const trackMessageHandler = (event, redirect) => {
		event.preventDefault();
		props.onResetStatus();
		setShouldRedirect(redirect);
	};

	//===============================================================================================================//

		let track = <Loader />;
		if (!props.stateLoading && props.stateError) {
			track = (
				<div className="container">
					<h1>There was a problem with your request</h1>
					<StatusMessage
						status={"warning"}
						headline={props.stateError}
						response={props.stateResponse}
						message={props.stateFeedback}
						action={event => trackMessageHandler(event, true)}
						buttonText={`OK`}
					/>
				</div>
			);
		}
		if (!props.stateLoading && props.stateTrack && !props.stateError) {
			track = (
				<div className="container">
					<div className="panel">
						<TrackComponent
							trackId={props.stateTrack._id}
							trackName={props.stateTrack.name}
							trackArtist={props.stateTrack.artist_name}
							trackLabel={props.stateTrack.release_label}
							trackCat={props.stateTrack.release_catalogue}
							trackPicture={props.stateTrack.release_picture}
							trackGenre={props.stateTrack.genre}
							trackMixkey={props.stateTrack.mixkey}
						/>
					</div>
				</div>
			);
		}
		return track;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateTrack: state.track.track,
		stateLoading: state.track.loading,
		stateError: state.track.error,
		stateSuccess: state.track.success,
		stateResponse: state.track.response,
		stateFeedback: state.track.feedback
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchTrack: (trackId, edit) => 
			dispatch(trackActions.fetchTrackSend(trackId, edit)),
		onResetStatus: () => 
			dispatch(trackActions.trackResetStatus())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Track);

//===============================================================================================================//
