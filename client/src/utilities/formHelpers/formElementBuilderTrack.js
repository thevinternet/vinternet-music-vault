//===============================================================================================================//

import * as feAttrBuilder from './formElementAttributeBuilder.js';

//===============================================================================================================//

export const trackNumberFormElement = (action="", id) => {
	const trackNumber = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "number", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feNumberRangeAttribute(1, 20),
	);
	return { [id] : trackNumber }
}

export const trackArtistFormElement = (element, index) => {
	const trackArtist = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", `trackArtist${index}`, `trackArtist${index}`),
		feAttrBuilder.feLabelAttribute("artistName"),
		feAttrBuilder.feValueAttribute(element.name || ""),
		feAttrBuilder.feValidationTrueAttributes(element.name, true, "Please enter the name of the artist"),
		feAttrBuilder.feFuzzySearchAttributes(element._id || `trackArtist${index}`)
	);
	return { [`trackArtist${index}`] : trackArtist }
}

export const trackTitleFormElement = (action="", id) => {
	const trackTitle = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationTrueAttributes(action, true, "Please enter the title of the track"),
	);
	return { [id] : trackTitle }
}

export const trackGenreFormElement = (action="", id) => {
	const trackGenre = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : trackGenre }
}

export const trackMixKeyFormElement = (action="", id) => {
	const trackMixKey = Object.assign(
		{},
		feAttrBuilder.feBaseAttributes("input", "text", id, id),
		feAttrBuilder.feLabelAttribute(id),
		feAttrBuilder.feValueAttribute(action),
		feAttrBuilder.feValidationFalseAttributes(false)
	);
	return { [id] : trackMixKey }
}

//===============================================================================================================//
