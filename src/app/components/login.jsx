'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

function Login(props) {
    const router = useRouter();

    const [loginInfo, setLoginInfo] = useState({});

    const handleChange = (e) => {
        setLoginInfo(loginInfo => ({ ...loginInfo, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data:{message,user,token},status } = await axios.post('/api/login', loginInfo);
            // set the token as cookie
            document.cookie = `token=${token}`;
            alert(message);
            router.push(`/${user.id}`);
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    }

    return (
        <div className='bg-orange-400 p-4 rounded-md flex flex-col justify-center gap-2'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <form className='flex flex-col gap-4 mt-4'>
                <input type='text' placeholder='Email' className='p-2 rounded-md' name='email' onChange={(e) => handleChange(e)} required />
                <input type='password' placeholder='Password' className='p-2 rounded-md' name='password' onChange={(e) => handleChange(e)} required />
                <button className='bg-blue-400 p-2 rounded-md text-white' onClick={(e) => handleSubmit(e)}>Login</button>
            </form>
            <p>
                Don't have an account? <a href='/signup' className='text-blue-400'>Sign up</a>
            </p>
        </div>
    );
}

export default Login;