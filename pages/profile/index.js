import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Link from 'next/link';

import StandardBtn from '../../components/Buttons/StandardBtn';
import CollectionComp from '../../components/CollectionComp';
import CreateCollScreen from '../../components/Modals/CreateCollScreen';
import EditProfileScreen from '../../components/Modals/EditProfileScreen';
import MainGrid from '../../components/MainGrid';
import HeaderMain from '../../components/HeaderMain';
import ModalContainer from '../../components/ModalContainer';
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


const StyledPic = styled.img`
    width: 100px;
    height: 100px;
    margin-bottom: ${props => props.theme.space[2]};
    border-radius: 50%;
    
    object-fit: cover;
`;

const BtnContainer = styled.div`
    width: 45px;
    display: flex;
    justify-content: space-between;
`;

const Text = styled.p`
    text-align: center;
    font-size: ${props => props.theme.fontSizes.m};
`;


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
        url ? setProfilePic(url) : setProfilePic('/user.svg')
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
            <HeaderMain handleInput={e => handleText(e)} />
            <CreateCollScreen />
            <EditProfileScreen />
            
            <main>
                <Container>
                    {
                        profilePic && <StyledPic src={profilePic} />
                    }
                    <Pagetitle>{currentUser && currentUser.displayName ? currentUser.displayName : currentUser.email}</Pagetitle>
                    <BtnContainer>
                        <IconBtn
                            label='Create new collection.'
                            icon='/add.svg'
                            btnFunction={() => openCreateCollWindow()}
                        />
                        <IconBtn 
                            icon='/settings.png' 
                            btnFunction={() => openEditProfileWindow()}
                            label='Profile settings.'
                        />
                    </BtnContainer>
                </Container>
                {
                    filteredCollections.length 
                    ? renderCollections() 
                    : <Text style={{textAlign: 'center'}}>Create a new collection by pressing +</Text>
                }
            </main>
        </>
    )
}

export default Profile;