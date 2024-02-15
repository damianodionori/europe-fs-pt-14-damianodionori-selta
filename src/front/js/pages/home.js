import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="home-container">
			<div className="bg position-relative text-center">
				<div className="overlay"></div>
				<div className="jumbo">
					<div className="container2">
					<h1 className="display-5 fw-bold">Is planning your next holiday time consuming?<br>
					</br>Let the professionals deal with it!</h1>
					<div className="col-lg-6 mx-auto">
						<Link to="createItinerary" className="mb-4" id="button-lead"  >
							Click here to try our DEMO!
						</Link>
					</div>
					</div>
				</div>
			</div>		
		</div>
	);
};
