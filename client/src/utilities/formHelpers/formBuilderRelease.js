//===============================================================================================================//

import { feReleaseFormatObject, feImageUploadObject, feTrackObject } from './formElementAttributeBuilder.js'
import * as feBuilderRelease from "./formElementBuilderRelease";
import * as feBuilderGeneric from "./formElementBuilderGeneric";
import { createTrackForm } from "./formBuilderTrack";

//===============================================================================================================//

export const createReleaseForm = () => {

	const formatObj = feReleaseFormatObject();
	const pictureObj = feImageUploadObject();
	const trackObj = feTrackObject();

  //===============================================================================================================//

	const releaseTitle = feBuilderRelease.releaseTitleFormElement("", "releaseTitle");
	const releaseLabel = feBuilderRelease.releaseLabelFormElement("", 0);
	const releaseCatalogue = feBuilderRelease.releaseCatalogueFormElement("", "catalogue");
	const releaseYear = feBuilderRelease.releaseYearFormElement("", "releaseYear");
	const releaseFormat = formatObj.map(feBuilderRelease.newReleaseFormatFormElement);
	const releaseDiscogsId = feBuilderGeneric.discogsIdFormElement("", "discogsId");
	const releaseDiscogsUrl = feBuilderGeneric.discogsUrlFormElement("", "discogsLink");
	const releasePicture = pictureObj.map(feBuilderGeneric.imageUploadFormElement);
  const releaseTrack = { tracks : createTrackForm(trackObj) }

  //===============================================================================================================//

  const releaseForm = Object.assign({},
    releaseTitle,
    releaseLabel,
    releaseCatalogue,
    releaseYear,
    ...releaseFormat,
    releaseDiscogsId,
    releaseDiscogsUrl,
    ...releasePicture,
    releaseTrack
  );

  return releaseForm;
};

//===============================================================================================================//
