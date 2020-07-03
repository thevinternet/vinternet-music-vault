//===============================================================================================================//

import * as feAttrBuilder from './formElementAttributeBuilder.js';

//===============================================================================================================//

export const labelNameFormElement = (action="", id) => {
	const labelName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationTrueAttributes(action, true, "Please enter the name of the label"),
		feAttrBuilder.feFuzzySearchAttributes(id)
	);
	return { [id] : labelName }
}

export const parentLabelFormElement = (element, index) => {
	const parentLabel = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", element._id || `parentLabel${index}`, `parentLabel${index}`),
		feAttrBuilder.feLabelAttribute("parentLabel"),
		feAttrBuilder.feValueAttribute(element.name || ""),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feFuzzySearchAttributes(element._id || `parentLabel${index}`)
	);
	return { [`parentLabel${index}`] : parentLabel }
}

export const subsidiaryLabelFormElement = (element, index) => {
	const subsidiaryLabel = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", element._id || `subsidiaryLabel${index}`, `subsidiaryLabel${index}`),
		feAttrBuilder.feLabelAttribute("subsidiaryLabel"),
		feAttrBuilder.feValueAttribute(element.name || ""),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feFuzzySearchAttributes(element._id || `subsidiaryLabel${index}`)
	);
	return { [`subsidiaryLabel${index}`] : subsidiaryLabel }
}

//===============================================================================================================//
