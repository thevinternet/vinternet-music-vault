import { useState, useCallback } from "react";
import Fuse from "fuse.js";
import produce from "immer";
import set from "lodash/set"

import { updateFuzzyElementValidation } from "../../utilities/objectHelpers/objectBuilderGeneric";
import { checkFormValidity } from "../../utilities/formHelpers/formValidation";

//===============================================================================================================//
// Hook to handle and validate user input into Fuzzy Search form element
//===============================================================================================================//

const useHandleFuzzyInputChange = () => {

	const [getFormIsValidFzy, setFormIsValidFzy] = useState("");
	const [getDataListIdFzy, setDataListIdFzy] = useState("");
	const [getUpdatedFormFzy, setUpdatedFormFzy] = useState("");

	const fuzzyInputChangeHandler = useCallback((event, inputLocation, inputLocationString, baseState, fuzzyDataList, fuzzyDataSet) => {

		const fuzzyDataConfigs = {
			shouldSort: true,
			threshold: 0,
			ignoreLocation: true,
			minMatchCharLength: 3,
			keys: ["name"]
		};
		const fuse = new Fuse(fuzzyDataSet, fuzzyDataConfigs);
		const inputValue = event.target.value;
		const matchedRecords = fuse.search(inputValue);
		const dataListId = fuzzyDataList;
		let formIsValid = true;

		const updatedElement = updateFuzzyElementValidation(inputLocation, inputValue, matchedRecords);

		// Use Immer 'produce' helper for immutable object creation
		// Use Lodash 'set' helper to set object references from a string
		
		const updatedForm = produce(baseState, draftState => {
			draftState = set(draftState, inputLocationString, updatedElement)
		});

		formIsValid = checkFormValidity(updatedForm) && formIsValid;

		setFormIsValidFzy(formIsValid);
		setDataListIdFzy(dataListId);
		setUpdatedFormFzy(updatedForm);

	}, []);

	return {
		formIsValidFzy: getFormIsValidFzy,
		dataListIdFzy: getDataListIdFzy,
		updatedFormFzy: getUpdatedFormFzy,
		fuzzyInputChangeHandler: fuzzyInputChangeHandler
	}
}

//===============================================================================================================//

export default useHandleFuzzyInputChange;
