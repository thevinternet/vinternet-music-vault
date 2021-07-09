import React from "react";
import { Link } from "react-router-dom";
import he from "he";

import "./TrackListItem.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const trackListItem = props => {
	return (
		<li>
			<div className="card--small">
				<figure>
					<picture>
						<img
							key={he.decode(props.trackName)}
							src={props.trackPicture.map(pictures =>
								pictures.picture.map(picture =>
									picture.location
										? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
										: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
								)
							)}
							alt={he.decode(props.trackName)}
							width="60px"
							height="60px"
						/>
					</picture>
				</figure>
				<div className="card__details">
					<h2>
						{ props.trackArtist.map((artist, index, array) =>
							array.length - 1 === index ? (
								<span key={artist._id}>
									<Link to={`/artists/${artist._id}`}>
										{he.decode(artist.name)}
									</Link>
									{" - "}
								</span>
							) : (
								<span key={artist._id}>
									<Link to={`/artists/${artist._id}`}>
										{he.decode(artist.name)}
									</Link>
									{" & "}
								</span>
							)
						) }
						<Link to={`/tracks/${props.trackId}`}>
							{he.decode(props.trackName)}
						</Link>
					</h2>
					{ props.trackCat.length ? (
						<Auxiliary>
							<ul className="details--inline">
								{ props.trackCat.map((catalogue) =>
									<li key={catalogue._id}>
										<span>
											<Link to={`/releases/${catalogue._id}`}>
												{he.decode(catalogue.catalogue)}
											</Link>
										</span>
									</li>
								) }
							</ul>
						</Auxiliary>
					) : null }
				</div>
			</div>
		</li>
	);
};

//===============================================================================================================//

export default trackListItem;
