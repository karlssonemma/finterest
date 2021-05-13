import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

import unsplashInstance from '../config/unsplash';

import ImageComp from '../components/ImageComp';
import MainGrid from '../components/MainGrid';
import { getPhotosBySearch, fetchTenRandomPhotos } from '../helpers/apiHelpers';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';



const Home = () => {

    const router = useRouter();
    const { currentUser, isAuthenticated } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    if (!isAuthenticated) {
        router.push('/login')
        return <p>not signed in</p>
    };

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
                    url: item.urls.regular,
                    alt_description: item.alt_description
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
                <main style={{marginTop: '100px'}}>
                    <MainGrid>
                        {photos !== null && photos.map((item, i) => <ImageComp key={item.id + i} item={item} />)
                        }
                    </MainGrid>
                </main>
        </>
    )
}

export default Home;