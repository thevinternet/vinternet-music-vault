import { useState, useCallback } from "react";
import produce from "immer";
import set from "lodash/set"

import { deleteArrayItem } from "../../utilities/objectHelpers/objectBuilderGeneric";

//===============================================================================================================//
// Hook to handle deletion of existing form element input
//===============================================================================================================//

const useHandleInputDeletion =() => {

	const [getUpdatedFormDel, setUpdatedFormDel] = useState("");

	const inputDeleteHandler = useCallback((event, inputLocation, inputLocationString, baseState, arrayIndex) => {
		event.preventDefault();

		const updatedArray = deleteArrayItem(inputLocation, arrayIndex);

		// Use Immer 'produce' helper for immutable object creation
		// Use Lodash 'set' helper to set object references from a string

		const updatedForm = inputLocationString === "root"
		? updatedArray
		: produce(baseState, draftState => {
			draftState = set(draftState, inputLocationString, updatedArray)
		});

		setUpdatedFormDel(updatedForm);

	}, []);

	return {
		updatedFormDel: getUpdatedFormDel,
		inputDeleteHandler: inputDeleteHandler
	}
}

//===============================================================================================================//

export default useHandleInputDeletion;
