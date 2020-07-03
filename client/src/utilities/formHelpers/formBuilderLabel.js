//===============================================================================================================//

import { feLabelWebsiteObject, feImageUploadObject } from './formElementAttributeBuilder.js'
import * as feBuilderLabel from "./formElementBuilderLabel";
import * as feBuilderGeneric from "./formElementBuilderGeneric";

//===============================================================================================================//

export const createLabelForm = () => {
	
  const websiteObj = feLabelWebsiteObject();
  const pictureObj = feImageUploadObject();

  //===============================================================================================================//

  const labelName = feBuilderLabel.labelNameFormElement("", "labelName");
  const parentLabel = feBuilderLabel.parentLabelFormElement("", 0);
  const subsidiaryLabel = feBuilderLabel.subsidiaryLabelFormElement("", 0);
  const profile = feBuilderGeneric.profileFormElement("", "profile");
  const website = websiteObj.map(feBuilderGeneric.websiteFormElement);
  const discogsId = feBuilderGeneric.discogsIdFormElement("", "discogsId");
  const picture = pictureObj.map(feBuilderGeneric.imageUploadFormElement);

  //===============================================================================================================//

  const labelForm = Object.assign({},
    labelName,
    parentLabel,
    subsidiaryLabel,
    profile,
    ...website,
    discogsId,
    ...picture
  );

  return labelForm;
};

//===============================================================================================================//
