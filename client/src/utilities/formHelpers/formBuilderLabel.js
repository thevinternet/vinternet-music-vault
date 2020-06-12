import { formAttrInd } from "./formAttributeBuilderSingle";
import { formAttrGrp } from "./formAttributeBuilderGroup";

//===============================================================================================================//

export const createLabelForm = () => {
  const websiteObj = [
    { name: "Label Website", url: "" },
    { name: "Discogs", url: "" },
    { name: "Bandcamp", url: "" },
    { name: "Soundcloud", url: "" },
    { name: "Twitter", url: "" }
  ];
  const pictureObj = [{ filename: "", location: "", format: "" }];

  //===============================================================================================================//

  const labelName = formAttrInd("", "labelName", "input", true, false);
  const parentLabel = formAttrInd("", "parentLabel", "input", false, true);
  const subLabel = formAttrInd("", "subsidiaryLabel", "input", false, true);
  const profile = formAttrInd("", "profile", "textarea", true, false);
  const website = formAttrGrp(websiteObj, "website", "input", false, false);
  const discogsId = formAttrInd("", "discogsId", "input", false, false);
  const picture = formAttrGrp(pictureObj, "picture", "file", false, false);

  //===============================================================================================================//

  const labelForm = Object.assign(
    labelName,
    parentLabel,
    subLabel,
    profile,
    ...website,
    discogsId,
    ...picture
  );

  //===============================================================================================================//

  return labelForm;
};
