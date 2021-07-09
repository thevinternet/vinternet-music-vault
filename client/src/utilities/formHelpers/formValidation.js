//===============================================================================================================//

// Rules For Form Input Validity

export const checkInputValidity = (value, rules) => {
	let isValid = true;

	// Input Is Not Empty
	if (rules) {
		isValid = value.trim() !== "" && isValid;
	}

	// Input Has Minimum Number Of Characters
	// if (rules.minLength) {
	//   isValid = value.length >= rules.minLength && isValid;
	// }

	// Input Does Not Exceed Maximum Number Of Characters
	// if (rules.maxLength) {
	//   isValid = value.length <= rules.maxLength && isValid;
	// }

	return isValid;
};

//===============================================================================================================//

// Check Entire User Form Passes Input Validity Check

export const checkFormValidity = (formObject) => {
	let isValid = true;

	function validateObject(formObject) {
		Object.keys(formObject).forEach(key => {
			if (key === "valid" && formObject[key] === false) {
				isValid = false;
			}
			if (typeof formObject[key] === "object") {
				validateObject(formObject[key]);
			}
		});
	}
	validateObject(formObject);

	return isValid;
};

//===============================================================================================================//
