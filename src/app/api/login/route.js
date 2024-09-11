import { NextResponse } from "next/server";
import { getConnection } from "../../utils/db";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const pool = await getConnection();
    const { email, password } = await request.json();
    const hash=crypto.createHmac('sha256',process.env.NEXT_PUBLIC_SECRET_KEY).update(password).digest('hex');
    const { recordset } = await pool.request().query(`select * from users where email='${email}' and password='${hash}'`);
    if (recordset.length === 1) {
      await pool.request().query(`update users set last_login_time=current_timestamp where email='${email}'`);
      const token=jwt.sign(recordset[0],process.env.NEXT_PUBLIC_SECRET_KEY,{expiresIn:'1h'});
      return NextResponse.json({ message: "Login successful",user:recordset[0],token},{status:200});
    }
    else{
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: error.message },{status:500});
  }
}