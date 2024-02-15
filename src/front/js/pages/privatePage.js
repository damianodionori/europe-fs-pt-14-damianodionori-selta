import React from 'react';
import PrivatePage from '../component/privatePageComponent.js';
import '../../styles/privatePageBg.css';
import patternImage from '../../img/pattern.jpg'

const PrivatePageContainer = () => {
    const user = {
        first_name: 'John',
        last_name: 'Doe',
        saved_trips: 'Paris, London',
        xp_points: 100,
    };

    return (
        
        <div className='minheight' style={{ backgroundImage: `url(${patternImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <PrivatePage user={user} />
            </div>
        
    );
}

export default PrivatePageContainer;
