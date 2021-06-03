import React, { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { checkIfCollectionExistsByName, addCollection } from '../../helpers/firebaseHelpers';

import ModalContainer from '../ModalContainer';
import { StandardBtn } from '../Buttons/StandardBtn';
import InputField from '../FormComponents/InputField';
import { ErrorMessage } from '../ErrorMessage';


const CreateCollScreen = () => {

    const { currentUser } = useAuth()
    const [text, setText] = useState('');
    const [nameAlreadyInUse, setNameAlreadyInUse] = useState(false);
    

    useEffect(async () => {
        let foundCollWithSameName = false;
        if(text.length > 1) {
            foundCollWithSameName = await checkIfCollectionExistsByName(currentUser.uid, text);
            setNameAlreadyInUse(foundCollWithSameName)
        }
    }, [text])

    const handleText = (e) => {
        setText(e.target.value)
    };

    const createColl = async () => {
        if(!nameAlreadyInUse) {
            addCollection(currentUser.uid, {
                name: text,
                createdAt: new Date().toLocaleDateString(),
                user: currentUser.uid,
                numberOfPins: 0
            })
        }
        setText('');
        closeWindow();
    };

    const closeWindow = (e) => {
        let item = document.querySelector('.createCollScreen')
        item.classList.remove('visible');
        console.log(e)
    };
    
    return(
        <ModalContainer name='createCollScreen'>
            {
                nameAlreadyInUse && <ErrorMessage>Name already in use</ErrorMessage>
            }
            <InputField
                value={text}
                inputType='text' 
                inputName='nameOfColl' 
                labelText='name of collection' 
                handleChange={e => handleText(e)}
            />
            
            <StandardBtn disabled={nameAlreadyInUse} onClick={() => createColl()}>Create collection</StandardBtn>
        </ModalContainer>
    )
}

export default CreateCollScreen;