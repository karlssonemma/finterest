import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import firebaseInstance from '../../config/firebase';
import Link from 'next/link';

import Navigation from '../../components/Navigation';
import { useAuth } from '../../contexts/AuthContext';
import { deletePhotoFromCollection, getCollectionFromUser, readPhotosFromCollection, deleteCollection, deleteCollectionDoc } from '../../helpers/firebaseHelpers';
import MainGrid from '../../components/MainGrid';
import ImageInCollection from '../../components/ImageInCollection';
import theme from '../../utils/theme';
import DeleteCollScreen from '../../components/DeleteCollScreen';
import StandardBtn from '../../components/Buttons/StandardBtn';
import { Pagetitle } from '../../components/Pagetitle';

const Container = styled.section`
    height: 100px;
    width: 100%;
    background-color: gray;
    //måste ändras
    margin-top: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Arrow = styled.img`
    width: 30px;
    height: auto;
    margin-left: ${props => props.theme.space[1]};
    transform: rotate(180deg);
`;


const CollectionPage = () => {

    const router = useRouter();
    const collId = router.query.id;
    const { currentUser } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [collName, setCollName] = useState('');

    if (!isAuthenticated) {
        router.push('/login')
        return <p>not signed in</p>
    };

    useEffect(() => {
        handleGetCollInfo();
        handleGetPhotos();
    }, []);

    const openDeleteCollWindow = () => {
        let item = document.querySelector('.deleteCollScreen')
        item.classList.toggle('visible');
    };

    const handleGetCollInfo = async () => {
        let coll = await getCollectionFromUser(currentUser.uid, collId);
        setCollName(coll.data().name)
    };

    const handleGetPhotos = async () => {

        //kanske inte bästa løsningen men snapshot lyssnar ej till delete as of now
        setPhotos([]);
        
        let coll = await readPhotosFromCollection(currentUser.uid, collId)
        coll.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setPhotos(prevState => [...prevState, {...doc.data()}])
            })
        })
    };

    const handleDeletePhoto = async (id) => {
        deletePhotoFromCollection(currentUser.uid, collId, id)
        .then(() => handleGetPhotos())
    };

    return(
        <>
        <Navigation />
        <DeleteCollScreen collId={collId} />
        <Container>
            <Link href={'/profile'}>
                <a style={{position: 'absolute', left: '0'}}><Arrow src='/right.svg' /></a>
            </Link>
            <Pagetitle>{collName}</Pagetitle>
            <StandardBtn onClick={openDeleteCollWindow}>Delete collection</StandardBtn>
        </Container>
        <MainGrid>
            {
                photos && photos.map(item => 
                    <ImageInCollection key={item.id} item={item} handleClick={() => handleDeletePhoto(item.id)} />
                )
            }
        </MainGrid>
        </>
    )
}

export default CollectionPage;

