export const checkInputValidity = (value, rules) => {
  let isValid = true;

  if (rules) {
    isValid = value.trim() !== "" && isValid;
  }

  // if (rules.minLength) {
  //   isValid = value.length >= rules.minLength && isValid;
  // }

  // if (rules.maxLength) {
  //   isValid = value.length <= rules.maxLength && isValid;
  // }

  return isValid;
};

//===============================================================================================================//

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
