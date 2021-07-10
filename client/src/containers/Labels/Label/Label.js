import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./Label.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import LabelComponent from "../../../components/Things/Label/Label";
import ReleaseListItem from "../../../components/Lists/Release/ReleaseListItem";

import Loader from "../../../components/Utilities/UI/Loader/Loader";
import Modal from "../../../components/Utilities/Modal/Modal";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as labelActions from "../../../store/actions/index";

//===============================================================================================================//

const Label = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const { onFetchLabel, onFetchReleases, onReleaseResetStatus, onReleaseResetResults, stateReleaseError, history, match } = props;
	const [getShouldRedirect, setShouldRedirect] = useState(false);

	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Labels & Releases Effect Running!")
		onFetchLabel(match.params.id, false);
		onFetchReleases(match.params.id);
	}, [onFetchLabel, onFetchReleases, match]);

	useEffect(() => {
		if (getShouldRedirect) { 
			history.push({ pathname: "/labels/" }); 
		}
	}, [getShouldRedirect, history]);

	useEffect(() => {
		if (stateReleaseError) { 
			onReleaseResetStatus();
			onReleaseResetResults();
		}
	}, [stateReleaseError, onReleaseResetStatus, onReleaseResetResults])

	//===============================================================================================================//
	// Label Action Helpers
	//===============================================================================================================//

	const labelMessageHandler = (event, redirect) => {
		event.preventDefault();
		props.onLabelResetStatus();
		setShouldRedirect(redirect);
	};

	//===============================================================================================================//
	// Render Label Thing
	//===============================================================================================================//

	let label = <Loader />;
	if (!props.stateLoading && props.stateLabelError) {
		label = (
			<div className="container">
				<h1>There was a problem with your request</h1>
				<StatusMessage
					status={"warning"}
					headline={props.stateLabelError}
					response={props.stateResponse}
					message={props.stateFeedback}
					action={event => labelMessageHandler(event, true)}
					buttonText={`OK`}
				/>
			</div>
		);
	}
	if (!props.stateLoading && props.stateLabel && !props.stateLabelError) {
		label = (
			<div className="container">
				<div className="panel">
					<LabelComponent
						labelId={props.stateLabel._id}
						labelName={props.stateLabel.name}
						parentLabel={props.stateLabel.parent_label}
						subsidiaryLabel={props.stateLabel.subsidiary_label}
						profile={props.stateLabel.profile}
						website={props.stateLabel.website}
						picture={props.stateLabel.picture}
					/>
				</div>
				<h2>Releases</h2>
				{ props.stateReleases.length && !props.stateReleaseError ? (
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
					<p className="list--block">There are currently no releases associated with this label.</p>
				)}
				{ props.stateSuccess ? (
					<Modal
						show={true}
						hide={event => labelMessageHandler(event, false)}
						action={event => labelMessageHandler(event, false)}
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
	return label;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateLabel: state.label.label,
		stateReleases: state.release.releases,
		stateLoading: state.label.loading,
		stateSuccess: state.label.success,
		stateResponse: state.label.response,
		stateFeedback: state.label.feedback,
		stateLabelError: state.label.error,
		stateReleaseError: state.release.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchLabel: (labelId, edit) =>
			dispatch(labelActions.fetchLabelSend(labelId, edit)),
		onFetchReleases: labelId => 
			dispatch(labelActions.fetchReleasesByLabelSend(labelId)),
		onLabelResetStatus: () => 
			dispatch(labelActions.labelResetStatus()),
		onReleaseResetStatus: () =>
			dispatch(labelActions.releaseResetStatus()),
		onReleaseResetResults: () => 
			dispatch(labelActions.releaseResetResults())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Label);

//===============================================================================================================//
