import React from 'react';
import Signup from '../components/signup.jsx';

function Page(props) {
    return (
        <div className='fixed flex inset-0 justify-center items-center'>
            <Signup/>
        </div>
    );
}

export default Page;