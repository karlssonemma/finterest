import React, { useState } from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

import InputField from '../components/InputField';
import { StyledForm } from '../components/StyledForm';
import { FormBtn } from '../components/Buttons/FormBtn';

const LogIn = () => {

    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setError('')
            setLoading(true)
            const user = await login(data.email, data.password)
            console.log('SUCCESSful login!!', user.user.email)
            router.push('/home')
        } catch (error) {
            setError('Failed to log in', error)
            console.log(error)
        }
        setLoading(false)
    }

    return(
        <main>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                {error && <p>{error}</p>}
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
                <FormBtn typ='submit'>Log in</FormBtn>
            </StyledForm>
        </main>

    )
}

export default LogIn;