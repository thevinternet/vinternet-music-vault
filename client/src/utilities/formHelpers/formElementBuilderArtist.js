import * as feAttrBuilder from './formElementAttributeBuilder.js';
import { websiteFormElement } from './formElementBuilderGeneric.js';
import he from "he";

//===============================================================================================================//

export const artistNameFormElement = (action="", id) => {
	const artistName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(he.decode(action)),
		feAttrBuilder.feValidationTrueAttributes(action, true, "Please enter the name of the artist"),
		feAttrBuilder.feFuzzySearchAttributes(id)
	);
	return { [id] : artistName }
}

//===============================================================================================================//

export const realNameFormElement = (action="", id) => {
	const realName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(he.decode(action)),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : realName }
}

//===============================================================================================================//

export const aliasNameFormElement = (element, index) => {
	const aliasName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", element._id || `aliasName${index}`, `aliasName`),
		feAttrBuilder.feLabelAttribute("aliasName"),
		feAttrBuilder.feValueAttribute(element.name ? he.decode(element.name) : ""),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feFuzzySearchAttributes(element._id || `aliasName${index}`)
	);
	return aliasName;
}

export const aliasNameForm = (action) => {
	let aliasNames = [];

	action.length ?
	aliasNames = action.map(aliasNameFormElement) :
	aliasNames.push(aliasNameFormElement("", 0));

	return aliasNames;
}

//===============================================================================================================//

export const websiteForm = (action) => {
	let websites = [];

	action.length ?
	websites = action.map(websiteFormElement) :
	websites.push(feAttrBuilder.feWebsiteObject("personalWebsite"));

	return websites;
}

//===============================================================================================================//
