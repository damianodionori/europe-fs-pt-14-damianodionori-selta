import React from 'react';
import CreateItinerary from '../component/createItinerary.js';
import { Link } from 'react-router-dom';
import '../../styles/createItinerary.css';
import { useContext } from 'react';
import { Context } from "../store/appContext";
import patternImage from '../../img/pattern.jpg'

const CreateItineraryPage = () => {

  const { store, actions } = useContext(Context);

  return (
    <div className='minheight' style={{ backgroundImage: `url(${patternImage})`}}>
      <div className="overlay3"></div>
      <div className='it-container'>
      <div className="itinerary-container">
        <div className="page-title">Create Itinerary</div>
        <CreateItinerary />
        {store.accessToken && (
          <Link to="/privatePage" className="back-button">
            Back to my Profile
          </Link>)}
      </div>
      </div>
    </div>
  );
};

export default CreateItineraryPage;