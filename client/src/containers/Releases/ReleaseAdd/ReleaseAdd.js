import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./ReleaseAdd.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Input from "../../../components/Utilities/Form/Input/Input";
import FileInput from "../../../components/Utilities/Form/File/File";
import FuzzyInput from "../../../components/Utilities/Form/FuzzyInput/FuzzyInput";
import FuzzyInputDelete from "../../../components/Utilities/Form/FuzzyInput/FuzzyInputDelete";

import Button from "../../../components/Utilities/UI/Button/Button";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
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

const ReleaseAdd = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const [getAvatar, setAvatar] = useState("releases/avatar.jpg");
	const [getAvatarName, setAvatarName] = useState("No file(s) selected");
	const [getAvatarFile, setAvatarFile] = useState("");
	const [getFormIsValid, setFormIsValid] = useState(false);

	const { onCreateReleaseForm, onCreateTrackForm, onFetchArtists, onFetchLabels, onEditLocalRelease, onEditLocalTrack, stateSuccess, history } = props;
	const { updatedFormStd, formIsValidStd, inputChangeHandler } = useHandleInputChange();
	const { updatedFormFzy, formIsValidFzy, dataListIdFzy, fuzzyInputChangeHandler } = useHandleFuzzyInputChange();
	const { updatedFormAdd, inputAddHandler } = useHandleInputAddition();
	const { updatedFormDel, inputDeleteHandler } = useHandleInputDeletion();
	const { updatedFormDds, dropdownItemSelectHandler } = useHandleDropdownItemSelect();
	
	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Artists & Labels & Create Release & Track Forms Effect Running!");
		onCreateReleaseForm();
		onCreateTrackForm();
		onFetchArtists();
		onFetchLabels();
		accordion();
	}, [onCreateReleaseForm, onCreateTrackForm, onFetchArtists, onFetchLabels]);

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
			history.push({ pathname: "/releases/" });
		}
	}, [stateSuccess, history]);

	//===============================================================================================================//
	// Create & Handle Form Submission Object
	//===============================================================================================================//

	const releaseCreateHandler = event => {
		event.preventDefault();

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
		let newReleaseData = releaseData;

		if (getAvatarFile) { 
			newReleaseData = new FormData();
			newReleaseData.append("image", getAvatarFile);
			newReleaseData.append("release", JSON.stringify(releaseData));
			fileFlag = true;
		}

		// console.log(newReleaseData);
		props.onAddRelease(newReleaseData, fileFlag);
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
					elementImage={getAvatar}
					elementImageName={getAvatarName}
					hasUpload={getAvatarFile ? true : false}
					imageUpload={getAvatar}
					imageNameUpload={getAvatarName}
					title={""}
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
		props.history.push({ pathname: "/" });
	};

	const releaseMessageHandler = event => {
		event.preventDefault();
		props.onResetStatus();
	};

	//===============================================================================================================//
	// Render Add Release Form
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
	if (!props.stateLoading && props.stateReleaseForm && props.stateTrackForm) {
		releaseForm = (
			<div className="container">
				<h1>Add New Release</h1>
				{ props.stateError ? (
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
				<div className="userform">
					<form onSubmit={releaseCreateHandler}>
						<div className="input-wrapper">

							{releaseFormElements.map((element, index) =>
								releaseFormRender(element, index)
							)}
							<fieldset data-accordion-group="true">
								<legend>Tracks ({trackFormElements.length})</legend>
									{trackFormElements.map((trackElement, trackIndex) =>
										<details key={trackIndex}>
											<summary aria-expanded="false" data-accordion-control="true" aria-controls={`accordionContainer${trackIndex}`} id={`accordionControl${trackIndex}`}>
												Add Track {trackIndex + 1}: {trackElement[2].value}
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
							<Button
								type={"warning"}
								clicked={releaseRedirectHandler}>
								Cancel
							</Button>
						</div>
					</form>
				</div>
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
		stateReleaseForm: state.release.releaseForm,
		stateTrackForm: state.track.trackForm,
		stateArtists: state.artist.artists,
		stateLabels: state.label.labels,
		stateLoading: state.release.loading,
		stateError: state.release.error,
		stateSuccess: state.release.success,
		stateResponse: state.release.response,
		stateFeedback: state.release.feedback
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateReleaseForm: () => 
			dispatch(releaseActions.addReleaseClientPrep()),
		onCreateTrackForm: () => 
			dispatch(releaseActions.addTrackClientPrep()),
		onFetchArtists: () => 
			dispatch(releaseActions.fetchArtistsSend()),
		onFetchLabels: () => 
			dispatch(releaseActions.fetchLabelsSend()),
		onEditLocalRelease: updatedReleaseForm =>
			dispatch(releaseActions.editReleaseClientInput(updatedReleaseForm)),
		onEditLocalTrack: updatedTrackForm =>
			dispatch(releaseActions.editTrackClientInput(updatedTrackForm)),
		onAddRelease: (newReleaseData, fileFlag) =>
			dispatch(releaseActions.addReleaseSend(newReleaseData, fileFlag)),
		onResetStatus: () => 
			dispatch(releaseActions.releaseResetStatus())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReleaseAdd);
