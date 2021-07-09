import * as feAttrBuilder from './formElementAttributeBuilder.js';
import { websiteFormElement } from './formElementBuilderGeneric.js';
import he from "he";

//===============================================================================================================//

export const labelNameFormElement = (action="", id) => {
	const labelName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(he.decode(action)),
		feAttrBuilder.feValidationTrueAttributes(action, true, "Please enter the name of the label"),
		feAttrBuilder.feFuzzySearchAttributes(id)
	);
	return { [id] : labelName }
}

//===============================================================================================================//

export const parentLabelFormElement = (element, index) => {
	const parentLabel = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", element._id || "parentLabel", "parentLabel"),
		feAttrBuilder.feLabelAttribute("parentLabel"),
		feAttrBuilder.feValueAttribute(element.name ? he.decode(element.name) : ""),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feFuzzySearchAttributes(element._id || "parentLabel", element._id ? true : false)
	);
	return parentLabel;
}

export const parentLabelForm = (action) => {
	let parentLabels = [];

	action.length ?
	parentLabels = action.map(parentLabelFormElement) :
	parentLabels.push(parentLabelFormElement("", 0));

	return parentLabels;
}

//===============================================================================================================//

export const subsidiaryLabelFormElement = (element, index) => {
	const subsidiaryLabel = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", element._id || `subsidiaryLabel${index}`, `subsidiaryLabel`),
		feAttrBuilder.feLabelAttribute("subsidiaryLabel"),
		feAttrBuilder.feValueAttribute(element.name ? he.decode(element.name) : ""),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feFuzzySearchAttributes(element._id || `subsidiaryLabel${index}`)
	);
	return subsidiaryLabel;
}

export const subsidiaryLabelForm = (action) => {
	let subsidiaryLabels = [];

	action.length ?
	subsidiaryLabels = action.map(subsidiaryLabelFormElement) :
	subsidiaryLabels.push(subsidiaryLabelFormElement("", 0));

	return subsidiaryLabels;
}

//===============================================================================================================//

export const websiteForm = (action) => {
	let websites = [];

	action.length ?
	websites = action.map(websiteFormElement) :
	websites.push(feAttrBuilder.feWebsiteObject("labelWebsite"));

	return websites;
}

//===============================================================================================================//
