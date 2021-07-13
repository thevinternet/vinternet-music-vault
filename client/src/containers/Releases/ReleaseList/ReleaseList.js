import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./ReleaseList.scss";

import ReleaseListItem from "../../../components/Lists/Release/ReleaseListItem";

import Loader from "../../../components/Utilities/UI/Loader/Loader";
import Modal from "../../../components/Utilities/Modal/Modal";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as releaseActions from "../../../store/actions/index";

//===============================================================================================================//

const ReleaseList = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const { onFetchReleases, history } = props;
	const [getShouldRedirect, setShouldRedirect] = useState(false);

	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Releases Effect Running!")
		onFetchReleases();
	}, [onFetchReleases]);

	useEffect(() => {
		if(getShouldRedirect) { history.push({ pathname: "/releases/" }); }
	}, [getShouldRedirect, history])

	//===============================================================================================================//
	// Release Action Helpers
	//===============================================================================================================//

	const releaseMessageHandler = (event, redirect) => {
		event.preventDefault();
		props.onResetStatus();
		setShouldRedirect(redirect)
	};

	//===============================================================================================================//
	// Render Release List
	//===============================================================================================================//

	let releaseList = <Loader />;
	if (!props.stateLoading && props.stateError) {
		releaseList = (
			<div className="container">
				<h1>There was a problem with your request</h1>
				<StatusMessage
					status={"warning"}
					headline={props.stateError}
					response={props.stateResponse}
					message={props.stateFeedback}
					action={event => releaseMessageHandler(event, true)}
					buttonText={`OK`}
				/>
			</div>
		);
	}
	if (!props.stateLoading && props.stateReleases && !props.stateError) {
		releaseList = (
			<div className="container">
				<h1>Releases</h1>
				<p>Showing {props.stateReleases.length} results</p>
				<ol className="list--block">
					{props.stateReleases.map(release => (
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
				{props.stateSuccess ? (
					<Modal
						show={true}
						hide={event => releaseMessageHandler(event, false)}
						action={event => releaseMessageHandler(event, false)}
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
	return releaseList;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateReleases: state.release.releases,
		stateLoading: state.release.loading,
		stateError: state.release.error,
		stateSuccess: state.release.success,
		stateResponse: state.release.response,
		stateFeedback: state.release.feedback
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchReleases: () => 
			dispatch(releaseActions.fetchReleasesSend()),
		onResetStatus: () => 
			dispatch(releaseActions.releaseResetStatus())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReleaseList);

//===============================================================================================================//
