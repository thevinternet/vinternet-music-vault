import { useState, useCallback } from "react";
import produce from "immer";
import set from "lodash/set"

import { addNewArrayItem } from "../../utilities/objectHelpers/objectBuilderGeneric";

//===============================================================================================================//
// Hook to handle addition of new form element input
//===============================================================================================================//

const useHandleInputAddition =() => {

	const [getUpdatedFormAdd, setUpdatedFormAdd] = useState("");

	const inputAddHandler = useCallback((event, inputLocation, inputLocationString, baseState, arrayId) => {
		event.preventDefault();

		console.log(event);

		const updatedArray = addNewArrayItem(inputLocation, arrayId);

		// Use Immer 'produce' helper for immutable object creation
		// Use Lodash 'set' helper to set object references from a string

		const updatedForm = inputLocationString === "root"
		? updatedArray
		: produce(baseState, draftState => {
			draftState = set(draftState, inputLocationString, updatedArray)
		});

		setUpdatedFormAdd(updatedForm);

	}, []);

	return {
		updatedFormAdd: getUpdatedFormAdd,
		inputAddHandler: inputAddHandler
	}
}

//===============================================================================================================//

export default useHandleInputAddition;
