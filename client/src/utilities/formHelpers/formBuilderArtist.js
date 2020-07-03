//===============================================================================================================//

import { feArtistWebsiteObject, feImageUploadObject } from './formElementAttributeBuilder.js'
import * as feBuilderArtist from "./formElementBuilderArtist";
import * as feBuilderGeneric from "./formElementBuilderGeneric";

//===============================================================================================================//

export const createArtistForm = () => {
	
  const websiteObj = feArtistWebsiteObject();
  const pictureObj = feImageUploadObject();

  //===============================================================================================================//

  const artistName = feBuilderArtist.artistNameFormElement("", "artistName");
  const realName = feBuilderArtist.realNameFormElement("", "realName");
  const aliasName = feBuilderArtist.aliasNameFormElement("", 0);
  const profile = feBuilderGeneric.profileFormElement("", "profile");
  const website = websiteObj.map(feBuilderGeneric.websiteFormElement);
  const discogsId = feBuilderGeneric.discogsIdFormElement("", "discogsId");
  const picture = pictureObj.map(feBuilderGeneric.imageUploadFormElement);

  //===============================================================================================================//

  const artistForm = Object.assign({},
    artistName,
    realName,
    aliasName,
    profile,
    ...website,
    discogsId,
    ...picture
	);

  return artistForm;
};

//===============================================================================================================//

