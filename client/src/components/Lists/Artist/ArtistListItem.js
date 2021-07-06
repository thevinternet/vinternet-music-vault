import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import "./ArtistListItem.scss";

//===============================================================================================================//

const artistListItem = props => {
	return (
		<li>
			<div className="card--small">
				<figure>
					<picture>
						<img
							key={ReactHtmlParser(props.artistName)}
							src={props.picture.map(picture =>
								picture.location
									? process.env.PUBLIC_URL + `/assets/images/artists/${picture.location}`
									: process.env.PUBLIC_URL + "/assets/images/artists/avatar.jpg"
							)}
							alt={ReactHtmlParser(props.artistName)}
							width="60px"
							height="60px"
						/>
					</picture>
				</figure>
				<div className="card__details">
					<h2>
						<Link to={{ pathname: "/artists/" + props.artistId }}>
							{ReactHtmlParser(props.artistName)}
						</Link>
					</h2>
				</div>
			</div>
		</li>
	);
};

//===============================================================================================================//

export default artistListItem;
