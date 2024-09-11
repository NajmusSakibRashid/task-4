import React from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getConnection } from '../utils/db';
import Table from '../components/table';

const Page = async ({ params: { userId } }) => {
    const token = cookies().get('token').value;
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    if (user.id != userId) {
        return <h1>Unauthorized</h1>
    }
    const pool = await getConnection();
    const { recordset } = await pool.request().query(`select * from users`);
    // console.log(recordset)
    return (
        <div className='fixed flex inset-0 justify-center items-center'>
            <Table>
                {recordset}
            </Table>
        </div>
    );
};

export default Page;