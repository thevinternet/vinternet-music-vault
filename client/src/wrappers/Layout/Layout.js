import React from "react";
import { Link } from "react-router-dom";

import "./Layout.scss";

import Auxiliary from "../Auxiliary/Auxiliary";
import Header from "../../components/Structure/Header/Header";
import Footer from "../../components/Structure/Footer/Footer";

//===============================================================================================================//

const Layout = props => {
  
	//const [AuthenticatedStatus, setAutenticatedStatus] = useState(false);
	//<Header isAuthenticated={AuthenticatedStatus} />

	return (
		<Auxiliary>
			<Link
				to={{ hash: "#content" }}
				className="skip-to-content"
				id="skiplink"
			>
				Skip to main content
			</Link>
			<Header />
			<main id="content">{props.children}</main>
			<Footer />
		</Auxiliary>
	);
}

//===============================================================================================================//

export default Layout;
