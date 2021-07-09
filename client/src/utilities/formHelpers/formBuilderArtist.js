import { feWebsiteObject, feImageUploadObject } from './formElementAttributeBuilder.js'
import * as feBuilderArtist from "./formElementBuilderArtist";
import * as feBuilderGeneric from "./formElementBuilderGeneric";

//===============================================================================================================//

export const createArtistForm = () => {
	
  const websiteObj = feWebsiteObject("personalWebsite");
  const pictureObj = feImageUploadObject();

  //===============================================================================================================//

	const formType = { artistForm : true }
  const artistName = feBuilderArtist.artistNameFormElement("", "artistName");
	const realName = feBuilderArtist.realNameFormElement("", "realName");
	const profile = feBuilderGeneric.profileFormElement("", "profile");
  const artistAlias = { aliasNames : feBuilderArtist.aliasNameForm([]) };
	const artistWebsite = { websites : feBuilderArtist.websiteForm(websiteObj) };
	const picture = pictureObj.map(feBuilderGeneric.imageUploadFormElement);
  const discogsId = feBuilderGeneric.discogsIdFormElement("", "discogsId");

  //===============================================================================================================//

  const artistForm = Object.assign({},
		formType,
    artistName,
		realName,
		profile,
    artistAlias,
    artistWebsite,
		...picture,
		discogsId
	);

  return artistForm;
};

//===============================================================================================================//

