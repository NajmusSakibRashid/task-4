'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Signup() {

    const router=useRouter();

    const [signupInfo, setSignupInfo] = useState({});

    const handleChange = (e) => {
        setSignupInfo(signupInfo => ({ ...signupInfo, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (signupInfo.password !== signupInfo.confirmPassword) {
                throw new Error('Passwords do not match');
            }
            const { data, status } = await axios.post('/api/signup', signupInfo);
            alert(data.message);
            router.push('/');
        }catch(err){
            alert(err.response?.data?.message || 'An error occurred');
        }
        
    }

    return (
        <div className='flex flex-col gap-2 p-4 justify-center bg-orange-400 rounded-md'>
            <h1 className='text-3xl font-bold text-center'>Signup</h1>
            <form className='flex flex-col gap-4 mt-4'>
                <input type='text' placeholder='Username' className='p-2 rounded-md' name='username' onChange={(e) => handleChange(e)} required />
                <input type='email' placeholder='Email' className='p-2 rounded-md' name='email' onChange={(e) => handleChange(e)} required />
                <input type='password' placeholder='Password' className='p-2 rounded-md' name='password' onChange={(e) => handleChange(e)} required />
                <input type='password' placeholder='Confirm Password' className='p-2 rounded-md' name='confirmPassword' onChange={(e) => handleChange(e)} required />
                <button className='bg-blue-400 p-2 rounded-md text-white' onClick={(e) => handleSubmit(e)}>Signup</button>
            </form>
        </div>
    );
}

export default Signup;