import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

import unsplashInstance from '../config/unsplash';

import ImageComp from '../components/ImageComp';
import MainGrid from '../components/MainGrid';
import { getTenRandomPhotos } from '../helpers/apiHelpers';


const Home = () => {


    const [photos, setPhotos] = useState([]);

    useEffect(async () => {
        let resp = await getTenRandomPhotos();
        
        resp.response.map(item => {
            let photo = {
                id: item.id,
                url: item.urls.regular
            };
            setPhotos((prevState) => [...prevState, photo]);
        })
    }, [])

    return(
        <>
            <Navigation />
                <MainGrid>
                    {photos !== null && photos.map(item => <ImageComp key={item.id} photoSrc={item.url} />)
                    }
                </MainGrid>
        </>
    )
}

export default Home;