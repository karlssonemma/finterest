import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

import unsplashInstance from '../config/unsplash';

const PhotoComp = styled.img`
    width: 200px;
    height: auto;
`;

const Home = () => {

    const [photos, setPhotos] = useState([]);

    const getPhotos = async () => {
        let response = await unsplashInstance.photos.get({ photoId: 'Sm2J8MF5ZAo' });
        console.log(response);
        setPhotos(response);
    }

    return(
        <>
            <Navigation />
            <button style={{marginTop: '200px'}} onClick={getPhotos}>get photo </button>
            {photos && 
                    <PhotoComp src={photos.response.urls.regular} />
                
            }
        </>
    )
}

export default Home;