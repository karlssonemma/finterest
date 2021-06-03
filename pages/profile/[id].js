import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import firebaseInstance from '../../config/firebase';
import Link from 'next/link';

import HeaderMain from '../../components/HeaderMain';
import { useAuth } from '../../contexts/AuthContext';
import { deletePhoto, getCollection, readPhotos, deleteCollection, deleteCollectionDoc, readCollection } from '../../helpers/firebaseHelpers';
import ImageGrid from '../../components/ImageGrid';
import ImageInCollection from '../../components/ImageInCollection';
import theme from '../../utils/theme';
import DeleteCollScreen from '../../components/Modals/DeleteCollScreen';
import StandardBtn from '../../components/Buttons/StandardBtn';
import { Pagetitle } from '../../components/Pagetitle';
import IconBtn from '../../components/Buttons/IconBtn';
import EditCollNameScreen from '../../components/Modals/EditCollNameScreen';


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
    width: 50px;
    margin-top: ${props => props.theme.space[3]};
    display: flex;
    justify-content: space-between;
`;

const Arrow = styled.img`
    width: 30px;
    height: auto;
    transform: rotate(180deg);
`;

const Date = styled.p`
    font-size: ${props => props.theme.fontSizes.s};
    color: gray;
    font-weight: 100;
`;


const Text = styled.p`
    text-align: center;
    font-size: ${props => props.theme.fontSizes.m};
    font-family: ${props => props.theme.fonts.cardo};
`;

const StyledLink = styled.a`
    width: max-content;
    margin-left: ${props => props.theme.space[3]};
    display: block;
    position: absolute;
    left: 20px;

    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        left: 100px;
    }
`;

const LinkToProfile = () => {
    return(
        <Link href='/profile'>
            <StyledLink aria-label='Go back.'><Arrow alt='' src='/right.svg' /></StyledLink>
        </Link>
    )
};


const CollectionPage = () => {

    const router = useRouter();
    const collId = router.query.id;
    const { currentUser, isAuthenticated } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [collInfo, setCollInfo] = useState('');

    useEffect(() => {
        handleGetCollInfo();
        handleGetPhotos();
    }, []);

    if (!isAuthenticated) {
        router.push('/')
        return <p>not signed in</p>
    };

    const handleGetCollInfo = async () => {
        let ref = await readCollection(currentUser.uid, collId);
        ref.onSnapshot(doc => setCollInfo(doc.data()))
    };

    const handleGetPhotos = async () => {
        let coll = await readPhotos(currentUser.uid, collId)
        coll.onSnapshot((querySnapshot) => {
            let arr = [];
            querySnapshot.forEach((doc) => {
                arr.push({...doc.data()})
            })
            setPhotos(arr)
        })
    };

    const renderPhotos = () => {
        return(
            <ImageGrid>
                {
                    photos.map(item => 
                        <ImageInCollection key={item.id} item={item} />
                    )
                }
            </ImageGrid>
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
        <HeaderMain />
        <main style={{marginTop: '100px'}}>
            <Container>
                <LinkToProfile />
                <Pagetitle>{collInfo.name}</Pagetitle>
                <Date>created: {collInfo.createdAt}</Date>
                <BtnContainer>
                    <IconBtn 
                        label='Edit name of collection.' 
                        icon='/edit.png' 
                        btnFunction={() => openChangeNameScreen()} 
                    />
                    <EditCollNameScreen collId={collId} />
                    <IconBtn 
                        label='Delete collection.' 
                        icon='/cancel.png' 
                        btnFunction={() => openDeleteCollWindow()} 
                    />
                    <DeleteCollScreen collId={collId} />
                </BtnContainer>
            </Container>
            {
                photos.length 
                    ? renderPhotos() 
                    : <Text>Start by adding photos to your collection</Text>
                
            }
        </main>
        </>
    )
}

export default CollectionPage;

