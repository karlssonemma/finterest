import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderMain from '../components/HeaderMain';

import ImageComp from '../components/ImageComp';
import ImageGrid from '../components/ImageGrid';
import { getPhotosBySearch, fetchRandomPhotos } from '../helpers/apiHelpers';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { StandardBtn } from '../components/Buttons/StandardBtn';


const Home = () => {

    const router = useRouter();
    const { currentUser, isAuthenticated } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loadingPhotos, setLoadingPhotos] = useState(false);
    const [count, setCount] = useState(11);


    useEffect(async () => {
        getRandomPhotos()
        getRandomPhotos()
        getRandomPhotos()
    }, [])

    useEffect(async () => {
        setCount(11);
        getSearchedPhotos();
        getSearchedPhotos();
        getSearchedPhotos();
    }, [searchInput])

    if (!isAuthenticated) {
        router.push('/')
        return <p>not signed in</p>
    };

    const getSearchedPhotos = async () => {
        if (searchInput.length > 0) {
            setPhotos([])
            try {
                let pageNr = (Math.floor(Math.random() * 200));
                let resp = await getPhotosBySearch(searchInput, pageNr);

                resp.response.results.map(item => {
                    let photo = {
                        id: item.id,
                        url: item.urls.regular,
                        alt_description: item.alt_description,
                        user: {
                            name: item.user.name,
                            instagram: item.user.instagram_username
                        }
                    };
                    setPhotos((prevState) => [...prevState, photo]);
                })
                console.log(resp.response)
            } catch(e) {
                console.log('error', e)
            }
        };
    }

    const getRandomPhotos = async () => {
        try {
            setLoadingPhotos(true)
            let resp = await fetchRandomPhotos(30);
            resp.response.map(item => {
                let photo = {
                    id: item.id,
                    url: item.urls.regular,
                    alt_description: item.alt_description,
                    user: {
                        name: item.user.name,
                        instagram: item.user.instagram_username
                    }
                };
                setPhotos((prevState) => [...prevState, photo]);
                setLoadingPhotos(false)
            })
        } catch (e) {
            console.log('err', e)
        }
    };

    const addToCount = () => {
        let oldCount = count;
        let newCount = oldCount += 12;
        setCount(newCount)

        if(newCount >= photos.length) {
            if(!searchInput.length) {
                getSearchedPhotos();
                getSearchedPhotos();
                getSearchedPhotos();
            } else {
                getRandomPhotos()
                getRandomPhotos()
                getRandomPhotos()
            }
        }
    };

    return(
        <>
            <HeaderMain handleInput={(e) => setSearchInput(e.target.value)} />
                <main style={{marginTop: '100px'}}>
                    <ImageGrid>
                        {photos !== null && photos.map((item, i) => {
                            if (i <= count) {
                                return(
                                    <ImageComp key={item.id + i} item={item} />
                                )
                            }
                        })
                        }
                    </ImageGrid>
                    <StandardBtn style={{margin: '2em auto'}} onClick={() => addToCount()}>Load more</StandardBtn>
                </main>
        </>
    )
}

export default Home;