import * as feBuilderTrack from './formElementBuilderTrack.js';

//===============================================================================================================//

export const createTrackForm = (action) => {

	let trackArr = [];
	let trackObj= {};

	action.forEach((track, trackIndex) => {

		const formType = { trackForm : true }
		const trackId = { trackId: { value : track._id || "" } };
		const trackArtist = { artists : feBuilderTrack.trackArtistForm(track.artist_name) };
		const trackTitle = feBuilderTrack.trackTitleFormElement(track.name, "trackTitle");
		const trackNumber = feBuilderTrack.trackNumberFormElement(track.track_number, "trackNumber");
		const trackGenre = feBuilderTrack.trackGenreFormElement(track.genre, "genre");
		const trackMixKey = feBuilderTrack.trackMixKeyFormElement(track.mixkey, "mixKey");

		trackObj[trackIndex] = Object.assign({},
			formType,
			trackId,
			trackArtist,
			trackTitle,
			trackNumber,
			trackGenre,
			trackMixKey
		);

		trackArr.push(trackObj[trackIndex]);

	});

  return trackArr;
};

//===============================================================================================================//
