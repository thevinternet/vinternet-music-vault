import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./ArtistAdd.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Input from "../../../components/Utilities/Form/Input/Input";
import FileInput from "../../../components/Utilities/Form/File/File";
import FuzzyInput from "../../../components/Utilities/Form/FuzzyInput/FuzzyInput";
import FuzzyInputDelete from "../../../components/Utilities/Form/FuzzyInput/FuzzyInputDelete";

import Button from "../../../components/Utilities/UI/Button/Button";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as objBuilderArtist from "../../../utilities/objectHelpers/objectBuilderArtist";
import { dropdownDatalistSetup } from "../../../utilities/formHelpers/formFuzzyDropdown";

import useHandleInputChange from "../../../hooks/form/HandleInputChange";
import useHandleFuzzyInputChange from "../../../hooks/form/HandleFuzzyInputChange";
import useHandleInputAddition from "../../../hooks/form/HandleInputAddition";
import useHandleInputDeletion from "../../../hooks/form/HandleInputDeletion";
import useHandleDropdownItemSelect from "../../../hooks/form/HandleDropdownItemSelect";

import * as artistActions from "../../../store/actions/index";

//===============================================================================================================//

const ArtistAdd = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const [getAvatar, setAvatar] = useState("artists/avatar.jpg");
	const [getAvatarName, setAvatarName] = useState("No file(s) selected");
	const [getAvatarFile, setAvatarFile] = useState("");
	const [getFormIsValid, setFormIsValid] = useState(false);

	const { onCreateArtistForm, onFetchArtists, onEditLocalArtist, stateSuccess, history } = props;
	const { updatedFormStd, formIsValidStd, inputChangeHandler } = useHandleInputChange();
	const { updatedFormFzy, formIsValidFzy, dataListIdFzy, fuzzyInputChangeHandler } = useHandleFuzzyInputChange();
	const { updatedFormAdd, inputAddHandler } = useHandleInputAddition();
	const { updatedFormDel, inputDeleteHandler } = useHandleInputDeletion();
	const { updatedFormDds, dropdownItemSelectHandler } = useHandleDropdownItemSelect();

	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Artists & Create Form Effect Running!");
		onCreateArtistForm();
		onFetchArtists();
	}, [onCreateArtistForm, onFetchArtists]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("Standard Input Effect Initialised!");
		if (updatedFormStd) {
			console.log("Handle Standard Input Effect Running!");
			setFormIsValid(formIsValidStd);
			onEditLocalArtist(updatedFormStd);
		}
	}, [formIsValidStd, updatedFormStd, onEditLocalArtist]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("Fuzzy Input Effect Initialised!");
		if (updatedFormFzy && dataListIdFzy) {
			console.log("Handle Fuzzy Input Effect Running!");
			dropdownDatalistSetup(dataListIdFzy);
			setFormIsValid(formIsValidFzy);
			onEditLocalArtist(updatedFormFzy);
		}
	}, [dataListIdFzy, formIsValidFzy, updatedFormFzy, onEditLocalArtist]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("Add / Delete / DropDown Effect Initialised!");
		if (updatedFormAdd) {
			console.log("Handle Add Input Effect Running!");
			onEditLocalArtist(updatedFormAdd); 
		}
		if (updatedFormDel) {
			console.log("Handle Delete Input Effect Running!");
			onEditLocalArtist(updatedFormDel); 
		}
		if (updatedFormDds) {
			console.log("Handle Fuzzy DropDown Select Effect Running!");
			onEditLocalArtist(updatedFormDds); 
		}
	}, [updatedFormAdd, updatedFormDel, updatedFormDds, onEditLocalArtist]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("POST Form Effect Initialised!");
		if (stateSuccess !== null) {
			console.log("Successful POST Effect Running!");
			history.push({ pathname: "/artists/" });
		}
	}, [stateSuccess, history]);

	//===============================================================================================================//
	// Create & Handle Form Submission Object
	//===============================================================================================================//

	const artistCreateHandler = event => {
		event.preventDefault();
	
		const artistDataObject = objBuilderArtist.baseArtistObject();
		let fileFlag = false;

		const artistDataMap = new Map(Object.entries(props.stateArtistForm));

		artistDataMap.forEach(function(value, key) {
			switch (key) {
				case "aliasNames": 
					value.forEach(function(element) {
						element.linkedRecord ?
						artistDataObject.aliasName.push({ _id: element.id }) :
						artistDataObject.aliasName.push({ name: element.value });
					});
				break;
				case "websites":
					value.forEach(function(element) {
						artistDataObject.website.push({
							name: element.label,
							url: element.value
						});
					});
				break;
				default : 
					artistDataObject[key] = value.value;
			}
		});

		const artistData = { artist : artistDataObject }
		let newArtistData = artistData;

		if (getAvatarName) {
			newArtistData = new FormData();
			newArtistData.append("image", getAvatarFile);
			newArtistData.append("artist", JSON.stringify(artistData));
			fileFlag = true;
		}

		props.onAddArtist(newArtistData, fileFlag);
	};

	//===============================================================================================================//
	// Prepare HTML Form Using Processed ArtistForm Object Array From Redux Store
	//===============================================================================================================//
	
	const artistFormRender = (arrayElement, arrayIndex) => {
		switch (arrayElement.id) {
			case "artistForm":
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
			case "artistName":
				return <FuzzyInput
					key={arrayIndex}
					elementAttributes={arrayElement.attributes}
					elementValid={!arrayElement.attributes.valid}
					clicked={event =>
						dropdownItemSelectHandler(
							event,
							props.stateArtistForm[arrayElement.id],
							`${arrayElement.id}`,
							props.stateArtistForm
						)
					}
					changed={event =>
						fuzzyInputChangeHandler(
							event,
							props.stateArtistForm[arrayElement.id],
							`${arrayElement.id}`,
							props.stateArtistForm,
							`${arrayElement.attributes.labelFor}List`,
							props.stateArtists
						)
					}
					keyup={event =>
						dropdownItemSelectHandler(
							event,
							props.stateArtistForm[arrayElement.id],
							`${arrayElement.id}`,
							props.stateArtistForm,
							`${arrayElement.attributes.labelFor}List`
						)
					}
				/>
				case "aliasNames":
					return <fieldset key={arrayIndex}>
						<legend>Alias Names</legend>
						{arrayElement.attributes.map((aliasElement, aliasIndex) =>
							<FuzzyInputDelete
								key={aliasIndex}
								elementIndex={aliasIndex}
								elementAttributes={aliasElement}
								elementValid={!aliasElement.valid}
								clicked={event =>
									dropdownItemSelectHandler(
										event,
										props.stateArtistForm[arrayElement.id][aliasIndex],
										`${arrayElement.id}[${aliasIndex}]`,
										props.stateArtistForm
									)
								}
								changed={event =>
									fuzzyInputChangeHandler(
										event,
										props.stateArtistForm[arrayElement.id][aliasIndex],
										`${arrayElement.id}[${aliasIndex}]`,
										props.stateArtistForm,
										`${aliasElement.labelFor}List`,
										props.stateArtists
									)
								}
								keyup={event =>
									dropdownItemSelectHandler(
										event,
										props.stateArtistForm[arrayElement.id][aliasIndex],
										`${arrayElement.id}[${aliasIndex}]`,
										props.stateArtistForm,
										`${aliasElement.labelFor}List`
									)
								}
								delete={event => inputDeleteHandler(
									event,
									props.stateArtistForm[arrayElement.id],
									`${arrayElement.id}`,
									props.stateArtistForm,
									aliasIndex
									)
								}
							/>
						)}
						<Button 
							type={"primary"}
							clicked={event => inputAddHandler(
								event,
								props.stateArtistForm[arrayElement.id],
								`${arrayElement.id}`,
								props.stateArtistForm,
								`aliasNames`
							)}
						>
							Add Alias Name
						</Button>
					</fieldset>
				case "websites":
					return <fieldset key={arrayIndex}>
						<legend>Websites</legend>
						{arrayElement.attributes.map((websiteElement, websiteIndex) =>
							<Input
								key={websiteIndex}
								elementAttributes={websiteElement}
								elementValid={!websiteElement.valid}
								changed={event =>
									inputChangeHandler(
										event,
										props.stateArtistForm[arrayElement.id][websiteIndex],
										`${arrayElement.id}[${websiteIndex}]`,
										props.stateArtistForm
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
							props.stateArtistForm[arrayElement.id],
							`${arrayElement.id}`,
							props.stateArtistForm
						)
					}
				/>
		}
	};

	//===============================================================================================================//

	const imageUploadPreviewHandler = event => {
		setAvatar(URL.createObjectURL(event.target.files[0]));
		setAvatarName(event.target.files[0].name);
		setAvatarFile(event.target.files[0]);
	};

	//===============================================================================================================//
	// Artist Action Helpers
	//===============================================================================================================//

	const artistRedirectHandler = event => {
		event.preventDefault();
		props.onResetStatus();
		props.history.push({ pathname: "/" });
	};

	const artistMessageHandler = event => {
		event.preventDefault();
		props.onResetStatus();
	};

	//===============================================================================================================//
	// Render Add Artist Form
	//===============================================================================================================//

	let formElements = [];
	if (!props.stateLoading && props.stateArtistForm) {
		for (let key in props.stateArtistForm) {
			formElements.push({
				id: key,
				attributes: props.stateArtistForm[key]
			});
		}
	}

	//===============================================================================================================//

	let artistForm = <Loader />;
	if (!props.stateLoading && props.stateArtistForm) {
		artistForm = (
			<div className="container">
				<h1>Add New Artist</h1>
				{ props.stateError ? (
					<Auxiliary>
						<StatusMessage
							status={"warning"}
							headline={props.stateError}
							response={props.stateResponse}
							message={props.stateFeedback}
							action={artistMessageHandler}
							buttonText={`Close`}
						/>
					</Auxiliary>
				) : null }
				<div className="userform">
					<form onSubmit={artistCreateHandler}>
						<div className="input-wrapper">
							{formElements.map((element, index) =>
								artistFormRender(element, index)
							)}
						</div>
						<div className={"userform--actions"}>
							<Button
								type={getFormIsValid ? "primary" : "disabled"}
								disabled={!getFormIsValid}
							>
								Save
							</Button>
							<Button
								type={"warning"}
								clicked={artistRedirectHandler}>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</div>
		);
	}
	return artistForm;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateArtistForm: state.artist.artistForm,
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
		onCreateArtistForm: () => dispatch(artistActions.addArtistClientPrep()),
		onFetchArtists: () => dispatch(artistActions.fetchArtistsSend()),
		onEditLocalArtist: updatedArtistForm =>
			dispatch(artistActions.editArtistClientInput(updatedArtistForm)),
		onAddArtist: (newArtistData, fileFlag) =>
			dispatch(artistActions.addArtistSend(newArtistData, fileFlag)),
		onResetStatus: () => dispatch(artistActions.artistResetStatus())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArtistAdd);
