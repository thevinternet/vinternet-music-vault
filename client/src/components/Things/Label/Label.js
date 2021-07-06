import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import "./Label.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

//===============================================================================================================//

const label = props => {
	return (
		<Auxiliary>
			<div className="profile__picture">
				<img
					key={ReactHtmlParser(props.labelName)}
					src={props.picture.map(picture =>
						picture.location
							? process.env.PUBLIC_URL + `/assets/images/labels/${picture.location}`
							: process.env.PUBLIC_URL + "/assets/images/labels/avatar.jpg"
					)}
					alt={ReactHtmlParser(props.labelName)}
					height="200px"
					width="200px"
				/>
			</div>
			<div className="profile__details">
				<h1>{ReactHtmlParser(props.labelName)}</h1>
				{props.parentLabel.length || props.subsidiaryLabel.length ? (
					<dl>
						{props.parentLabel.length ? (
							<Auxiliary>
								<dt>Parent Label</dt>
								<dd>
									{props.parentLabel.map(parent => (
										<Link key={parent._id} to={`/labels/${parent._id}`}>
											{ReactHtmlParser(parent.name)}
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
													{ReactHtmlParser(subsidiary.name)}
												</Link>
											</span>
										) : (
											<span key={subsidiary.name}>
												<Link to={`/labels/${subsidiary._id}`}>
													{ReactHtmlParser(subsidiary.name)}
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
				<p>{ReactHtmlParser(props.profile)}</p>
				{props.website.length ? (
					<Auxiliary>
						<h3>Websites</h3>
						<ul>
							{props.website.map(site =>
								site.url ? (
									<li key={ReactHtmlParser(site.name)}>
										<a
											href={ReactHtmlParser(site.url)}
											target="_blank"
											rel="noopener noreferrer"
										>
											{ReactHtmlParser(site.name)}
										</a>
									</li>
								) : null
							)}
						</ul>
					</Auxiliary>
				) : null}
				<div className="profile__actions">
					<Link
						to={{ pathname: "/labels/" + props.labelId + "/edit" }}
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
