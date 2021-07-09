import React from "react";
import { Link } from "react-router-dom";
import he from "he";

import "./Label.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const label = props => {
	return (
		<Auxiliary>
			<div className="profile__picture">
				<img
					key={he.decode(props.labelName)}
					src={props.picture.map(picture =>
						picture.location
							? process.env.PUBLIC_URL + `/assets/images/labels/${picture.location}`
							: process.env.PUBLIC_URL + "/assets/images/labels/avatar.jpg"
					)}
					alt={he.decode(props.labelName)}
					height="200px"
					width="200px"
				/>
			</div>
			<div className="profile__details">
				<h1>{he.decode(props.labelName)}</h1>
				{props.parentLabel.length || props.subsidiaryLabel.length ? (
					<dl>
						{props.parentLabel.length ? (
							<Auxiliary>
								<dt>Parent Label</dt>
								<dd>
									{props.parentLabel.map(parent => (
										<Link key={parent._id} to={`/labels/${parent._id}`}>
											{he.decode(parent.name)}
										</Link>
									))}
								</dd>
							</Auxiliary>
						) : null}
						{props.subsidiaryLabel.length ? (
							<Auxiliary>
								<dt>Subsidiary Labels</dt>
								<dd>
									{props.subsidiaryLabel.map((subsidiary, index, arr) =>
										arr.length - 1 === index ? (
											<span key={subsidiary.name}>
												<Link to={`/labels/${subsidiary._id}`}>
													{he.decode(subsidiary.name)}
												</Link>
											</span>
										) : (
											<span key={subsidiary.name}>
												<Link to={`/labels/${subsidiary._id}`}>
													{he.decode(subsidiary.name)}
												</Link>
												,{" "}
											</span>
										)
									)}
								</dd>
							</Auxiliary>
						) : null}
					</dl>
				) : null}
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
				) : null}
				<div className="profile__actions">
					<Link
						to={{ pathname: `/labels/${props.labelId}/edit` }}
						className="btn btn--primary"
					>
						Edit Label
					</Link>
				</div>
			</div>
		</Auxiliary>
	);
};

//===============================================================================================================//

export default label;
