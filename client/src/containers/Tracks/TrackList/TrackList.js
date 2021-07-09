import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./TrackList.scss";

import TrackListItem from "../../../components/Lists/Track/TrackListItem";
import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as trackActions from "../../../store/actions/index";

//===============================================================================================================//

const TrackList = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const { onFetchTracks, history } = props;
	const [getShouldRedirect, setShouldRedirect] = useState(false);

	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Tracks Effect Running!")
		onFetchTracks();
	}, [onFetchTracks]);

	useEffect(() => {
		if(getShouldRedirect) { history.push({ pathname: "/tracks/" }); }
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

	let trackList = <Loader />;
	if (!props.stateLoading && props.stateError) {
		trackList = (
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
	if (!props.stateLoading && props.stateTracks && !props.stateError) {
		trackList = (
			<div className="container">
				<h1>Tracks</h1>
				<p>Showing {props.stateTracks.length} results</p>
				<Auxiliary>
					{props.stateTracks.length ? (
						<ol className="list--block">
							{props.stateTracks.map(track => (
								<TrackListItem
									key={track._id}
									trackId={track._id}
									trackName={track.name}
									trackArtist={track.artist_name}
									trackCat={track.release_catalogue}
									trackPicture={track.release_picture}
								/>
							))}
						</ol>
					) : null }
				</Auxiliary>
				<Link smooth to="#content">
					Back To Top
				</Link>
			</div>
		);
	}
	return trackList;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateTracks: state.track.tracks,
		stateLoading: state.track.loading,
		stateError: state.track.error,
		stateSuccess: state.track.success,
		stateResponse: state.track.response,
		stateFeedback: state.track.feedback
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchTracks: () => 
			dispatch(trackActions.fetchTracksSend()),
		onResetStatus: () => 
			dispatch(trackActions.trackResetStatus())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TrackList);

//===============================================================================================================//
