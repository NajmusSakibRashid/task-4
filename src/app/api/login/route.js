import { NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const hash = crypto
      .createHmac("sha256", process.env.NEXT_PUBLIC_SECRET_KEY)
      .update(password)
      .digest("hex");
    const { rows } =
      await sql`select * from users where email=${email} and password=${hash}`;
    // console.log(`select * from users where email='${email}' and password='${hash}'`)
    // console.log(rows);
    if (rows.length === 1 && rows[0].status) {
      await sql`update users set last_login_time=now() where email=${email}`;
      const token = jwt.sign(rows[0], process.env.NEXT_PUBLIC_SECRET_KEY, {
        expiresIn: "1h",
      });
      return NextResponse.json(
        { message: "Login successful", user: rows[0], token },
        { status: 200 }
      );
    } else {
      throw new Error("Invalid credentials or access denied");
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
