//===============================================================================================================//

import { formAttrInd } from "./formAttributeBuilderSingle";
import { formAttrGrp } from "./formAttributeBuilderGroup";

//===============================================================================================================//

export const formAttrTrk = (action) => {

    let tracks = [];
    let trackObj= {};

    action.forEach((track, trackIndex) => {

        const trackNumber = formAttrInd(
            track.track_number,
            "trackNumber",
            "input",
            false,
            false
          );
          const updatedTrackNumber = Object.assign(trackNumber);

        //=========================================================//

        let artistName;
        let updatedArtistName;
        
        if (track.artist_name.length) {
            artistName = formAttrGrp(
            track.artist_name,
            "artistName",
            "input",
            false,
            true
            );
            updatedArtistName = Object.assign(updatedTrackNumber, ...artistName);
        } else {
            artistName = formAttrInd("", "artistName", "input", false, true);
            updatedArtistName = Object.assign(updatedTrackNumber, artistName);
        }

        //=========================================================//

        const trackTitle = formAttrInd(
            track.title,
            "trackTitle",
            "input",
            false,
            false
          );
          const updatedTrackTitle = Object.assign(updatedArtistName, trackTitle);

        //=========================================================//

        const trackCatalogue = formAttrInd(
            track.catalogue,
            "catalogueReference",
            "input",
            false,
            false
          );
          const updatedTrackCatalogue = Object.assign(updatedTrackTitle, trackCatalogue);
      
        //=========================================================//

        const trackGenre = formAttrInd(
            track.genre,
            "genre",
            "input",
            false,
            false
          );
          const updatedTrackGenre = Object.assign(updatedTrackCatalogue, trackGenre);
      
        //=========================================================//

        const trackMixKey = formAttrInd(
            track.mixkey,
            "mixKey",
            "input",
            false,
            false
          );
          const updatedTrackMixKey = Object.assign(updatedTrackGenre, trackMixKey);
      
        //=========================================================//

        // const trackDelete = formAttrInd(
        //   "Delete Track",
        //   `deleteTrack ${trackIndex + 1}`,
        //   "checkbox",
        //   false,
        //   false,
        // );
        // const updatedTrackDelete = Object.assign(updatedTrackMixKey, trackDelete);


        // const trackFile = formAttrInd(
        //     track.file_location,
        //     "fileLocation",
        //     "input",
        //     false,
        //     false
        //   );
        //   const updatedTrackFile = Object.assign(updatedTrackMixKey, trackFile);
      
        //=========================================================//
      
        trackObj[trackIndex] = Object.assign(updatedTrackMixKey);

        tracks.push(trackObj[trackIndex]);

        //console.log(tracks);
    });

    //===============================================================================================================//

    return tracks;
};
