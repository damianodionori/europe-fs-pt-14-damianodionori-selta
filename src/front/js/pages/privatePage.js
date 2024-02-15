import React from 'react';
import PrivatePage from '../component/privatePageComponent.js';
import patternImage from '../../img/pattern.jpg'
import '../../styles/privatePage.css';

const PrivatePageContainer = () => {
    const user = {
        first_name: 'John',
        last_name: 'Doe',
        saved_trips: 'Paris, London',
        xp_points: 100,
    };

    return (
        <div className='minheight' style={{ backgroundImage: `url(${patternImage})` }}>
            <div className='overlay3'></div>
            <div>
                <PrivatePage user={user} />
            </div>
        </div>

    );
}

export default PrivatePageContainer;
