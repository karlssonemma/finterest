import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import CollectionComp from '../../components/CollectionComp';
import CreateCollScreen from '../../components/CreateCollScreen';
import MainGrid from '../../components/MainGrid';
import Navigation from '../../components/Navigation';
import Overlay from '../../components/Overlay';
import { useAuth } from '../../contexts/AuthContext';
import { readCurrentUser, readCurrentUsersCollections, readUsers } from '../../helpers/firebaseHelpers';

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


const Profile = () => {

    const { currentUser } = useAuth();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        getCollections()
    }, [])

    const getCollections = async () => {
        let coll = await readCurrentUsersCollections({ id: currentUser.uid })
        coll.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                setCollections(prevState => [...prevState, doc.data()])
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
                    <h1>username</h1>
                    <button onClick={openCreateCollWindow}>create coll</button>
                </Container>
                <MainGrid>

                {
                    collections && collections.map(item => <CollectionComp coll={item} />)
                }

                </MainGrid>
            </main>
        </>
    )
}

export default Profile;