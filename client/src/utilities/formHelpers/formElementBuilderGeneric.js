//===============================================================================================================//

import * as feAttrBuilder from './formElementAttributeBuilder.js';
import he from "he";

//===============================================================================================================//

export const profileFormElement = (action="", id) => {
	const profile = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "textarea", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(he.decode(action)),
		feAttrBuilder.feValidationTrueAttributes(action, true, "Please enter a profile summary")
	);
	return { [id] : profile }
}

export const websiteFormElement = (element, index) => {
	const websiteName = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", element._id || `website${index}`, `website`),
		feAttrBuilder.feLabelAttribute(he.decode(element.name) || ""),
		feAttrBuilder.feValueAttribute(he.decode(element.url) || ""),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return websiteName;
}

export const discogsUrlFormElement = (action="", id) => {
	const discogsUrl = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(he.decode(action)),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : discogsUrl }
}

export const discogsIdFormElement = (action="", id) => {
	const discogsId = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(he.decode(action)),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : discogsId }
}

export const imageUploadFormElement = (element, index) => {
	const imageUpload = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "file", element._id || `image${index}`, `image`),
		feAttrBuilder.feValidationFalseAttributes(false),
		feAttrBuilder.feImageUploadAttributes(element.location, element.filename)
	);
	return { "imageUpload" : imageUpload }
}

//===============================================================================================================//
