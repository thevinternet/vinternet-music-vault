import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./ReleaseEdit.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Input from "../../../components/Utilities/Form/Input/Input";
import FileInput from "../../../components/Utilities/Form/File/File";
import FuzzyInput from "../../../components/Utilities/Form/FuzzyInput/FuzzyInput";
import FuzzyInputDelete from "../../../components/Utilities/Form/FuzzyInput/FuzzyInputDelete";

import Button from "../../../components/Utilities/UI/Button/Button";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import Modal from "../../../components/Utilities/Modal/Modal";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as objBuilderRelease from "../../../utilities/objectHelpers/objectBuilderRelease"
import { dropdownDatalistSetup } from "../../../utilities/formHelpers/formFuzzyDropdown";
import { accordion } from "../../../utilities/interfaceHelpers/accordion";

import useHandleInputChange from "../../../hooks/form/HandleInputChange";
import useHandleFuzzyInputChange from "../../../hooks/form/HandleFuzzyInputChange";
import useHandleInputAddition from "../../../hooks/form/HandleInputAddition";
import useHandleInputDeletion from "../../../hooks/form/HandleInputDeletion";
import useHandleDropdownItemSelect from "../../../hooks/form/HandleDropdownItemSelect";

import * as releaseActions from "../../../store/actions/index";

//===============================================================================================================//

