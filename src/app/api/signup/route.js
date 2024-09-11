import {getConnection} from '../../utils/db';
import {NextResponse} from 'next/server';
import crypto from 'crypto';

export async function POST(request)  {

    try{
        const pool=await getConnection();
        const {username,email,password}=await request.json();
        const hash=crypto.createHmac('sha256',process.env.NEXT_PUBLIC_SECRET_KEY).update(password).digest('hex');
        // console.log(hash);
        await pool.request().query(`insert into users (name,email,password,registration_time,status) values ('${username}','${email}','${hash}',current_timestamp,1)`);
        return NextResponse.json({message:'Signup successful'},{status:200});
    }
    catch(err){
        // console.log(err);
        return NextResponse.json({message:err.message},{status:500});
    }

}