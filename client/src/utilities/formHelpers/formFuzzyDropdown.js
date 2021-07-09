//===============================================================================================================//

// Setup Fuzzy Dropdown Datalist Aria Attributes

export const dropdownDatalistSetup = dataListId => {
	const dataList = document.getElementById(dataListId);

	if (dataList.hasChildNodes()) {
		dataList.setAttribute("aria-expanded", true);
		dataList.setAttribute("aria-live", "polite");
	} else {
		dataList.setAttribute("aria-expanded", false);
		dataList.removeAttribute("aria-live");
	}
};

//===============================================================================================================//

// Manage Keyboard Commands For Navigating Fuzzy Dropdown Datalist Options

export const focusNextDataOption = (direction, dataOptions) => {
	const activeElement = document.activeElement;
	const currentActiveElement = dataOptions.indexOf(activeElement);

	if (direction === "ArrowDown") {
		const lastOptionCheck = currentActiveElement < dataOptions.length - 1;

		if (lastOptionCheck) {
			const nextDataOption = dataOptions[currentActiveElement + 1];
			nextDataOption.focus();
		}
	} else if (direction === "ArrowUp") {
		const firstOptionCheck = currentActiveElement > 0;

		if (firstOptionCheck) {
			const nextDataOption = dataOptions[currentActiveElement - 1];
			nextDataOption.focus();
		}
	}
};

//===============================================================================================================//
