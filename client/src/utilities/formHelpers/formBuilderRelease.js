import { formAttrInd } from "./formAttributeBuilderSingle";
import { formAttrGrp } from "./formAttributeBuilderGroup";
import { formAttrTrk } from "./formAttributeBuilderTrack";

//===============================================================================================================//
//===============================================================================================================//










//===============================================================================================================//
//===============================================================================================================//

export const createReleaseForm = () => {
  const formatObj = [
    { name: "Vinyl", release: "no" },
    { name: "CD", release: "no" },
    { name: "Cassette", release: "no" },
    { name: "Digital", release: "no" }
  ];
  const pictureObj = [{ filename: "", location: "", format: "" }];
  const trackObj = [ { track_number: 1, artist_name: "", title: "", catalogue: "", genre: "", mixkey: "" } ];

  //===============================================================================================================//

  const releaseTitle = formAttrInd("", "releaseTitle", "input", true, false);
  const labelName = formAttrInd("", "labelName", "input", true, true);
  const catalogue = formAttrInd("", "catalogue", "input", false, false);
  const releaseYear = formAttrInd("", "releaseYear", "input", false, false);
  const releaseFormat = formAttrGrp(formatObj, "releaseFormat", "checkbox", false, false);
  const discogsLink = formAttrInd("", "discogsLink", "input", false, false);
  const discogsId = formAttrInd("", "discogsId", "input", false, false);
  const picture = formAttrGrp(pictureObj, "picture", "file", false, false);
  const tracks = { tracks : formAttrTrk(trackObj) }

  //===============================================================================================================//

  const releaseForm = Object.assign(
    releaseTitle,
    labelName,
    catalogue,
    releaseYear,
    ...releaseFormat,
    discogsLink,
    discogsId,
    ...picture,
    tracks
  );

  //===============================================================================================================//

  return releaseForm;
};
