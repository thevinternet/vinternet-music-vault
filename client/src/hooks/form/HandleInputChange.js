import { useState, useCallback } from "react";
import produce from "immer";
import set from "lodash/set"

import { updateElementValidation } from "../../utilities/objectHelpers/objectBuilderGeneric";
import { checkFormValidity } from "../../utilities/formHelpers/formValidation";

//===============================================================================================================//
// Hook to handle and validate user input into standard form element
//===============================================================================================================//

const useHandleInputChange = () => {

	const [getFormIsValidStd, setFormIsValidStd] = useState("");
	const [getUpdatedFormStd, setUpdatedFormStd] = useState("");

	const inputChangeHandler = useCallback((event, inputLocation, inputLocationString, baseState) => {
		
		let formIsValid = true;
		let inputValue;

		switch (event.target.type) {
			case "checkbox":
				event.target.checked ? inputValue = "yes" : inputValue = "no";
			break;
			default:
				inputValue = event.target.value;
		}

		const updatedElement = updateElementValidation(inputLocation, inputValue);
		
		// Use Immer 'produce' helper for immutable object creation
		// Use Lodash 'set' helper to set object references from a string
	
		const updatedForm = produce(baseState, draftState => {
			draftState = set(draftState, inputLocationString, updatedElement);
		});
	
		formIsValid = checkFormValidity(updatedForm) && formIsValid;

		setFormIsValidStd(formIsValid);
		setUpdatedFormStd(updatedForm);

	}, []);
	
	return {
		formIsValidStd: getFormIsValidStd,
		updatedFormStd: getUpdatedFormStd,
		inputChangeHandler: inputChangeHandler
	}
}

//===============================================================================================================//

export default useHandleInputChange;
