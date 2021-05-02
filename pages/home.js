import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

import unsplashInstance from '../config/unsplash';

import ImageComp from '../components/ImageComp';
import MainGrid from '../components/MainGrid';
import { getTenRandomPhotos } from '../api/apiHelpers';


const Home = () => {


    const [photos, setPhotos] = useState([]);

    const getPhotos = async () => {
        let response = await unsplashInstance.photos.get({ photoId: 'Sm2J8MF5ZAo' });
        console.log(response.response.id);
        let photo = {
            id: response.response.id,
            url: response.response.urls.regular
        };
        setPhotos(photo);
    }

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
                    {photos !== null && photos.map(item => <ImageComp photoSrc={item.url} />)
                    }
                </MainGrid>
        </>
    )
}

export default Home;