const ReleaseEdit = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const [getAvatar, setAvatar] = useState("releases/avatar.jpg");
	const [getAvatarName, setAvatarName] = useState("No file(s) selected");
	const [getAvatarFile, setAvatarFile] = useState("");
	const [getFormIsValid, setFormIsValid] = useState(true);
	const [getShowModal, setShowModal] = useState(false);

	const { onFetchRelease, onFetchTracks, onFetchArtists, onFetchLabels, onEditLocalRelease, onEditLocalTrack, stateRelease, stateSuccess, history, match } = props;
	const { updatedFormStd, formIsValidStd, inputChangeHandler } = useHandleInputChange();
	const { updatedFormFzy, formIsValidFzy, dataListIdFzy, fuzzyInputChangeHandler } = useHandleFuzzyInputChange();
	const { updatedFormAdd, inputAddHandler } = useHandleInputAddition();
	const { updatedFormDel, inputDeleteHandler } = useHandleInputDeletion();
	const { updatedFormDds, dropdownItemSelectHandler } = useHandleDropdownItemSelect();
	
	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Release, Tracks, Artists & Labels Effect Running!");
		onFetchRelease(match.params.id, true);
		onFetchTracks(match.params.id, true);
		onFetchArtists();
		onFetchLabels();
		accordion();
	}, [onFetchRelease, onFetchTracks, onFetchArtists, onFetchLabels, match]);

	//===============================================================================================================//
	
	useEffect(() => {
		console.log("Standard Input Effect Initialised!");
		if (updatedFormStd) {
			setFormIsValid(formIsValidStd);

			if (updatedFormStd.releaseForm) {
				console.log("Handle Standard Release Input Effect Running!");
				onEditLocalRelease(updatedFormStd); 
			}
			else if (updatedFormStd[0].trackForm) {
				console.log("Handle Standard Track Input Effect Running!");
				onEditLocalTrack(updatedFormStd); 
			}
		}
	}, [formIsValidStd, updatedFormStd, onEditLocalRelease, onEditLocalTrack]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("Fuzzy Input Effect Initialised!");
		if (updatedFormFzy && dataListIdFzy) {
			dropdownDatalistSetup(dataListIdFzy);
			setFormIsValid(formIsValidFzy);

			if (updatedFormFzy.releaseForm) {
				console.log("Handle Fuzzy Release Input Effect Running!");
				onEditLocalRelease(updatedFormFzy); 
			}
			else if (updatedFormFzy[0].trackForm) {
				console.log("Handle Fuzzy Track Input Effect Running!");
				onEditLocalTrack(updatedFormFzy); 
			}
		}
	}, [dataListIdFzy, formIsValidFzy, updatedFormFzy, onEditLocalRelease, onEditLocalTrack]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("Add / Delete / DropDown Effect Initialised!");
		if (updatedFormAdd) {
			console.log("Handle Add Input Effect Running!");
			onEditLocalTrack(updatedFormAdd);

		}
		if (updatedFormDel) {
			console.log("Handle Delete Input Effect Running!");
			onEditLocalTrack(updatedFormDel);

		}
		if (updatedFormDds) {

			if (updatedFormDds.releaseForm) {
				console.log("Handle Fuzzy Release DropDown Select Effect Running!");
				onEditLocalRelease(updatedFormDds); 
			}
			else if (updatedFormDds[0].trackForm) {
				console.log("Handle Fuzzy Track DropDown Select Effect Running!");
				onEditLocalTrack(updatedFormDds); 
			}
		}
	}, [updatedFormAdd, updatedFormDel, updatedFormDds, onEditLocalRelease, onEditLocalTrack]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("POST Form Effect Initialised!");
		if (stateSuccess !== null) {
			console.log("Successful POST Effect Running!");
			history.push({ pathname: "/releases/" + stateRelease._id });
		}
	}, [stateRelease, stateSuccess, history]);

	//===============================================================================================================//
	// Create & Handle Form Submission Object
	//===============================================================================================================//

  const releaseUpdateHandler = event => {
		event.preventDefault();
		
		const releaseId = props.stateRelease._id;
		const releaseDataObject = objBuilderRelease.baseReleaseObject();
		const tracksDataArray = [];
		let fileFlag = false;

		const releaseDataMap = new Map(Object.entries(props.stateReleaseForm));

    releaseDataMap.forEach(function(value, key) {
			switch (key) {
				case "label": 
					value.forEach(function(element) {
						element.linkedRecord ?
						releaseDataObject.labelName.push({ _id: element.fuzzyRef }) :
						releaseDataObject.labelName.push({ name: element.value });
					});
				break;
				case "formats":
					value.forEach(function(element) {
						releaseDataObject.releaseFormat.push({
							name: element.label,
							release: element.value
						});
					});
				break;
				case "imageUpload":
				break;
				default : 
					releaseDataObject[key] = value.value;		
			}
		});

		const tracksDataMap = new Map(Object.entries(props.stateTrackForm));

		tracksDataMap.forEach(function(value, key) {
			let track = objBuilderRelease.baseTrackObject();
			for ( let key in value ) {
				switch (key) {
					case "artists": 
						value[key].forEach(function(element) {
							element.linkedRecord ?
							track.artistName.push({ _id: element.fuzzyRef }) :
							track.artistName.push({ name: element.value });
						});
					break;
					default : 
						track[key] = value[key].value;
				}
				track.releaseTitle = releaseId;
				track.releaseCatalogue = releaseId;
				track.releasePicture = releaseId;
				track.releaseLabel = releaseDataObject.labelName[0]._id
					? releaseDataObject.labelName[0]._id
					: "";
			}
			tracksDataArray.push(track);
		})

		const releaseData = { release: { 
			release: releaseDataObject,
			tracks: tracksDataArray
		} };
		let updatedReleaseData = releaseData;

		if (getAvatarFile) { 
			updatedReleaseData = new FormData();
			updatedReleaseData.append("id", releaseId);
			updatedReleaseData.append("image", getAvatarFile);
			updatedReleaseData.append("release", JSON.stringify(releaseData));
			fileFlag = true;
		}

		console.log(updatedReleaseData);
    //props.onUpdateRelease(releaseId, updatedReleaseData, fileFlag);
  };

	//===============================================================================================================//
	// Prepare HTML Form Using Processed ReleaseForm Object Array From Redux Store
	//===============================================================================================================//

	const releaseFormRender = (arrayElement, arrayIndex) => {
		switch (arrayElement.id) {
			case "releaseForm":
				break;
			case "imageUpload": 
				return <FileInput
					key={arrayIndex}
					elementAttributes={arrayElement.attributes}
					elementImage={
						arrayElement.attributes.pictureLocation
							? `releases/${arrayElement.attributes.pictureLocation}`
							: getAvatar
					}
					elementImageName={
						arrayElement.attributes.pictureName
							? arrayElement.attributes.pictureName
							: getAvatarName
					}
					hasUpload={getAvatarFile ? true : false}
					imageUpload={`${getAvatar}`}
					imageNameUpload={getAvatarName}
					title={props.stateRelease.title}
					changed={event => imageUploadPreviewHandler(event)}
				/>
			case "label":
				return <Auxiliary key={arrayIndex}>
				{arrayElement.attributes.map((labelElement, labelIndex) =>
					<FuzzyInput
						key={labelIndex}
						elementIndex={labelIndex}
						elementAttributes={labelElement}
						elementValid={!labelElement.valid}
						clicked={event =>
							dropdownItemSelectHandler(
								event,
								props.stateReleaseForm[arrayElement.id][labelIndex],
								`${arrayElement.id}[${labelIndex}]`,
								props.stateReleaseForm
							)
						}
						changed={event =>
							fuzzyInputChangeHandler(
								event,
								props.stateReleaseForm[arrayElement.id][labelIndex],
								`${arrayElement.id}[${labelIndex}]`,
								props.stateReleaseForm,
								`${labelElement.labelFor}List`,
								props.stateLabels
							)
						}
						keyup={event =>
							dropdownItemSelectHandler(
								event,
								props.stateReleaseForm[arrayElement.id][labelIndex],
								`${arrayElement.id}[${labelIndex}]`,
								props.stateReleaseForm,
								`${labelElement.labelFor}List`
							)
						}
					/>
					)}
				</Auxiliary>
			case "formats":
				return <fieldset key={arrayIndex}>
					<legend>Release Formats</legend>
					{arrayElement.attributes.map((formatElement, formatIndex) =>
						<Input
							key={formatIndex}
							elementAttributes={formatElement}
							elementValid={!formatElement.valid}
							changed={event =>
								inputChangeHandler(
									event,
									props.stateReleaseForm[arrayElement.id][formatIndex],
									`${arrayElement.id}[${formatIndex}]`,
									props.stateReleaseForm
								)
							}
						/>	
					)}
				</fieldset>
			default:
				return <Input
					key={arrayIndex}
					elementAttributes={arrayElement.attributes}
					elementValid={!arrayElement.attributes.valid}
					changed={event =>
						inputChangeHandler(
							event,
							props.stateReleaseForm[arrayElement.id],
							`${arrayElement.id}`,
							props.stateReleaseForm
						)
					}
				/>
		}
	}
	
	//===============================================================================================================//
	// Prepare HTML Form Using Processed TrackForm Object Array From Redux Store
	//===============================================================================================================//

  const trackFormRender = (arrayElement, arrayIndex, trackIndex) => {
		switch (arrayElement.id) {
			case "trackForm":
				break;
			case "trackId":
				break;
			case "artists":
				return <fieldset key={arrayIndex}>
				<legend>Artists</legend>
					{arrayElement.attributes.map((artistElement, artistIndex) =>
						<FuzzyInputDelete
							key={artistIndex}
							elementIndex={artistIndex}
							elementAttributes={artistElement}
							elementValid={!artistElement.valid}
							clicked={event =>
								dropdownItemSelectHandler(
									event,
									props.stateTrackForm[trackIndex][arrayElement.id][artistIndex],
									`[${trackIndex}]${arrayElement.id}[${artistIndex}]`,
									props.stateTrackForm
								)
							}
							changed={event =>
								fuzzyInputChangeHandler(
									event,
									props.stateTrackForm[trackIndex][arrayElement.id][artistIndex],
									`[${trackIndex}]${arrayElement.id}[${artistIndex}]`,
									props.stateTrackForm,
									`${artistElement.labelFor}List`,
									props.stateArtists
								)
							}
							keyup={event =>
								dropdownItemSelectHandler(
									event,
									props.stateTrackForm[trackIndex][arrayElement.id][artistIndex],
									`[${trackIndex}]${arrayElement.id}[${artistIndex}]`,
									props.stateTrackForm,
									`${artistElement.labelFor}List`
								)
							}
							delete={event =>
								inputDeleteHandler(
									event,
									props.stateTrackForm[trackIndex][arrayElement.id],
									`[${trackIndex}][${arrayElement.id}]`,
									props.stateTrackForm,
									artistIndex
								)
							}
						/>
					)}
					<Button 
						type={"primary"}
						clicked={event =>
							this.inputAddHandler(
								event,
								props.stateTrackForm[trackIndex][arrayElement.id],
								`[${trackIndex}][${[arrayElement.id]}]`,
								props.stateTrackForm,
								`artists`
							)
						}
					>
						Add Artist
					</Button>
				</fieldset>
			default:
				return <Input
					key={arrayIndex}
					elementAttributes={arrayElement.attributes}
					elementValid={!arrayElement.attributes.valid}
					changed={event =>
						inputChangeHandler(
							event,
							props.stateTrackForm[trackIndex][arrayElement.id],
							`[${trackIndex}]${arrayElement.id}`,
							props.stateTrackForm
						)
					}
				/>
		}
	}
	
  //===============================================================================================================//

	const imageUploadPreviewHandler = event => {
		setAvatar(URL.createObjectURL(event.target.files[0]));
		setAvatarName(event.target.files[0].name);
		setAvatarFile(event.target.files[0]);
	};

	//===============================================================================================================//
	// Release Action Helpers
	//===============================================================================================================//

	const releaseRedirectHandler = event => {
		event.preventDefault();
		props.onResetStatus();
		props.stateRelease._id
		? props.history.push({ pathname: "/releases/" + props.stateRelease._id })
		: props.history.push({ pathname: "/releases/" });
	};

	const releaseMessageHandler = event => {
		event.preventDefault();
		props.onResetStatus();
	};

	//===============================================================================================================//

	const releaseDeleteCheckHandler = event => {
		event.preventDefault();
		setShowModal(true);
	};

	const releaseDeleteCancelHandler = event => {
		event.preventDefault();
		setShowModal(false);
	};

	const releaseDeleteConfirmHandler = event => {
		event.preventDefault();
		props.onDeleteArtist(props.stateRelease._id);
		props.history.push({ pathname: "/releases/" });
	};

	//===============================================================================================================//
	// Render Edit Release Form
	//===============================================================================================================//

	let releaseFormElements = [];
	let trackFormElements = [];

	if (!props.stateLoading && props.stateReleaseForm && props.stateTrackForm) {
		for (let key in props.stateReleaseForm) {
			releaseFormElements.push({
				id: key,
				attributes: props.stateReleaseForm[key]
			});
		}
		props.stateTrackForm.forEach((track) => {
			let trackElement = [];
			for (let key in track) {
				trackElement.push({
					id: key,
					value: track[key].value,
					attributes: track[key]
				});
			}
			trackFormElements.push(trackElement);
		});
	}

	//===============================================================================================================//

	let releaseForm = <Loader />;
	if (!props.stateLoading && props.stateError && !props.stateRelease) {
		releaseForm = (
			<Auxiliary>
				<h1>There was a problem with your request</h1>
				<StatusMessage
					status={"warning"}
					headline={props.stateError}
					response={props.stateResponse}
					message={props.stateFeedback}
					action={releaseRedirectHandler}
					buttonText={`OK`}
				/>
			</Auxiliary>
		);
	}
	if (!props.stateLoading && props.stateRelease && props.stateTracks) {
		releaseForm = (
			<div className="container">
				<h1>{props.stateRelease.title}</h1>
				{props.stateError ? (
					<Auxiliary>
						<StatusMessage
							status={"warning"}
							headline={props.stateError}
							response={props.stateResponse}
							message={props.stateFeedback}
							action={releaseMessageHandler}
							buttonText={`Close`}
						/>
					</Auxiliary>
				) : null }
				<h2>Update Release Details</h2>
				<div className="userform">
					<form onSubmit={releaseUpdateHandler}>
						<div className="input-wrapper">
							{releaseFormElements.map((element, index) =>
								releaseFormRender(element, index)
							)}
							<fieldset data-accordion-group="true">
								<legend>Tracks ({trackFormElements.length})</legend>
									{trackFormElements.map((trackElement, trackIndex) =>
										<details key={trackIndex}>
											<summary aria-expanded="false" data-accordion-control="true" aria-controls={`accordionContainer${trackIndex}`} id={`accordionControl${trackIndex}`}>
												Edit Track {trackIndex + 1}: {trackElement[2].value}
											</summary>
											<div id={`accordionContainer${trackIndex}`} role="region" aria-labelledby={`accordionControl${trackIndex}`} data-accordion-content="true">
												{trackElement.map((element, index) =>
													trackFormRender(element, index, trackIndex)
												)}
												<Button
													type={"warning"}
													clicked={event => 
														inputDeleteHandler(
															event,
															props.stateTrackForm,
															"root",
															props.stateTrackForm,
															trackIndex
														)
													}
												>
													Delete Track
												</Button>
											</div>	
										</details>
									)}
									<Button 
										type={"primary"}
										clicked={event => 
											inputAddHandler(
												event,
												props.stateTrackForm,
												"root",
												props.stateTrackForm,
												"tracks"
											)
										}
									>
										Add New Track
									</Button>
							</fieldset>
						</div>
						<div className={"userform--actions"}>
						<Button
								type={getFormIsValid ? "primary" : "disabled"}
								disabled={!getFormIsValid}
							>
								Save Release
							</Button>
							<Button type={"grey"} clicked={releaseRedirectHandler}>
								Cancel
							</Button>
							<Button
									type={"warning"}
									clicked={releaseDeleteCheckHandler}
							>
								Delete Release
							</Button>
						</div>
					</form>
				</div>
				<Modal
					show={getShowModal}
					hide={releaseDeleteCancelHandler}
					action={releaseDeleteConfirmHandler}
					status={"warning"}
					headline={`Delete Release Details`}
					bespokeText={`Please confirm you wish to delete <strong> ${props.stateRelease.title} </strong> from the database.`}
					buttonText={`Delete Release`}
				>
					<Button type={"grey"} clicked={releaseDeleteCancelHandler}>
						Cancel
					</Button>
				</Modal>
			</div>
		);
	}
	return releaseForm;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
  return {
    stateRelease: state.release.release,
    stateArtists: state.artist.artists,
		stateLabels: state.label.labels,
		stateTracks: state.track.tracks,
		stateReleaseForm: state.release.releaseForm,
		stateTrackForm: state.track.trackForm,
    stateLoading: state.release.loading,
    stateError: state.release.error,
    stateSuccess: state.release.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRelease: (releaseId, edit) =>
			dispatch(releaseActions.fetchReleaseSend(releaseId, edit)),
		onFetchTracks: (releaseId, edit) =>
			dispatch(releaseActions.fetchTracksByReleaseSend(releaseId, edit)),
    onFetchArtists: () => 
			dispatch(releaseActions.fetchArtistsSend()),
    onFetchLabels: () => 
			dispatch(releaseActions.fetchLabelsSend()),
    onEditLocalRelease: updatedReleaseForm =>
			dispatch(releaseActions.editReleaseClientInput(updatedReleaseForm)),
		onEditLocalTrack: updatedTrackForm =>
      dispatch(releaseActions.editTrackClientInput(updatedTrackForm)),
    onUpdateRelease: (releaseId, updatedReleaseData, fileFlag) =>
      dispatch(releaseActions.updateReleaseSend(releaseId, updatedReleaseData, fileFlag)),
    onDeleteRelease: releaseId =>
      dispatch(releaseActions.deleteReleaseSend(releaseId)),
    onResetStatus: () => 
			dispatch(releaseActions.releaseResetStatus())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleaseEdit);

//===============================================================================================================//
