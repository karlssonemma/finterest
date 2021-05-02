import React from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import HeartBtn from '../components/Buttons/HeartBtn';

const SelectCollection = () => {
    
    const collections = [{name: 'my coll1', id: '1'}, {name: 'my coll2', id: '2'}]
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register('collectionId')}>
                {collections && collections.map(coll => {
                    return(
                        <option value={coll.id}>{coll.name}</option>
                    )
                })}
            </select>
            <HeartBtn />
        </form>
    )
}

export default SelectCollection;