import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faTrophy, faCrown } from '@fortawesome/free-solid-svg-icons';

const Achievements = () => {

    const [savedItineraries, setSavedItineraries] = useState(0);
    
    useEffect(() => {
        // Implement logic to fetch saved itineraries count from backend or local storage
        // and update the state.
        // Example: const savedItinerariesCount = fetchSavedItinerariesCount();
        // setSavedItineraries(savedItinerariesCount);
      }, []);
    
      const checkAndDisplayBadge = (threshold, badgeText) => {
        if (savedItineraries >= threshold) {
          return (
            <div key={threshold}>
              <p>Congratulations! {badgeText}</p>
              {/* Add badge image or any other visual representation */}
            </div>
          );
        }
        return null;
      };
    
      return (
        <div>
          {/* Display total saved itineraries count */}
          <p>Total Saved Itineraries: {savedItineraries}</p>
    
          {/* Display badges based on achievement thresholds */}
          {savedItineraries === 0 && <p>No achievements yet.</p>}
          {checkAndDisplayBadge(1, 'You\'ve earned a badge for saving 1 itinerary.')}
          {checkAndDisplayBadge(3, 'You\'ve earned an additional badge for saving 3 itineraries.')}
          {checkAndDisplayBadge(5, 'You\'ve earned an additional badge for saving 5 itineraries.')}
        </div>
      );
    };
    
    export default Achievements;