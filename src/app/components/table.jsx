'use client'

import Selector from '../components/selector';
import { useState } from 'react';


export default ({ children }) => {
    const [selected, setSelected] = useState({});
    return (
        <table>
            <thead>
                <tr>
                    <th><Selector id={-1} setSelected={setSelected} /></th>
                    <th className='p-2 border-solid border-black border-2'>Id</th>
                    <th className='p-2 border-solid border-black border-2'>Name</th>
                    <th className='p-2 border-solid border-black border-2'>Email</th>
                    <th className='p-2 border-solid border-black border-2'>Created At</th>
                    <th className='p-2 border-solid border-black border-2'>Last Login Time</th>
                </tr>
            </thead>
            <tbody>
                {children.map((user) => (
                    <tr key={user.id}>
                        <td><Selector id={user.id} setSelected={setSelected} /></td>
                        <td className={`${selected[user.id] || selected[-1] ? 'text-white bg-blue-600' : 'text-black'} p-2 border-solid border-black border-2`}>{user.id}</td>
                        <td className={`${selected[user.id] || selected[-1] ? 'text-white bg-blue-600' : 'text-black'} p-2 border-solid border-black border-2`}>{user.name}</td>
                        <td className={`${selected[user.id] || selected[-1] ? 'text-white bg-blue-600' : 'text-black'} p-2 border-solid border-black border-2`}>{user.email}</td>
                        <td className={`${selected[user.id] || selected[-1] ? 'text-white bg-blue-600' : 'text-black'} p-2 border-solid border-black border-2`}>{user.registration_time?.toString().substr(4, 20)}</td>
                        <td className={`${selected[user.id] || selected[-1] ? 'text-white bg-blue-600' : 'text-black'} p-2 border-solid border-black border-2`}>{user.last_login_time?.toString().substr(4, 20)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}