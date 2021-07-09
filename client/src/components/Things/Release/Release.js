import React from "react";
import { Link } from "react-router-dom";
import he from "he";

import "./Release.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const release = props => {
	return (
		<Auxiliary>
			<div className="profile__picture">
				<img
					key={he.decode(props.releaseTitle)}
					src={props.releasePicture.map(picture =>
						picture.location
							? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
							: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
					)}
					alt={he.decode(props.releaseTitle)}
					height="200px"
					width="200px"
				/>
			</div>
			<div className="profile__details">
				<h1>{he.decode(props.releaseTitle)}</h1>
				<dl>
					{props.releaseArtist.length ? (
						<Auxiliary>
							<dt>Artists</dt>
							<dd>
								{props.releaseArtist.map((artist, index, arr) =>
									arr.length - 1 === index ? (
										<span key={he.decode(artist.name) + index}>
											<Link to={`/artists/${artist._id}`}>
												{he.decode(artist.name)}
											</Link>
										</span>
									) : (
										<span key={he.decode(artist.name) + index}>
											<Link to={`/artists/${artist._id}`}>
												{he.decode(artist.name)}
											</Link>
											,{" "}
										</span>
									)
								)}
							</dd>
						</Auxiliary>
					) : null}
					{props.releaseLabel.length ? (
						<Auxiliary>
							<dt>Label</dt>
							<dd>
								{props.releaseLabel.map((label, index, arr) =>
									<Link key={he.decode(label.name)} to={`/labels/${label._id}`}>
										{he.decode(label.name)}
									</Link>
								)}
							</dd>
							<dt>Catalogue</dt>
							<dd>{he.decode(props.releaseCat)}</dd>
							<dt>Year</dt>
							<dd>{props.releaseYear}</dd>
						</Auxiliary>
					) : null }
					{props.releaseFormat.length ? (
						<Auxiliary>
							<dt>Format</dt>
							<dd>
								{props.releaseFormat.map((format, index, arr) =>
									format.released === "yes" ? (
										arr.length - 1 === index ? (
											<span key={he.decode(format.name)}>
												{he.decode(format.name)}
											</span>
										) : (
											<span key={he.decode(format.name)}>
												{he.decode(format.name)}{", "}
											</span>
										)
									) : null
								)}
							</dd>
						</Auxiliary>
					) : null}
					{props.releaseLink ? (
						<Auxiliary>
							<dt>Reference Website</dt>
							<dd>
								<a href={he.decode(props.releaseLink)} target="_blank" rel="noopener noreferrer">Discogs</a>
							</dd>
						</Auxiliary>
					) : null }
				</dl>
				<h2>Tracks</h2>
				{props.releaseTracks.length ? (
					<ol className={"list--block"}>
						{props.releaseTracks.map((track, index) =>
							<li key={he.decode(track.name)}>
								<div className="card--small">
									<figure>
										<picture>
											<img
												src={props.releasePicture.map(picture =>
													picture.location
														? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
														: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
												)}
												alt={track.track_number}
												width="60px"
												height="60px"
											/>
										</picture>
									</figure>
									<div className="card__details">
										<h2>
											{track.artist_name.map((artist, index, array) =>
												array.length - 1 === index ? (
													<span key={he.decode(artist.name)}>
														{he.decode(artist.name)}
													</span>
												) : (
													<span key={he.decode(artist.name)}>
														{he.decode(artist.name)}{" & "}
													</span>
												)
											)}
											{" - "}{he.decode(track.name)}
										</h2>
										<ul className="details--inline">
											<li><strong>Track:</strong> {track.track_number}</li>
											<li><strong>Genre:</strong> {he.decode(track.genre)}</li>
											<li><strong>Key:</strong> {he.decode(track.mixkey)}</li>
										</ul>
									</div>
								</div>
							</li>
						)}
					</ol>
				) : (
					<p className="list--block">There are currently no tracks associated with this release.</p>
				)}
				<div className="profile__actions">
					<Link
						to={{ pathname: `/releases/${props.releaseId}/edit` }}
						className="btn btn--primary"
					>
						Edit Release
					</Link>
				</div>
			</div>
		</Auxiliary>
	);
};

//===============================================================================================================//

export default release;
