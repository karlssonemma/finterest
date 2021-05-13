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
import IconBtn from '../../components/Buttons/IconBtn';
import EditCollNameScreen from '../../components/EditCollNameScreen';


const Container = styled.section`
    height: 200px;
    width: 100%;
    background-color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const BtnContainer = styled.section`
    width: max-content;
    display:flex;
    justify-content: space-between;
`;

const Arrow = styled.img`
    width: 30px;
    height: auto;
    margin-left: ${props => props.theme.space[4]};
    transform: rotate(180deg);
`;

const Date = styled.p`
    font-size: ${props => props.theme.fontSizes.s};
    color: gray;
`;

const LinkToProfile = () => {
    return(
        <Link href={'/profile'}>
            <a style={{position: 'absolute', left: '0'}}><Arrow src='/right.svg' /></a>
        </Link>
    )
};


const CollectionPage = () => {

    const router = useRouter();
    const collId = router.query.id;
    const { currentUser, isAuthenticated } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [collInfo, setCollInfo] = useState('');

    if (!isAuthenticated) {
        router.push('/login')
        return <p>not signed in</p>
    };

    useEffect(() => {
        handleGetCollInfo();
        handleGetPhotos();
    }, []);

   

    const handleGetCollInfo = async () => {
        let coll = await getCollectionFromUser(currentUser.uid, collId);
        setCollInfo(coll.data())
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

    const renderPhotos = () => {
        return(
            <MainGrid>
                {
                    photos.map(item => 
                        <ImageInCollection key={item.id} item={item} handleClick={() => handleDeletePhoto(item.id)} />
                    )
                }
            </MainGrid>
        )
    };

    const openDeleteCollWindow = () => {
        let item = document.querySelector('.deleteCollScreen')
        item.classList.toggle('visible');
    };

    const openChangeNameScreen = () => {
        let item = document.querySelector('.editCollNameScreen')
        item.classList.toggle('visible');
    }

    return(
        <>
        <Navigation />
        <main style={{marginTop: '100px'}}>
            <DeleteCollScreen collId={collId} />
            <EditCollNameScreen collId={collId} />
            <Container>
                <LinkToProfile />
                <Pagetitle>{collInfo.name}</Pagetitle>
                <Date>created: {collInfo.createdAt}</Date>
                <BtnContainer>
                    <IconBtn label='Edit name of collection.' icon='/edit.png' btnFunction={openChangeNameScreen} />
                    <IconBtn label='Delete collection.' icon='/cancel.png' btnFunction={openDeleteCollWindow} />
                </BtnContainer>
            </Container>
            {
                photos.length ? renderPhotos() : <p>Start by adding photos to your collection</p>
                
            }
        </main>
        </>
    )
}

export default CollectionPage;

