export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    //console.log(isValid);
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    //console.log(isValid);
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    //console.log(isValid);
  }

  //console.log(isValid);
  return isValid;
};
