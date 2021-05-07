import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Link from 'next/link';

import StandardBtn from '../../components/Buttons/StandardBtn';
import CollectionComp from '../../components/CollectionComp';
import CreateCollScreen from '../../components/CreateCollScreen';
import MainGrid from '../../components/MainGrid';
import Navigation from '../../components/Navigation';
import Overlay from '../../components/Overlay';
import { Pagetitle } from '../../components/Pagetitle';
import { useAuth } from '../../contexts/AuthContext';
import { readCurrentUser, readUsersCollections } from '../../helpers/firebaseHelpers';

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


const Profile = () => {

    const { currentUser } = useAuth();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        getCollections()
    }, [])

    const getCollections = async () => {
        let coll = await readUsersCollections(currentUser.uid)
        coll.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                setCollections(prevState => [...prevState, {...doc.data(), id: doc.id}])
            })
        })
    };

    const openCreateCollWindow = () => {
        let item = document.querySelector('.createCollScreen')
        item.classList.toggle('visible');
    };

    return(
        <>
            <Navigation />
            <CreateCollScreen />
            <main>
                <Container>
                    <Link href={'/home'}>
                        <a style={{position: 'absolute', left: '0'}}><Arrow src='/right.svg' /></a>
                    </Link>
                    <Pagetitle>username</Pagetitle>
                    <StandardBtn onClick={openCreateCollWindow}>Create collection</StandardBtn>
                </Container>
                <MainGrid>

                {
                    collections && collections.map(item => <CollectionComp key={item.id} coll={item} />)
                }

                </MainGrid>
            </main>
        </>
    )
}

export default Profile;