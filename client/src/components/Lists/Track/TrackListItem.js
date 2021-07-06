import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

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
							key={ReactHtmlParser(props.trackName)}
							src={props.trackPicture.map(pictures =>
								pictures.picture.map(picture =>
									picture.location
										? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
										: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
								)
							)}
							alt={ReactHtmlParser(props.trackName)}
							width="60px"
							height="60px"
						/>
					</picture>
				</figure>
				<div className="card__details">
					<h2>
						{props.trackArtist.map((artist, index, array) =>
							array.length - 1 === index ? (
								<span key={artist._id}>
									<Link to={`/artists/${artist._id}`}>
										{ReactHtmlParser(artist.name)}
									</Link>
									{" - "}
								</span>
							) : (
								<span key={artist._id}>
									<Link to={`/artists/${artist._id}`}>
										{ReactHtmlParser(artist.name)}
									</Link>
									{" & "}
								</span>
							)
						)}
						<Link to={{ pathname: "/tracks/" + props.trackId }}>
							{ReactHtmlParser(props.trackName)}
						</Link>
					</h2>
					{props.trackCat.length ? (
						<Auxiliary>
							<ul className="details--inline">
								{props.trackCat.map((catalogue) =>
									<li key={catalogue._id}>
										<span>
											<Link to={`/releases/${catalogue._id}`}>
												{ReactHtmlParser(catalogue.catalogue)}
											</Link>
										</span>
									</li>
								)}
							</ul>
						</Auxiliary>
					) : null}
				</div>
			</div>
		</li>
	);
};

//===============================================================================================================//

export default trackListItem;
