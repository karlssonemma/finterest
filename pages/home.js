import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

import unsplashInstance from '../config/unsplash';

import ImageComp from '../components/ImageComp';
import MainGrid from '../components/MainGrid';
import { getPhotosBySearch, fetchTenRandomPhotos } from '../helpers/apiHelpers';
import { useAuth } from '../contexts/AuthContext';



const Home = () => {

    const { currentUser } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        window.addEventListener('scroll', () => checkIfScrollIsAtBottom())
    }, [])

    useEffect(async () => {
        getMorePhotos()
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

    const checkIfScrollIsAtBottom = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            //max req är 50/h så hehe bäst att ha denna inaktiv
            // getMorePhotos()
        };
    };

    const getMorePhotos = async () => {
        try {
            let resp = await fetchTenRandomPhotos();
            console.log(resp)
            resp.response.map(item => {
                let photo = {
                    id: item.id,
                    url: item.urls.regular
                };
                setPhotos((prevState) => [...prevState, photo]);
            })
        } catch (e) {
            console.log('err', e)
        }
        
    };

    return(
        <>
            <Navigation handleInput={(e) => setSearchInput(e.target.value)} />
                <MainGrid>
                    {photos !== null && photos.map(item => <ImageComp key={item.id} item={item} />)
                    }
                </MainGrid>
        </>
    )
}

export default Home;