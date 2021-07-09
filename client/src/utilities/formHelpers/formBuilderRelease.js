import { feReleaseFormatObject, feImageUploadObject } from './formElementAttributeBuilder.js'
import * as feBuilderRelease from "./formElementBuilderRelease";
import * as feBuilderGeneric from "./formElementBuilderGeneric";

//===============================================================================================================//

export const createReleaseForm = () => {

	const formatObj = feReleaseFormatObject();
	const pictureObj = feImageUploadObject();

  //===============================================================================================================//

	const formType = { releaseForm : true }
	const releaseTitle = feBuilderRelease.releaseTitleFormElement("", "releaseTitle");
	const releaseLabel = { label : feBuilderRelease.releaseLabelForm([]) };
	const releaseCatalogue = feBuilderRelease.releaseCatalogueFormElement("", "catalogue");
	const releaseYear = feBuilderRelease.releaseYearFormElement("", "releaseYear");
	const releaseDiscogsId = feBuilderGeneric.discogsIdFormElement("", "discogsId");
	const releaseDiscogsUrl = feBuilderGeneric.discogsUrlFormElement("", "discogsLink");
	const releaseFormat = { formats : feBuilderRelease.releaseFormatForm(formatObj) };
	const releasePicture = pictureObj.map(feBuilderGeneric.imageUploadFormElement);

  //===============================================================================================================//

  const releaseForm = Object.assign({},
		formType,
    releaseTitle,
    releaseLabel,
    releaseCatalogue,
    releaseYear,
    releaseDiscogsId,
		releaseDiscogsUrl,
		releaseFormat,
    ...releasePicture,
  );

  return releaseForm;
};

//===============================================================================================================//
