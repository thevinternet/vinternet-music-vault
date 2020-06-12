//===============================================================================================================//

import { labelCreator } from "../../utilities/helpers";

//===============================================================================================================//

export const formAttrGrp = (action, id, type, validate, fuzzy) => {
  let formGrp = {};

  if (id === "aliasName" || id === "parentLabel" || id === "subsidiaryLabel" || id === "artistName" || id === "labelName") {
    formGrp = action.map((element, index) => ({
      [id + index]: {
        elementType: type,
        elementAttr: {
          type: "text",
          required: validate,
          name: id
        },
        label: labelCreator(id),
        labelFor: element._id || id + index,
        id: element._id,
        value: element.name ? element.name : element,
        validation: {
          required: validate
        },
        validationError: "",
        valid: !validate,
        touched: false,
        isFuzzy: fuzzy,
        fuzzyRef: id + index,
        matchedRecords: [],
        linkedRecord: true,
        showDropdown: "false"
      }
    }));
  }

  //===============================================================================================================//

  if (id === "releaseFormat") {
    formGrp = action.map((element, index) => ({
      [id + index]: {
        elementType: type,
        elementAttr: {
          type: "checkbox",
          required: validate,
          name: id
        },
        label: element.name,
        labelFor: id + index,
        id: id + index,
        value: element.release,
        validation: {
          required: validate
        },
        validationError: "",
        valid: !validate,
        touched: false,
        isFuzzy: fuzzy,
        fuzzyRef: id + index,
        matchedRecords: [],
        linkedRecord: true,
        showDropdown: "false"
      }
    }));
  }

  //===============================================================================================================//

  if (id === "website") {
    formGrp = action.map((element, index) => ({
      [id + index]: {
        elementType: type,
        elementAttr: {
          type: "text",
          required: validate,
          name: id
        },
        label: element.name,
        labelFor: id + index,
        id: id + index,
        value: element.url,
        validation: {
          required: validate
        },
        validationError: "",
        valid: !validate,
        touched: false
      }
    }));
  }

  //===============================================================================================================//

  if (id === "picture") {
    formGrp = action.map((element, index) => ({
      [id]: {
        elementType: type,
        elementAttr: {
          type: "file",
          required: validate,
          name: id
        },
        label: "Choose File",
        labelFor: id,
        id: id,
        validation: {
          required: validate
        },
        validationError: "",
        valid: !validate,
        touched: false,
        pictureLocation: element.location,
        pictureName: element.filename
      }
    }));
  }

  //===============================================================================================================//

  return formGrp;
};
