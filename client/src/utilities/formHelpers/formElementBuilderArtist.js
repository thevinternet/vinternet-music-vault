//===============================================================================================================//

import * as feAttrBuilder from './formElementAttributeBuilder.js';

//===============================================================================================================//

export const artistNameFormElement = (action="", id) => {
	const artistName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationTrueAttributes(action, true, "Please enter the name of the artist"),
		feAttrBuilder.feFuzzySearchAttributes(id)
	);
	return { [id] : artistName }
}

export const realNameFormElement = (action="", id) => {
	const realName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : realName }
}

export const aliasNameFormElement = (element, index) => {
	const aliasName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", element._id || `aliasName${index}`, `aliasName${index}`),
		feAttrBuilder.feLabelAttribute("aliasName"),
		feAttrBuilder.feValueAttribute(element.name || ""),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feFuzzySearchAttributes(element._id || `aliasName${index}`)
	);
	return { [`aliasName${index}`] : aliasName }
}

//===============================================================================================================//
