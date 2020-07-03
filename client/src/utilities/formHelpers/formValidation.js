export const checkValidity = (value, rules) => {
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
