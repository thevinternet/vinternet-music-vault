import { useState, useCallback } from "react";
import produce from "immer";
import set from "lodash/set"

import { updateFuzzyElementSelected } from "../../utilities/objectHelpers/objectBuilderGeneric";
import { focusNextDataOption } from "../../utilities/formHelpers/formFuzzyDropdown";

//===============================================================================================================//
// Hook to handle selection of item in generated Fuzzy dropdown list (both pointer & keyboard selection)
//===============================================================================================================//

const useHandleDropdownItemSelect = () => {

	const [getUpdatedFormDds, setUpdatedFormDds] = useState('')

	const dropdownItemSelectHandler = useCallback((event, inputLocation, inputLocationString, baseState, fuzzyDataList=null) => {

		if (fuzzyDataList) {
			const dataList = document.getElementById(fuzzyDataList);

			if (dataList.hasChildNodes()) {
				const dataOptions = [].slice.call(
					dataList.getElementsByTagName("option")
				);
				if (event.key === "ArrowUp") { focusNextDataOption("ArrowUp", dataOptions); }
				if (event.key === "ArrowDown") { focusNextDataOption("ArrowDown", dataOptions); }
			}
		}

		if (event.type  === "click" || event.key === "Enter") {
			const inputValue = event.target.value;
			const linkedObjectId = event.target.id;

			const updatedElement = updateFuzzyElementSelected(inputLocation, inputValue, linkedObjectId);

			// Use Immer 'produce' helper for immutable object creation
			// Use Lodash 'set' helper to set object references from a string
	
			const updatedForm = produce(baseState, draftState => {
				draftState = set(draftState, inputLocationString, updatedElement)
			});

			setUpdatedFormDds(updatedForm);
		}
	}, []);

	return {
		updatedFormDds: getUpdatedFormDds,
		dropdownItemSelectHandler: dropdownItemSelectHandler
	}
}

//===============================================================================================================//

export default useHandleDropdownItemSelect;
