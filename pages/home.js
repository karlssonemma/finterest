import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

import unsplashInstance from '../config/unsplash';

import ImageComp from '../components/ImageComp';
import MainGrid from '../components/MainGrid';
import { getPhotosBySearch, getTenRandomPhotos } from '../helpers/apiHelpers';


const Home = () => {

    const [photos, setPhotos] = useState([]);
    const [searchInput, setSearchInput] = useState('');

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

    useEffect(async () => {
        console.log(searchInput)
        if (searchInput.length > 0) {

            setPhotos([])
            try {
                let resp = await getPhotosBySearch({ input: searchInput });

                resp.response.results.map(item => {
                    let photo = {
                        id: item.id,
                        url: item.urls.regular
                    };
                    setPhotos((prevState) => [...prevState, photo]);
                })
                console.log(resp.response)
            } catch(e) {
                console.log('errrrr', e)
            }
            
            
        };
    
        
    }, [searchInput])

    return(
        <>
            <Navigation handleInput={(e) => setSearchInput(e.target.value)} />
                <MainGrid>
                    {photos !== null && photos.map(item => <ImageComp key={item.id} photoSrc={item.url} />)
                    }
                </MainGrid>
        </>
    )
}

export default Home;