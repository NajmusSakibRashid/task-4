import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    const hash = crypto
      .createHmac("sha256", process.env.NEXT_PUBLIC_SECRET_KEY)
      .update(password)
      .digest("hex");
    // console.log(hash);
    await sql`insert into users (name,email,password,registration_time,status) values (${username},${email},${hash},now(),true)`;
    return NextResponse.json({ message: "Signup successful" }, { status: 200 });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
