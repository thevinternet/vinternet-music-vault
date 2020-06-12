//===============================================================================================================//

import { labelCreator } from "../../utilities/helpers";

//===============================================================================================================//

export const formAttrInd = (action, id, type, validate, fuzzy) => {
  const formElm = {
    [id]: {
      elementType: type,
      elementAttr: {
        type: "text",
        required: validate,
        name: id
      },
      label: labelCreator(id),
      labelFor: id,
      id: id,
      value: action || "",
      validation: {
        required: validate
      },
      validationError: "",
      valid: !validate,
      touched: false,
      isFuzzy: fuzzy,
      fuzzyRef: id,
      matchedRecords: [],
      linkedRecord: true,
      showDropdown: "false"
    }
  };

  //===============================================================================================================//

  if (id === "artistName") {
    formElm.artistName.validationError = "Please enter the name of the artist";
    if (formElm.artistName.value) {
      formElm.artistName.valid = true;
    }
  }
  if (id === "labelName") {
    formElm.labelName.validationError = "Please enter the name of the label";
    if (formElm.labelName.value) {
      formElm.labelName.valid = true;
    }
  }
  if (id === "profile") {
    formElm.profile.validationError = "Please enter a profile summary";
    if (formElm.profile.value) {
      formElm.profile.valid = true;
    }
  }
  if (id === "releaseTitle") {
    formElm.releaseTitle.validationError = "Please enter the title of the release";
    if (formElm.releaseTitle.value) {
      formElm.releaseTitle.valid = true;
    }
  }

  //===============================================================================================================//

  return formElm;
};
