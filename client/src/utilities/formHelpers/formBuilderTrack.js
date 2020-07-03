//===============================================================================================================//

import * as feBuilderTrack from './formElementBuilderTrack.js';
import { releaseCatalogueFormElement } from './formElementBuilderRelease.js';

//===============================================================================================================//

export const createTrackForm = (action) => {

	let trackArr = [];
	let trackObj= {};

	action.forEach((track, trackIndex) => {
	
		const trackNumber = feBuilderTrack.trackNumberFormElement(track.track_number, "trackNumber");
		
		let trackArtist = [];

		track.artist_name.length ?
		trackArtist = track.artist_name.map(feBuilderTrack.trackArtistFormElement) :
		trackArtist.push(feBuilderTrack.trackArtistFormElement("", 0));
	 
		const trackTitle = feBuilderTrack.trackTitleFormElement(track.title, "trackTitle");
		const trackCatalogue = releaseCatalogueFormElement(track.catalogue, "catalogueReference");
		const trackGenre = feBuilderTrack.trackGenreFormElement(track.genre, "genre");
		const trackMixKey = feBuilderTrack.trackMixKeyFormElement(track.mixkey, "mixKey");

		trackObj[trackIndex] = Object.assign({},
			trackNumber,
			...trackArtist,
			trackTitle,
			trackCatalogue,
			trackGenre,
			trackMixKey
		);

		trackArr.push(trackObj[trackIndex]);

	});

  return trackArr;
};

//===============================================================================================================//
