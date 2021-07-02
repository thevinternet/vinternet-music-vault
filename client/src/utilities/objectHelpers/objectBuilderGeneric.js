//===============================================================================================================//

import produce from "immer";

import { checkInputValidity } from "../formHelpers/formValidation";
import { trackArtistFormElement } from "../formHelpers/formElementBuilderTrack";
import { aliasNameFormElement } from "../formHelpers/formElementBuilderArtist";
import { subsidiaryLabelFormElement } from "../formHelpers/formElementBuilderLabel";
import { feTrackObject } from '../formHelpers/formElementAttributeBuilder.js'
import { createTrackForm } from "../formHelpers/formBuilderTrack";

//===============================================================================================================//

// Shallow Copy Object Immutably

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

//===============================================================================================================//

// Update Single Element Immutably & Check Validity

export const updateElementValidation = (inputLocation, inputValue) => {
	
	const updatedElement = updateObject(
		inputLocation,
		{
			value: inputValue,
			valid: checkInputValidity(
				inputValue,
				inputLocation.validationRequired
			),
			touched: true,
		}
	);

	return updatedElement;
}

//===============================================================================================================//

// Update Single Fuzzy Element Immutably & Check Validity

export const updateFuzzyElementValidation = (inputLocation, inputValue, matchedRecords) => {
	
	const updatedElement = updateObject(
		inputLocation,
		{
			value: inputValue,
			valid: checkInputValidity(
				inputValue,
				inputLocation.validationRequired
			),
			touched: true,
			matchedRecords: matchedRecords,
			linkedRecord: false,
			showDropdown: "true"
		}
	);

	return updatedElement;
}

//===============================================================================================================//

// Update Single Selected Fuzzy Element Immutably

export const updateFuzzyElementSelected = (inputLocation, inputValue, linkedObjectId) => {
	
	const updatedElement = updateObject(
		inputLocation,
		{
			value: inputValue,
			fuzzyRef: linkedObjectId,
			linkedRecord: true,
			showDropdown: "false"
		}
	);

	return updatedElement;
}

//===============================================================================================================//

// Create Updated Form Object With Array Element Change Immutably

export const updateObjectArrayElement = (stateObject, updatedElement, arrayId, arrayIndex, objectId=null) => {

	let updatedArrayElement;

	objectId !== null ?
	updatedArrayElement = updateObject(stateObject[arrayId][arrayIndex], { [objectId] : updatedElement }) :
	updatedArrayElement = updateObject(stateObject[arrayId][arrayIndex], updatedElement);
	
	const clonedArray = [...stateObject[arrayId]];

	const filteredElements = clonedArray.map((element, index) => {
		if (index !== arrayIndex) {
			return element
		}
		return {
			...element,
			...updatedArrayElement
		}
	})

	const updatedFormObject = updateObject(
		stateObject, 
		{ [arrayId] : filteredElements }
	);

	return updatedFormObject;
}

//===============================================================================================================//

// Add New Item To Existing Array

export const addNewArrayItem = (inputLocation, arrayId) => {

	let newArrayItem;
	const currentArrayLength = inputLocation.length;

	switch (arrayId) {
		case "artists":
			newArrayItem = trackArtistFormElement("", currentArrayLength);
		break;
		case "aliasNames":
			newArrayItem = aliasNameFormElement("", currentArrayLength);
		break;
		case "subsidiaryLabels":
			newArrayItem = subsidiaryLabelFormElement("", currentArrayLength);
		break;
		case "tracks":
			const trackObj = feTrackObject(currentArrayLength + 1);
			newArrayItem = createTrackForm(trackObj);
		break;
		default:
			newArrayItem = [];
		break;
	}

	// Use Immer 'produce' helper for immutable object creation
	
	const newArray = produce(inputLocation, draft => {
		return draft.concat(newArrayItem)
	})

	return newArray;
}

//===============================================================================================================//

export const deleteArrayItem = (inputLocation, arrayIndex) => {

	// Use Immer 'produce' helper for immutable object creation

	const newArray = produce(inputLocation, draft => {
		return draft.filter((element, index) => index !== arrayIndex)
	})

	return newArray;
}

//===============================================================================================================//
