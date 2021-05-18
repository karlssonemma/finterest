import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderMain from '../components/HeaderMain';

import unsplashInstance from '../config/unsplash';

import ImageComp from '../components/ImageComp';
import MainGrid from '../components/MainGrid';
import { getPhotosBySearch, fetchTenRandomPhotos } from '../helpers/apiHelpers';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import IconBtn from '../components/Buttons/IconBtn';
import { StandardBtn } from '../components/Buttons/StandardBtn';

// const StyledBtn = styled.button`
//     border: none; 
//     background-color: transparent;
//     cursor: pointer;
// `;

// const Icon = styled.img`
//     width: 18px;
// `;

const Home = () => {

    const router = useRouter();
    const { currentUser, isAuthenticated } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loadingPhotos, setLoadingPhotos] = useState(false);

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
        if(loadingPhotos) {
            console.log(document.body.scrollHeight)
            // if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            //     //max req är 50/h så hehe bäst att ha denna inaktiv
            //     getMorePhotos()
            // };
        }
    };

    const getMorePhotos = async () => {
        try {
            setLoadingPhotos(true)
            let resp = await fetchTenRandomPhotos();
            console.log(resp)
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

    return(
        <>
            <HeaderMain handleInput={(e) => setSearchInput(e.target.value)} />
                <main style={{marginTop: '100px'}}>
                    <MainGrid>
                        {photos !== null && photos.map((item, i) => <ImageComp key={item.id + i} item={item} />)
                        }
                    </MainGrid>
                    <StandardBtn style={{margin: '2em auto'}} onClick={getMorePhotos}>Load more</StandardBtn>
                </main>
        </>
    )
}

export default Home;