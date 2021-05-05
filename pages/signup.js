import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { object, string, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import { StyledForm } from '../components/StyledForm';
import { FormBtn } from '../components/Buttons/FormBtn';
import { readUsers } from '../helpers/firebaseHelpers';
import { readUsersCollections } from '../helpers/firebaseHelpers';

const SignUp = () => {

    const schema = object().shape({
        email: string().required(),
        password: string().min(6, 'Password must be at least 6 characters').max(15).required(),
        confirmPassword: string().oneOf([ref('password')], 'Passwords must match')
    })

    const { signup, currentUser, isAuthenticated } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setError('')
            setLoading(true)
            const user = await signup(data.email, data.password)
            // console.log('SUCCESS!!', user.user.email)
            const users = await readUsers();
            users.doc(user.user.uid).set({
                email: user.user.email,
                id: user.user.uid,
                signedUp: new Date().toLocaleDateString()
            })
            router.push('/login')
        } catch (error) {
            setError('Failed to create account', error)
            console.log(error)
        }
        setLoading(false)
    }

    return(
        <main>
            {errors.confirmPassword && <p>{errors.confirmPassword.message }</p>}
            {errors.password && <p>{errors.password.message }</p>}
            {error}
            <StyledForm
                onSubmit={handleSubmit(onSubmit)}
            >
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
                <InputField 
                    inputName='confirmPassword'
                    inputType='password'
                    labelText='Confirm password:'
                    register={register}
                />
                <FormBtn type='submit'>Log In</FormBtn>
            </StyledForm>
        </main>

    )
}

export default SignUp;