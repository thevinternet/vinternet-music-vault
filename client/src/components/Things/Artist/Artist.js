import React from "react";
import { Link } from "react-router-dom";
import he from "he";

import "./Artist.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const artist = props => {
	return (
		<Auxiliary>
			<div className="profile__picture">
				<img
					key={he.decode(props.artistName)}
					src={props.picture.map(picture =>
						picture.location
						? process.env.PUBLIC_URL + `/assets/images/artists/${picture.location}`
						: process.env.PUBLIC_URL + "/assets/images/artists/avatar.jpg"
					)}
					alt={he.decode(props.artistName)}
					height="200px"
					width="200px"
				/>
			</div>
			<div className="profile__details">
				<h1>{he.decode(props.artistName)}</h1>
				{props.realName || props.aliasName.length ? (
					<dl>
						{props.realName ? (
							<Auxiliary>
								<dt>Real Name</dt>
								<dd>{he.decode(props.realName)}</dd>
							</Auxiliary>
						) : null }
						{props.aliasName.length ? (
							<Auxiliary>
								<dt>Aliases</dt>
								<dd>
									{props.aliasName.map((alias, index, arr) =>
										arr.length - 1 === index ? (
											<span key={he.decode(alias.name)}>
												<Link to={`/artists/${alias._id}`}>
													{he.decode(alias.name)}
												</Link>
											</span>
										) : (
											<span key={he.decode(alias.name)}>
												<Link to={`/artists/${alias._id}`}>
													{he.decode(alias.name)}
												</Link>
												,{" "}
											</span>
										)
									)}
								</dd>
							</Auxiliary>
						) : null }
					</dl>
				) : null }
				<h2>Profile</h2>
				<p>{he.decode(props.profile)}</p>
				{props.website.length ? (
					<Auxiliary>
						<h3>Websites</h3>
						<ul>
							{props.website.map(site =>
								site.url ? (
									<li key={he.decode(site.name)}>
										<a
											href={he.decode(site.url)}
											target="_blank"
											rel="noopener noreferrer"
										>
											{he.decode(site.name)}
										</a>
									</li>
								) : null
							)}
						</ul>
					</Auxiliary>
				) : null }
				<div className="profile__actions">
					<Link
						to={{ pathname: `/artists/${props.artistId}/edit` }}
						className="btn btn--primary"
					>
						Edit Artist
					</Link>
				</div>
			</div>
		</Auxiliary>
	);
};

//===============================================================================================================//

export default artist;
