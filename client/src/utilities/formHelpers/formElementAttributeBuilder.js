//===============================================================================================================//

// Helpers

const feLabelCreator = string => {
  const label = string.split(/(?=[A-Z])/).join(" ");
  return label[0].toUpperCase() + label.substring(1);
};

//===============================================================================================================//

// Standard Form Element Attributes

export const feBaseAttributes = (element, type, id, name) => {
	return {
		element: element,
		type: type,
		name: name,
		id: id,
		labelFor: id
	}
}

export const feLabelAttribute = (id) => {
	return {
		label: feLabelCreator(id),		
	}	
}

export const feValueAttribute = (action="") => {
	return {
		value: action		
	}	
}

export const feNumberRangeAttribute = (min, max) => {
	return {
		min: min,
		max: max
	}
}

// Validation Form Element Attributes

export const feValidationFalseAttributes = (validate) => {
	return {
		valid: !validate,
		touched: false
	}
}

export const feValidationTrueAttributes = (action, validate, feedback) => {
	let valid = action ? true : false;
	return {
		valid: valid,
		validationRequired: validate,
		validationFeedback: feedback,
		touched: false
	}
}

// Website Form Element Attributes

export const feWebsiteObject = (customWebsiteLabel) => {
	return [
    { name: customWebsiteLabel, url: "" },
    { name: "Discogs", url: "" },
    { name: "Bandcamp", url: "" },
    { name: "Soundcloud", url: "" },
    { name: "Twitter", url: "" }
  ]
}

// Release Format Form Element Attributes

export const feReleaseFormatObject = () => {
	return [
		{ name: "Vinyl", released: "no" },
    { name: "CD", released: "no" },
    { name: "Cassette", released: "no" },
    { name: "Digital", released: "no" }
	]
}

// Track Form Element Attributes

export const feTrackObject = (trackNumber = "") => {
	return [{
		trackForm : true,
		track_number: trackNumber || 1,
		artist_name: "",
		title: "",
		catalogue: "",
		genre: "",
		mixkey: ""
	}]
}

// Image Upload Form Element Attributes

export const feImageUploadObject = () => {
	return [{ 
		filename: "",
		location: "",
		format: ""
	}]
}

export const feImageUploadAttributes = (location, filename) => {
	return {
		label: "Choose File",
		pictureLocation: location,
		pictureName: filename
	}
}

// Fuzzy Search Form Element Attributes

export const feFuzzySearchAttributes = (id, linkedRecord = false) => {
	return {
			isFuzzy: true,
			fuzzyRef: id,
			matchedRecords: [],
			linkedRecord: linkedRecord,
			showDropdown: "false"
	}
}

//===============================================================================================================//
