import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./LabelList.scss";

import LabelListItem from "../../../components/Lists/Label/LabelListItem";

import Loader from "../../../components/Utilities/UI/Loader/Loader";
import Modal from "../../../components/Utilities/Modal/Modal";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as labelActions from "../../../store/actions/index";

//===============================================================================================================//

const LabelList = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const { onFetchLabels, history } = props;
	const [getShouldRedirect, setShouldRedirect] = useState(false);

	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Labels Effect Running!")
		onFetchLabels();
	}, [onFetchLabels]);

	useEffect(() => {
		if(getShouldRedirect) { history.push({ pathname: "/labels/" }); }
	}, [getShouldRedirect, history])

	//===============================================================================================================//
	// Label Action Helpers
	//===============================================================================================================//

	const labelMessageHandler = (event, redirect) => {
		event.preventDefault();
		props.onResetStatus();
		setShouldRedirect(redirect)
	};

	//===============================================================================================================//
	// Render Label List
	//===============================================================================================================//

	let labelList = <Loader />;
	if (!props.stateLoading && props.stateError) {
		labelList = (
			<div className="container">
				<h1>There was a problem with your request</h1>
				<StatusMessage
					status={"warning"}
					headline={props.stateError}
					response={props.stateResponse}
					message={props.stateFeedback}
					action={event => labelMessageHandler(event, true)}
					buttonText={`OK`}
				/>
			</div>
		);
	}
	if (!props.stateLoading && props.stateLabels && !props.stateError) {
		labelList = (
			<div className="container">
				<h1>Labels</h1>
				<p>Showing {props.stateLabels.length} results</p>
				<ol className="list--block">
					{props.stateLabels.map(label => (
						<LabelListItem
							key={label._id}
							labelId={label._id}
							labelName={label.name}
							picture={label.picture}
						/>
					))}
				</ol>
				<Link smooth to="#content">
					Back To Top
				</Link>
				{props.stateSuccess ? (
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
	return labelList;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateLabels: state.label.labels,
		stateLoading: state.label.loading,
		stateError: state.label.error,
		stateSuccess: state.label.success,
		stateResponse: state.label.response,
		stateFeedback: state.label.feedback

	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchLabels: () => 
			dispatch(labelActions.fetchLabelsSend()),
		onResetStatus: () => 
			dispatch(labelActions.labelResetStatus())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LabelList);

//===============================================================================================================//
