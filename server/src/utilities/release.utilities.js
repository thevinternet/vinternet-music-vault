const ReleaseModel = require("../models/release.model");
const TrackModel = require("../models/track.model");
const ReleaseUtilities = {}

//===============================================================================================================//
// Utility - Create Release Document (Managing Linked Parent & Subsidiary Labels)
//===============================================================================================================//

ReleaseUtilities.manageLinkedData = async () => {

}

// Helper Function - Manage & Create Linked Data For Artists & Labels

manageLinkedData = async (dataArray, dataModel) => {

  let linkedData = [];

  const arrayNames = dataArray.filter(item => item.name);

  if (arrayNames.length) {
    try {
    const linkedArrayNames = await dataModel.create(arrayNames);
    linkedArrayNames.forEach(name => {
      linkedData.push({ _id: name._id })
    })
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  //==================================================//

  const arrayIds = dataArray.filter(item => item._id);

  if (arrayIds.length){
    arrayIds.forEach(identifier => {
      linkedData.push({ _id: identifier._id })
    })
  }

  return linkedData;
}

//===============================================================================================================//

// Helper Function - Create Release Document (Managing Linked Artists & Labels)

createReleaseDocument = async (release) => {

  const props = {
    artistName: [],
    title: release.releaseTitle,
    labelName: release.labelName,
    catalogue: release.catalogue,
    year: release.releaseYear,
    format: release.releaseFormat,
    discogs_url: release.discogsLink,
    discogs_id: release.discogsId,
    track: []
  }

  //==================================================//

  if (release.artistName.length) {
    let updatedArtist;
    try {
      updatedArtist = await manageLinkedData(release.artistName, "ArtistModel");
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    props.artistName = updatedArtist;
  }

  //==================================================//

  // if (release.labelName.length) {
  //   let updatedLabel;
  //   try {
  //     updatedLabel = await manageLinkedData(release.labelName, "LabelModel");
  //   } catch (error) {
  //     throw new Error(`Error: ${error}`);
  //   }
  //   props.labelName = updatedLabel;
  // }

  //==================================================//

  if (release.tracks.length) {
    const updatedTracks = await Promise.all(release.tracks.map(async (item) => {
      try {
        let track = {
          track_number: item.trackNumber,
          artist_name: await manageLinkedData(item.artistName, "ArtistModel"),
          title: item.trackTitle,
          catalogue: item.catalogueReference,
          genre: item.genre,
          mixkey: item.mixKey,
          file_location: item.fileLocation
        }
        return track;
      }
      catch(error) {
        throw new Error(`Error: ${error}`);
      }
    }))
    props.track = updatedTracks;
  }

  return props;
}

//===============================================================================================================//

module.exports = ReleaseUtilities;
