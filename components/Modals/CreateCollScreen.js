import React, { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { checkIfCollectionExistsByName, addCollection } from '../../helpers/firebaseHelpers';
import ModalContainer from '../ModalContainer';
import CloseBtn from '../Buttons/CloseBtn';
import { StandardBtn } from '../Buttons/StandardBtn';
import InputField from '../FormComponents/InputField';


const CreateCollScreen = () => {

    const { currentUser } = useAuth()
    const [text, setText] = useState('');
    const [nameAlreadyInUse, setNameAlreadyInUse] = useState(false);

    const closeWindow = () => {
        let item = document.querySelector('.createCollScreen')
        item.classList.toggle('visible');
    };

    useEffect(async () => {
        if(text.length > 1) {
            let foundCollWithSameName = await checkIfCollectionExistsByName(currentUser.uid, text)
            setNameAlreadyInUse(foundCollWithSameName)
        }
    }, [text])

    const handleText = (e) => {
        setText(e.target.value)
    };

    const createColl = async () => {
        addCollection(currentUser.uid, {
                name: text,
                createdAt: new Date().toLocaleDateString(),
                user: currentUser.uid
            })
        closeWindow();
        setText('');
    };
    
    return(
        <ModalContainer name='createCollScreen'>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            {
                nameAlreadyInUse && <p>Name already in use</p>
            }
            <InputField 
                inputType='text' 
                inputName='nameOfColl' 
                labelText='name of collection' 
                handleChange={e => handleText(e)} 
            />
            
            <StandardBtn disabled={nameAlreadyInUse} onClick={createColl}>Create coll</StandardBtn>
        </ModalContainer>
    )
}

export default CreateCollScreen;