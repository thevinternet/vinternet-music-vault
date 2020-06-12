import { formAttrInd } from "./formAttributeBuilderSingle";
import { formAttrGrp } from "./formAttributeBuilderGroup";

//===============================================================================================================//

export const createArtistForm = () => {
  const websiteObj = [
    { name: "Personal Website", url: "" },
    { name: "Discogs", url: "" },
    { name: "Bandcamp", url: "" },
    { name: "Soundcloud", url: "" },
    { name: "Twitter", url: "" }
  ];
  const pictureObj = [{ filename: "", location: "", format: "" }];

  //===============================================================================================================//

  const artistName = formAttrInd("", "artistName", "input", true, false);
  const realName = formAttrInd("", "realName", "input", false, false);
  const aliasName = formAttrInd("", "aliasName", "input", false, true);
  const profile = formAttrInd("", "profile", "textarea", true, false);
  const website = formAttrGrp(websiteObj, "website", "input", false, false);
  const discogsId = formAttrInd("", "discogsId", "input", false, false);
  const picture = formAttrGrp(pictureObj, "picture", "file", false, false);

  //===============================================================================================================//

  const artistForm = Object.assign(
    artistName,
    realName,
    aliasName,
    profile,
    ...website,
    discogsId,
    ...picture
  );

  //===============================================================================================================//

  return artistForm;
};
