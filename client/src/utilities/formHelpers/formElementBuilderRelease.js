//===============================================================================================================//

import * as feAttrBuilder from './formElementAttributeBuilder.js';

//===============================================================================================================//

export const releaseTitleFormElement = (action="", id) => {
	const releaseTitle = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationTrueAttributes(action, true, "Please enter the title of the release"),
	);
	return { [id] : releaseTitle }
}

export const releaseLabelFormElement = (element, index) => {
	const releaseLabel = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", `releaseLabel${index}`, `releaseLabel${index}`),
		feAttrBuilder.feLabelAttribute("Label"),
		feAttrBuilder.feValueAttribute(element.name || ""),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feFuzzySearchAttributes(element._id || `releaseLabel${index}`)
	);
	return { [`releaseLabel${index}`] : releaseLabel }
}

export const releaseCatalogueFormElement = (action="", id) => {
	const releaseCatalogue = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : releaseCatalogue }
}

export const releaseYearFormElement = (action="", id) => {
	const releaseYear = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : releaseYear }
}

export const releaseFormatFormElement = (element, index) => {
	const releaseFormat = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "checkbox", `releaseFormat${index}`, "releaseFormat"),
		feAttrBuilder.feLabelAttribute(element),
		feAttrBuilder.feValueAttribute(""),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [`releaseFormat${index}`] : releaseFormat }
}

export const newReleaseFormatFormElement = (element, index) => {
	const newReleaseFormat = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "checkbox", `releaseFormat${index}`, "releaseFormat"),
		feAttrBuilder.feLabelAttribute(element.name),
		feAttrBuilder.feValueAttribute(element.release),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [`releaseFormat${index}`] : newReleaseFormat }
}

//===============================================================================================================//
