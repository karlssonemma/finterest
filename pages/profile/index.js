import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import IconBtn from '../../components/Buttons/IconBtn';
import CollectionComp from '../../components/CollectionComp';
import HeaderMain from '../../components/HeaderMain';
import CreateCollScreen from '../../components/Modals/CreateCollScreen';
import EditProfileScreen from '../../components/Modals/EditProfileScreen';
import { useAuth } from '../../contexts/AuthContext';
import { getProfilePicWithUserId, readAllCollections, readCurrentUser } from '../../helpers/firebaseHelpers';


const StyledGrid = styled.section`
    width: 100%;
    padding: 0 20px;
    z-index: 0;
    gap: 10px;

    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 350px;

    @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: repeat(4, 1fr);
        padding: 0 100px;
    }
`;

const Container = styled.section`
    height: 300px;
    width: 100%;
    background-color: white;
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
    margin-top: ${props => props.theme.space[3]};
    width: 45px;
    display: flex;
    justify-content: space-between;
`;

const Text = styled.p`
    text-align: center;
    font-size: ${props => props.theme.fontSizes.m};
    font-family: ${props => props.theme.fonts.cardo};
`;

const DisplayName = styled.p`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 100;
    font-family: ${props => props.theme.fonts.cardo};
`;

const Username = styled.p`
    font-weight: 100;
    color: gray;
`;

const Profile = () => {

    const router = useRouter();
    const { currentUser, isAuthenticated } = useAuth();
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('/user.svg');

    useEffect(async () => {
        let ref = await readCurrentUser(currentUser.uid)
        ref.onSnapshot(doc => {
            setDisplayName(doc.data().displayName)
            setUsername(doc.data().username)
        })
    }, [])

    useEffect(async () => {
        let url = await getProfilePicWithUserId(currentUser.uid)
        url ? setProfilePic(url) : setProfilePic('/user.svg')
    }, [])

    useEffect(async () => {
        let coll = await readAllCollections(currentUser.uid)
        coll.onSnapshot((querySnapshot) => {
            let arr = [];
            querySnapshot.forEach(doc => {
                arr.push({...doc.data(), id: doc.id})
            })
            setCollections(arr)
        })
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

    if (!isAuthenticated) {
        router.push('/')
        return <p>not signed in</p>
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
            <StyledGrid>
                {
                    filteredCollections && filteredCollections.map((item, i) => <CollectionComp key={item.id + i} coll={item} />)
                }
            </StyledGrid>
        )
    };


    return(
        <>
            <HeaderMain handleInput={e => handleText(e)} />
            <main>
                <Container>
                    {
                        profilePic && <StyledPic src={profilePic} />
                    }
                    <DisplayName>{displayName && displayName}</DisplayName>
                    <Username>@{username && username}</Username>
                    <BtnContainer>
                        <IconBtn
                            label='Create new collection.'
                            icon='/add.svg'
                            btnFunction={() => openCreateCollWindow()}
                        />
                        <CreateCollScreen />
                        <IconBtn 
                            icon='/settings.png' 
                            btnFunction={() => openEditProfileWindow()}
                            label='Profile settings.'
                        />
                        <EditProfileScreen />
                    </BtnContainer>
                </Container>
                {
                    filteredCollections.length 
                    ? renderCollections() 
                    : <Text style={{textAlign: 'center'}}>
                        {
                            searchInput.length 
                                ? `No results for "${searchInput}"` 
                                : 'Create a new collection by pressing +'
                        }
                    </Text>
                }
            </main>
        </>
    )
}

export default Profile;