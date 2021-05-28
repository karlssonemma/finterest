import React, { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { readCollection, checkIfCollectionExistsByName } from '../../helpers/firebaseHelpers';

import ModalContainer from '../ModalContainer';
import { StandardBtn } from '../Buttons/StandardBtn';
import InputField from '../FormComponents/InputField';
import { ErrorMessage } from '../ErrorMessage';


const EditCollNameScreen = ({ collId }) => {

    const { currentUser } = useAuth()
    const router = useRouter()
    const [name, setName] = useState('');
    const [nameAlreadyInUse, setNameAlreadyInUse] = useState(false);
    

    useEffect(async () => {
        let foundCollWithSameName = false;
        if(name.length > 1) {
            foundCollWithSameName = await checkIfCollectionExistsByName(currentUser.uid, name);
            setNameAlreadyInUse(foundCollWithSameName)
        }
    }, [name])


    const handleText = (e) => {
        setName(e.target.value)
    };

    const changeName = async () => {
        if(name.length > 1) {
            if(!nameAlreadyInUse) {
                let ref = await readCollection(currentUser.uid, collId);
                ref.update({
                    name: name
                })
                setName('');
                closeWindow();
            }
        }
    };

    const closeWindow = (e) => {
        let item = document.querySelector('.editCollNameScreen')
        item.classList.remove('visible');
        console.log(e)
    };

    
    return(
        <ModalContainer name='editCollNameScreen'>
            {
                nameAlreadyInUse && <ErrorMessage>Name already in use</ErrorMessage>
            }
            <InputField 
                inputType='text' 
                inputName='newCollName' 
                labelText='New name' 
                handleChange={e => handleText(e)} 
            />
            <StandardBtn onClick={changeName}>Change name</StandardBtn>
        </ModalContainer>
    )
}

export default EditCollNameScreen;