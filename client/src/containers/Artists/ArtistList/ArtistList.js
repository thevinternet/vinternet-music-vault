import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./ArtistList.scss";

import ArtistListItem from "../../../components/Lists/Artist/ArtistListItem";

import Loader from "../../../components/Utilities/UI/Loader/Loader";
import Modal from "../../../components/Utilities/Modal/Modal";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as artistActions from "../../../store/actions/index";

//===============================================================================================================//

const ArtistList = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const { onFetchArtists, history } = props;
	const [getShouldRedirect, setShouldRedirect] = useState(false);

	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Artists Effect Running!")
		onFetchArtists();
	}, [onFetchArtists]);

	useEffect(() => {
		if(getShouldRedirect) { history.push({ pathname: "/artists/" }); }
	}, [getShouldRedirect, history])

	//===============================================================================================================//
	// Artist Action Helpers
	//===============================================================================================================//

	const artistMessageHandler = (event, redirect) => {
		event.preventDefault();
		props.onResetStatus();
		setShouldRedirect(redirect)
	};

	//===============================================================================================================//
	// Render Artist List
	//===============================================================================================================//

	let artistList = <Loader />;
	if (!props.stateLoading && props.stateError) {
		artistList = (
			<div className="container">
				<h1>There was a problem with your request</h1>
				<StatusMessage
					status={"warning"}
					headline={props.stateError}
					response={props.stateResponse}
					message={props.stateFeedback}
					action={event => artistMessageHandler(event, true)}
					buttonText={`OK`}
				/>
			</div>
		);
	}
	if (!props.stateLoading && props.stateArtists && !props.stateError) {
		artistList = (
			<div className="container">
				<h1>Artists</h1>
				<p>Showing {props.stateArtists.length} results</p>
				<ol className="list--block">
					{props.stateArtists.map(artist => (
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
				{props.stateSuccess ? (
					<Modal
						show={true}
						hide={event => artistMessageHandler(event, false)}
						action={event => artistMessageHandler(event, false)}
						status={"success"}
						headline={props.stateSuccess}
						response={props.stateResponse}
						message={props.stateFeedback}
						buttonText={`OK`}
					/>
				) : null }
			</div>
		);
	}
	return artistList;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateArtists: state.artist.artists,
		stateLoading: state.artist.loading,
		stateError: state.artist.error,
		stateSuccess: state.artist.success,
		stateResponse: state.artist.response,
		stateFeedback: state.artist.feedback
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchArtists: () => 
			dispatch(artistActions.fetchArtistsSend()),
		onResetStatus: () => 
			dispatch(artistActions.artistResetStatus())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArtistList);

//===============================================================================================================//
