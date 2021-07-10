import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./Artist.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import ArtistComponent from "../../../components/Things/Artist/Artist";
import ReleaseListItem from "../../../components/Lists/Release/ReleaseListItem";

import Loader from "../../../components/Utilities/UI/Loader/Loader";
import Modal from "../../../components/Utilities/Modal/Modal";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as artistActions from "../../../store/actions/index";

//===============================================================================================================//

const Artist = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const { onFetchArtist, onFetchReleases, onReleaseResetStatus, onReleaseResetResults, stateReleaseError,  history, match } = props;
	const [getShouldRedirect, setShouldRedirect] = useState(false);


	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Artists & Releases Effect Running!")
		onFetchArtist(match.params.id, false);
		onFetchReleases(match.params.id);
	}, [onFetchArtist, onFetchReleases, match]);

	useEffect(() => {
		if (getShouldRedirect) { 
			history.push({ pathname: "/artists/" }); 
		}
	}, [getShouldRedirect, history]);

	useEffect(() => {
		if (stateReleaseError) { 
			onReleaseResetStatus();
			onReleaseResetResults();
		}
	}, [stateReleaseError, onReleaseResetStatus, onReleaseResetResults])

	//===============================================================================================================//
	// Artist Action Helpers
	//===============================================================================================================//

	const artistMessageHandler = (event, redirect) => {
		event.preventDefault();
		props.onArtistResetStatus();
		setShouldRedirect(redirect);
	};

	//===============================================================================================================//
	// Render Artist Thing
	//===============================================================================================================//

	let artist = <Loader />;
	if (!props.stateLoading && props.stateArtistError) {
		artist = (
			<div className="container">
				<h1>There was a problem with your request</h1>
				<StatusMessage
					status={"warning"}
					headline={props.stateArtistError}
					response={props.stateResponse}
					message={props.stateFeedback}
					action={event => artistMessageHandler(event, true)}
					buttonText={`OK`}
				/>
			</div>
		);
	}
	if (!props.stateLoading && props.stateArtist && !props.stateArtistError) {
		artist = (
			<div className="container">
				<div className="panel">
					<ArtistComponent
						artistId={props.stateArtist._id}
						artistName={props.stateArtist.name}
						realName={props.stateArtist.real_name}
						aliasName={props.stateArtist.alias_name}
						profile={props.stateArtist.profile}
						website={props.stateArtist.website}
						picture={props.stateArtist.picture}
					/>
				</div>
				<h2>Releases</h2>
				{props.stateReleases.length && !props.stateReleaseError ? (
					<Auxiliary>
						<p>Showing {props.stateReleases.length} results</p>
						<ol className="list--block">
							{props.stateReleases.map(release => (
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
				) : (
					<p className="list--block">There are currently no releases associated with this artist.</p>
				)}
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
	return artist;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateArtist: state.artist.artist,
		stateReleases: state.release.releases,
		stateLoading: state.artist.loading,
		stateSuccess: state.artist.success,
		stateResponse: state.artist.response,
		stateFeedback: state.artist.feedback,
		stateArtistError: state.artist.error,
		stateReleaseError: state.release.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchArtist: (artistId, edit) => 
			dispatch(artistActions.fetchArtistSend(artistId, edit)),
		onFetchReleases: artistId => 
			dispatch(artistActions.fetchReleasesByArtistSend(artistId)),
		onArtistResetStatus: () => 
			dispatch(artistActions.artistResetStatus()),
		onReleaseResetStatus: () => 
			dispatch(artistActions.releaseResetStatus()),
		onReleaseResetResults: () => 
			dispatch(artistActions.releaseResetResults())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Artist);

//===============================================================================================================//
