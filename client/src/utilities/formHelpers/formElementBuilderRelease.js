import * as feAttrBuilder from './formElementAttributeBuilder.js';
import he from "he";

//===============================================================================================================//

export const releaseTitleFormElement = (action="", id) => {
	const releaseTitle = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(he.decode(action)),
		feAttrBuilder.feValidationTrueAttributes(action, true, "Please enter the title of the release"),
	);
	return { [id] : releaseTitle }
}

//===============================================================================================================//

export const releaseLabelFormElement = (element, index) => {
	const releaseLabel = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", `releaseLabel${index}`, "label"),
		feAttrBuilder.feLabelAttribute("Label"),
		feAttrBuilder.feValueAttribute(element.name ? he.decode(element.name) : ""),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feFuzzySearchAttributes(element._id || `releaseLabel${index}`, element._id ? true : false)
	);
	return releaseLabel;

}

export const releaseLabelForm = (action) => {
	let releaseLabels = [];

	action.length ?
	releaseLabels = action.map(releaseLabelFormElement) :
	releaseLabels.push(releaseLabelFormElement("", 0));

	return releaseLabels;
}

//===============================================================================================================//

export const releaseCatalogueFormElement = (action="", id) => {
	const releaseCatalogue = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(he.decode(action)),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : releaseCatalogue }
}

//===============================================================================================================//

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

//===============================================================================================================//

export const releaseFormatFormElement = (element, index) => {
	const releaseFormat = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "checkbox", `releaseFormat${index}`, "releaseFormat"),
		feAttrBuilder.feLabelAttribute(element.name),
		feAttrBuilder.feValueAttribute(element.released),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return releaseFormat
}

export const releaseFormatForm = (action) => {
	let releaseFormats;

	action.length ?
	releaseFormats = action.map(releaseFormatFormElement) :
	releaseFormats = feAttrBuilder.feReleaseFormatObject().map(releaseFormatFormElement);

	return releaseFormats;
}

//===============================================================================================================//
