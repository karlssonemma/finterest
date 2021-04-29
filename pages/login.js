import React from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import InputField from '../components/InputField';
import { StyledForm } from '../components/StyledForm';

const LogIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({

    })

    const onSubmit = async (data) => {
        console.log(data);
    }

    return(
        <main>
            <StyledForm>
                <InputField 
                    inputName='email'
                    inputType='email'
                    labelText='Email:'
                    register={register}
                />
                <InputField 
                    inputName='password'
                    inputType='password'
                    labelText='Password:'
                    register={register}
                />
            </StyledForm>
        </main>

    )
}

export default LogIn;