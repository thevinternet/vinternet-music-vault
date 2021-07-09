import { feWebsiteObject, feImageUploadObject } from './formElementAttributeBuilder.js'
import * as feBuilderLabel from "./formElementBuilderLabel";
import * as feBuilderGeneric from "./formElementBuilderGeneric";

//===============================================================================================================//

export const createLabelForm = () => {
	
  const websiteObj = feWebsiteObject("labelWebsite");
  const pictureObj = feImageUploadObject();

  //===============================================================================================================//

	const formType = { labelForm : true }
	const labelName = feBuilderLabel.labelNameFormElement("", "labelName");
	const profile = feBuilderGeneric.profileFormElement("", "profile");
  const parentLabel = { parentLabel : feBuilderLabel.parentLabelForm([]) };
	const subsidiaryLabel = { subsidiaryLabels : feBuilderLabel.subsidiaryLabelForm([]) };
	const labelWebsite = { websites : feBuilderLabel.websiteForm(websiteObj) };
	const picture = pictureObj.map(feBuilderGeneric.imageUploadFormElement);
	const discogsId = feBuilderGeneric.discogsIdFormElement("", "discogsId");

  //===============================================================================================================//

  const labelForm = Object.assign({},
		formType,
		labelName,
		profile,
    parentLabel,
    subsidiaryLabel,
    labelWebsite,
		...picture,
		discogsId,
  );

  return labelForm;
};

//===============================================================================================================//
