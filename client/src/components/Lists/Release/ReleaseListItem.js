import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import "./ReleaseListItem.scss";

//===============================================================================================================//

const releaseListItem = props => {
	return (
		<li>
			<div className="card--small">
				<figure>
					<picture>
						<img
							key={ReactHtmlParser(props.releaseName)}
							src={props.picture.map(picture =>
								picture.location
									? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
									: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
						)}
							alt={ReactHtmlParser(props.releaseName)}
							width="60px"
							height="60px"
						/>
					</picture>
				</figure>
				<div className="card__details">
					<h2>
						<Link to={{ pathname: "/releases/" + props.releaseId }}>
							{ReactHtmlParser(props.releaseName)}
						</Link>
					</h2>
					<ul className="details--inline">
						{props.releaseCat ? <li><strong>Label:</strong> {ReactHtmlParser(props.releaseCat)}</li> : null }
						{props.releaseYear ? <li><strong>Released:</strong> {ReactHtmlParser(props.releaseYear)}</li> : null}         
					</ul>
				</div>
			</div>
		</li>
	);
};

//===============================================================================================================//

export default releaseListItem;
