import React from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getConnection } from '../utils/db';
import Table from '../components/table';
import Logout from '../components/logout';
import { redirect } from 'next/navigation';

const Page = async ({ params: { userId } }) => {
    try {
        const token = cookies().get('token')?.value;
        const user = (token ? jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY) : {});
        if (user.id != userId) {
            throw new Error('Unauthorized');
        }
    } catch (err) {
        if (err.message === 'Unauthorized') {
            redirect('/');
        }
    }
    const pool = await getConnection();
    const { recordset } = await pool.request().query(`select * from users`);
    // console.log(recordset)
    return (
        <div className='fixed flex inset-0 justify-start md:justify-center items-start overflow-auto mt-20'>
            <Logout />
            <Table>
                {recordset}
            </Table>
        </div>
    );
};

export default Page;