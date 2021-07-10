import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./LabelAdd.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Input from "../../../components/Utilities/Form/Input/Input";
import FileInput from "../../../components/Utilities/Form/File/File";
import FuzzyInput from "../../../components/Utilities/Form/FuzzyInput/FuzzyInput";
import FuzzyInputDelete from "../../../components/Utilities/Form/FuzzyInput/FuzzyInputDelete";

import Button from "../../../components/Utilities/UI/Button/Button";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as objBuilderLabel from "../../../utilities/objectHelpers/objectBuilderLabel"
import { dropdownDatalistSetup } from "../../../utilities/formHelpers/formFuzzyDropdown";

import useHandleInputChange from "../../../hooks/form/HandleInputChange";
import useHandleFuzzyInputChange from "../../../hooks/form/HandleFuzzyInputChange";
import useHandleInputAddition from "../../../hooks/form/HandleInputAddition";
import useHandleInputDeletion from "../../../hooks/form/HandleInputDeletion";
import useHandleDropdownItemSelect from "../../../hooks/form/HandleDropdownItemSelect";

import * as labelActions from "../../../store/actions/index";

//===============================================================================================================//

const LabelAdd = props => {

	//===============================================================================================================//
	// Set Up Component STATE & Initialise HOOKS
	//===============================================================================================================//

	const [getAvatar, setAvatar] = useState("labels/avatar.jpg");
	const [getAvatarName, setAvatarName] = useState("No file(s) selected");
	const [getAvatarFile, setAvatarFile] = useState("");
	const [getFormIsValid, setFormIsValid] = useState(false);

	const { onCreateLabelForm, onFetchLabels, onEditLocalLabel, stateSuccess, history } = props;
	const { updatedFormStd, formIsValidStd, inputChangeHandler } = useHandleInputChange();
	const { updatedFormFzy, formIsValidFzy, dataListIdFzy, fuzzyInputChangeHandler } = useHandleFuzzyInputChange();
	const { updatedFormAdd, inputAddHandler } = useHandleInputAddition();
	const { updatedFormDel, inputDeleteHandler } = useHandleInputDeletion();
	const { updatedFormDds, dropdownItemSelectHandler } = useHandleDropdownItemSelect();
	
	//===============================================================================================================//
	// Setup useEffect Functions
	//===============================================================================================================//

	useEffect(() => {
		console.log("Initial Get Labels & Create Form Effect Running!");
		onCreateLabelForm();
		onFetchLabels();
	}, [onCreateLabelForm, onFetchLabels]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("Standard Input Effect Initialised!");
		if (updatedFormStd) {
			console.log("Handle Standard Input Effect Running!");
			setFormIsValid(formIsValidStd);
			onEditLocalLabel(updatedFormStd);
		}
	}, [formIsValidStd, updatedFormStd, onEditLocalLabel]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("Fuzzy Input Effect Initialised!");
		if (updatedFormFzy && dataListIdFzy) {
			console.log("Handle Fuzzy Input Effect Running!");
			dropdownDatalistSetup(dataListIdFzy);
			setFormIsValid(formIsValidFzy);
			onEditLocalLabel(updatedFormFzy);
		}
	}, [dataListIdFzy, formIsValidFzy, updatedFormFzy, onEditLocalLabel]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("Add / Delete / DropDown Effect Initialised!");
		if (updatedFormAdd) {
			console.log("Handle Add Input Effect Running!");
			onEditLocalLabel(updatedFormAdd); 
		}
		if (updatedFormDel) {
			console.log("Handle Delete Input Effect Running!");
			onEditLocalLabel(updatedFormDel); 
		}
		if (updatedFormDds) {
			console.log("Handle Fuzzy DropDown Select Effect Running!");
			onEditLocalLabel(updatedFormDds); 
		}
	}, [updatedFormAdd, updatedFormDel, updatedFormDds, onEditLocalLabel]);

	//===============================================================================================================//

	useEffect(() => {
		console.log("POST Form Effect Initialised!");
		if (stateSuccess !== null) {
			console.log("Successful POST Effect Running!");
			history.push({ pathname: "/labels/" });
		}
	}, [stateSuccess, history]);

	//===============================================================================================================//
	// Create & Handle Form Submission Object
	//===============================================================================================================//

	const labelCreateHandler = event => {
		event.preventDefault();
		
		const labelDataObject = objBuilderLabel.baseLabelObject();
		let fileFlag = false;

		const labelDataMap = new Map(Object.entries(props.stateLabelForm));
		//console.log(labelDataMap);

		labelDataMap.forEach(function(value, key) {
			switch (key) {
				case "parentLabel":
					value.forEach(function(element) {
						element.linkedRecord ?
						labelDataObject.parentLabel.push({ _id: element.fuzzyRef }) :
						labelDataObject.parentLabel.push({ name: element.value });
					});
				break;
				case "subsidiaryLabels": 
					value.forEach(function(element) {
						element.linkedRecord ?
						labelDataObject.subsidiaryLabel.push({ _id: element.fuzzyRef }) :
						labelDataObject.subsidiaryLabel.push({ name: element.value });
					});
				break;
				case "websites":
					value.forEach(function(element) {
						labelDataObject.website.push({
							name: element.label,
							url: element.value
						});
					});
				break;
				default : 
					labelDataObject[key] = value.value;		
			}
		});

		const labelData = { label: labelDataObject };
		let newLabelData = labelData;

		if (getAvatarFile) { 
			newLabelData = new FormData();
			newLabelData.append("image", getAvatarFile);
			newLabelData.append("label", JSON.stringify(labelData));
			fileFlag = true;
		}

		//console.log(newLabelData)
		props.onAddLabel(newLabelData, fileFlag);
	};

	//===============================================================================================================//
	// Prepare HTML Form Using Processed LabelForm Object Array From Redux Store
	//===============================================================================================================//

	const labelFormRender = (arrayElement, arrayIndex) => {
		switch (arrayElement.id) {
			case "labelForm":
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
			case "labelName":
				return <FuzzyInput
					key={arrayIndex}
					elementAttributes={arrayElement.attributes}
					elementValid={!arrayElement.attributes.valid}
					clicked={event =>
						dropdownItemSelectHandler(
							event,
							props.stateLabelForm[arrayElement.id],
							`${arrayElement.id}`,
							props.stateLabelForm
						)
					}
					changed={event =>
						fuzzyInputChangeHandler(
							event,
							props.stateLabelForm[arrayElement.id],
							`${arrayElement.id}`,
							props.stateLabelForm,
							`${arrayElement.attributes.labelFor}List`,
							props.stateLabels
						)
					}
					keyup={event =>
						dropdownItemSelectHandler(
							event,
							props.stateLabelForm[arrayElement.id],
							`${arrayElement.id}`,
							props.stateLabelForm,
							`${arrayElement.attributes.labelFor}List`
						)
					}
				/>
			case "parentLabel":
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
								props.stateLabelForm[arrayElement.id][labelIndex],
								`${arrayElement.id}[${labelIndex}]`,
								props.stateLabelForm
							)
						}
						changed={event =>
							fuzzyInputChangeHandler(
								event,
								props.stateLabelForm[arrayElement.id][labelIndex],
								`${arrayElement.id}[${labelIndex}]`,
								props.stateLabelForm,
								`${labelElement.labelFor}List`,
								props.stateLabels
							)
						}
						keyup={event =>
							dropdownItemSelectHandler(
								event,
								props.stateLabelForm[arrayElement.id][labelIndex],
								`${arrayElement.id}[${labelIndex}]`,
								props.stateLabelForm,
								`${labelElement.labelFor}List`
							)
						}
					/>
					)}
				</Auxiliary>
			case "subsidiaryLabels":
				return <fieldset key={arrayIndex}>
					<legend>Subsidiary Labels</legend>
					{arrayElement.attributes.map((labelElement, labelIndex) =>
						<FuzzyInputDelete
							key={labelIndex}
							elementIndex={labelIndex}
							elementAttributes={labelElement}
							elementValid={!labelElement.valid}
							clicked={event =>
								dropdownItemSelectHandler(
									event,
									props.stateLabelForm[arrayElement.id][labelIndex],
									`${arrayElement.id}[${labelIndex}]`,
									props.stateLabelForm
								)
							}
							changed={event =>
								fuzzyInputChangeHandler(
									event,
									props.stateLabelForm[arrayElement.id][labelIndex],
									`${arrayElement.id}[${labelIndex}]`,
									props.stateLabelForm,
									`${labelElement.labelFor}List`,
									props.stateLabels
								)
							}
							keyup={event =>
								dropdownItemSelectHandler(
									event,
									props.stateLabelForm[arrayElement.id][labelIndex],
									`${arrayElement.id}[${labelIndex}]`,
									props.stateLabelForm,
									`${labelElement.labelFor}List`
								)
							}
							delete={event => 
								inputDeleteHandler(
									event,
									props.stateLabelForm[arrayElement.id],
									`${arrayElement.id}`,
									props.stateLabelForm,
									labelIndex
								)
							}
						/>
					)}
					<Button 
						type={"primary"}
						clicked={event => 
							inputAddHandler(
								event,
								props.stateLabelForm[arrayElement.id],
								`${arrayElement.id}`,
								props.stateLabelForm,
								`subsidiaryLabels`
							)
						}
					>
						Add Subsidiary Label
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
									props.stateLabelForm[arrayElement.id][websiteIndex],
									`${arrayElement.id}[${websiteIndex}]`,
									props.stateLabelForm
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
						props.stateLabelForm[arrayElement.id],
						`${arrayElement.id}`,
						props.stateLabelForm
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
	// Label Action Helpers
	//===============================================================================================================//

	const labelRedirectHandler = event => {
		event.preventDefault();
		props.onResetStatus();
		props.history.push({ pathname: "/" });
	};

	const labelMessageHandler = event => {
		event.preventDefault();
		props.onResetStatus();
	};

	//===============================================================================================================//
	// Render Add Label Form
	//===============================================================================================================//

	let formElements = [];

	if (!props.stateLoading && props.stateLabelForm) {
		for (let key in props.stateLabelForm) {
			formElements.push({
				id: key,
				attributes: props.stateLabelForm[key]
			});
		}
	}

	//===============================================================================================================//

	let labelForm = <Loader />;
	if (!props.stateLoading && props.stateLabelForm) {
		labelForm = (
			<div className="container">
				<h1>Add New Label</h1>
				{ props.stateError ? (
					<Auxiliary>
						<StatusMessage
							status={"warning"}
							headline={props.stateError}
							response={props.stateResponse}
							message={props.stateFeedback}
							action={labelMessageHandler}
							buttonText={`Close`}
						/>
					</Auxiliary>
				) : null }
				<div className="userform">
					<form onSubmit={labelCreateHandler}>
						<div className="input-wrapper">
							{formElements.map((element, index) =>
								labelFormRender(element, index)
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
								clicked={labelRedirectHandler}>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</div>
		);
	}
	return labelForm;
}

//===============================================================================================================//
// Redux STATE Management
//===============================================================================================================//

const mapStateToProps = state => {
	return {
		stateLabelForm: state.label.labelForm,
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
		onCreateLabelForm: () => dispatch(labelActions.addLabelClientPrep()),
		onFetchLabels: () => dispatch(labelActions.fetchLabelsSend()),
		onEditLocalLabel: updatedLabelForm =>
			dispatch(labelActions.editLabelClientInput(updatedLabelForm)),
		onAddLabel: (newLabelData, fileFlag) =>
			dispatch(labelActions.addLabelSend(newLabelData, fileFlag)),
		onResetStatus: () => dispatch(labelActions.labelResetStatus())
	};
};

//===============================================================================================================//

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LabelAdd);
