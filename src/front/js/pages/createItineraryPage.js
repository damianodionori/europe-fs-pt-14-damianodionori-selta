import React from 'react';
import CreateItinerary from '../component/createItinerary.js';
import { Link } from 'react-router-dom';
import '../../styles/createItinerary.css';
import { useContext } from 'react';
import { Context } from "../store/appContext";

const CreateItineraryPage = () => {

  const { store, actions } = useContext(Context);

  return (
    <div className="itinerary-container">
      <div className="page-title">Create Itinerary</div>
      <CreateItinerary />
      {store.accessToken && (
      <Link to="/privatePage" className="back-button">
        Back to my Profile
      </Link>)}
    </div>
  );
};

export default CreateItineraryPage;