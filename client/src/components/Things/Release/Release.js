import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import "./Release.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const release = props => {
	return (
		<Auxiliary>
			<div className="profile__picture">
				<img
					key={ReactHtmlParser(props.releaseTitle)}
					src={props.releasePicture.map(picture =>
						picture.location
							? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
							: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
					)}
					alt={ReactHtmlParser(props.releaseTitle)}
					height="200px"
					width="200px"
				/>
			</div>
			<div className="profile__details">
				<h1>{ReactHtmlParser(props.releaseTitle)}</h1>
				<dl>
					{props.releaseArtist.length ? (
						<Auxiliary>
							<dt>Artists</dt>
							<dd>
								{props.releaseArtist.map((artist, index, arr) =>
									arr.length - 1 === index ? (
										<span key={ReactHtmlParser(artist.name) + index}>
											<Link to={`/artists/${artist.id}`}>
												{ReactHtmlParser(artist.name)}
											</Link>
										</span>
									) : (
										<span key={ReactHtmlParser(artist.name) + index}>
											<Link to={`/artists/${artist.id}`}>
												{ReactHtmlParser(artist.name)}
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
									<Link key={ReactHtmlParser(label.name)} to={`/labels/${label._id}`}>
										{ReactHtmlParser(label.name)}
									</Link>
								)}
							</dd>
							<dt>Catalogue</dt>
							<dd>{ReactHtmlParser(props.releaseCat)}</dd>
							<dt>Year</dt>
							<dd>{ReactHtmlParser(props.releaseYear)}</dd>
						</Auxiliary>
					) : null }
					{props.releaseFormat.length ? (
						<Auxiliary>
							<dt>Format</dt>
							<dd>
								{props.releaseFormat.map((format, index, arr) =>
									arr.length - 1 === index ? (
										<span key={ReactHtmlParser(format)}>
											{ReactHtmlParser(format)}
										</span>
									) : (
										<span key={ReactHtmlParser(format)}>
											{ReactHtmlParser(format)}{", "}
										</span>
									)
								)}
							</dd>
						</Auxiliary>
					) : null}
					{props.releaseLink ? (
						<Auxiliary>
							<dt>Reference Website</dt>
							<dd>
								<a href={ReactHtmlParser(props.releaseLink)} target="_blank" rel="noopener noreferrer">Discogs</a>
							</dd>
						</Auxiliary>
					) : null }
				</dl>
				<h2>Tracks</h2>
				{props.releaseTracks.length ? (
					<ol className={"list--block"}>
						{props.releaseTracks.map((track, index) =>
							<li key={ReactHtmlParser(track.name)}>
								<div className="card--small">
									<figure>
										<picture>
											<img
												src={props.releasePicture.map(picture =>
													picture.location
														? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
														: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
												)}
												alt={ReactHtmlParser(track.track_number)}
												width="60px"
												height="60px"
											/>
										</picture>
									</figure>
									<div className="card__details">
										<h2>
											{track.artist_name.map((artist, index, array) =>
												array.length - 1 === index ? (
													<span key={ReactHtmlParser(artist.name)}>
														{ReactHtmlParser(artist.name)}
													</span>
												) : (
													<span key={ReactHtmlParser(artist.name)}>
														{ReactHtmlParser(artist.name)}{" & "}
													</span>
												)
											)}
											{" - "}{ReactHtmlParser(track.name)}
										</h2>
										<ul className="details--inline">
											<li><strong>Track:</strong> {ReactHtmlParser(track.track_number)}</li>
											<li><strong>Genre:</strong> {ReactHtmlParser(track.genre)}</li>
											<li><strong>Key:</strong> {ReactHtmlParser(track.mixkey)}</li>
										</ul>
									</div>
								</div>
							</li>
						)}
					</ol>
				) : null }
				<div className="profile__actions">
					<Link
						to={{ pathname: "/releases/" + props.releaseId + "/edit" }}
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
