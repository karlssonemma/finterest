import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Link from 'next/link';

import StandardBtn from '../../components/Buttons/StandardBtn';
import CollectionComp from '../../components/CollectionComp';
import CreateCollScreen from '../../components/CreateCollScreen';
import EditProfileScreen from '../../components/EditProfileScreen';
import MainGrid from '../../components/MainGrid';
import Navigation from '../../components/Navigation';
import Overlay from '../../components/Overlay';
import { Pagetitle } from '../../components/Pagetitle';
import { useAuth } from '../../contexts/AuthContext';
import { getProfilePicWithUserId, readCurrentUser, readUsersCollections } from '../../helpers/firebaseHelpers';
import { useRouter } from 'next/router';
import IconBtn from '../../components/Buttons/IconBtn';
import firebaseInstance from '../../config/firebase';

const Container = styled.section`
    height: 300px;
    width: 100%;
    background-color: white;
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
    margin-left: ${props => props.theme.space[4]};
    transform: rotate(180deg);
    
`;

const CreateCollBtn = styled.button`
    border: none;
    padding: ${props => props.theme.space[1]};
    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        border: 2px solid black;
    }
`;

const AddIcon = styled.img`
    width: 12px;
    margin-right: ${props => props.theme.space[1]};
`;

const StyledPic = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;



const LinkToFeed = () => {
    return(
        <Link href={'/home'}>
            <a style={{position: 'absolute', left: '0', zIndex: '0'}}><Arrow src='/right.svg' /></a>
        </Link>
    )
};



const Profile = () => {

    const router = useRouter();
    const { currentUser, isAuthenticated } = useAuth();
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    if (!isAuthenticated) {
        router.push('/login')
        return <p>not signed in</p>
    };

    useEffect(async () => {
        let url = await getProfilePicWithUserId(currentUser.uid)
        setProfilePic(url)
    }, [])

    useEffect(() => {
        getCollections()
    }, []);

    useEffect(() => {
        if(collections.length) {
            setFilteredCollections(collections)
        }
    }, [collections])

    useEffect(() => {
        if(searchInput.length > 0) {
            setFilteredCollections(collections.filter(coll => (coll.name).toLowerCase().includes(searchInput.toLowerCase())))
        } else {
            setFilteredCollections(collections)
        }
    }, [searchInput]);

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

    const openEditProfileWindow = () => {
        let item = document.querySelector('.editProfileWindow')
        item.classList.toggle('visible');
    };

    const handleText = (e) => {
        setSearchInput(e.target.value)
    };

    const renderCollections = () => {
        return(
            <MainGrid>
                {
                    filteredCollections && filteredCollections.map((item, i) => <CollectionComp key={item.id + i} coll={item} />)
                }
            </MainGrid>
        )
    }


    return(
        <>
            <Navigation handleInput={e => handleText(e)} />
            <CreateCollScreen />
            <EditProfileScreen />
            
            <main>
                <Container>
                    <LinkToFeed />
                    {
                        profilePic && <StyledPic src={profilePic} />
                    }
                    <Pagetitle>{currentUser && currentUser.displayName ? currentUser.displayName : 'username'}</Pagetitle>
                    <CreateCollBtn onClick={openCreateCollWindow}><AddIcon src={'/add.svg'} />collection</CreateCollBtn>
                    <IconBtn icon='/edit.png' btnFunction={() => openEditProfileWindow()} />
                </Container>
                {
                    filteredCollections.length ? renderCollections() : <p>Start by creating a collection!</p>
                }
            </main>
        </>
    )
}

export default Profile;