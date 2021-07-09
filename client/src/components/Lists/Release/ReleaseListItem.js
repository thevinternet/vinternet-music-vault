import React from "react";
import { Link } from "react-router-dom";
import he from "he";

import "./ReleaseListItem.scss";

//===============================================================================================================//

const releaseListItem = props => {
	return (
		<li>
			<div className="card--small">
				<figure>
					<picture>
						<img
							key={he.decode(props.releaseName)}
							src={props.picture.map(picture =>
								picture.location
									? process.env.PUBLIC_URL + `/assets/images/releases/${picture.location}`
									: process.env.PUBLIC_URL + "/assets/images/releases/avatar.jpg"
						)}
							alt={he.decode(props.releaseName)}
							width="60px"
							height="60px"
						/>
					</picture>
				</figure>
				<div className="card__details">
					<h2>
						<Link to={{ pathname: `/releases/${props.releaseId}` }}>
							{he.decode(props.releaseName)}
						</Link>
					</h2>
					<ul className="details--inline">
						{props.releaseCat ? <li><strong>Label: </strong>{he.decode(props.releaseCat)}</li> : null }
						{props.releaseYear ? <li><strong>Released: </strong>{props.releaseYear}</li> : null}
					</ul>
				</div>
			</div>
		</li>
	);
};

//===============================================================================================================//

export default releaseListItem;
