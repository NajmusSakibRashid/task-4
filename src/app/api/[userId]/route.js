import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export async function PUT(request, { params }) {
  try {
    const { status, selected } = await request.json();
    // console.log({status,selected})
    const token = cookies(request).get("token").value;
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    // console.log(params.userId)
    if (user.id != params.userId) {
      throw new Error("Unauthorized");
    }
    const { rows } = await sql`select * from users`;
    for (let record of rows) {
      // console.log(record)
      if (selected[record.id]) {
        await sql`update users set status=${status} where id=${record.id}`;
      }
    }
    const { rows: db_user } =
      await sql`select * from users where id=${params.userId}`;
    // console.log(db_user);
    if (!db_user[0] || db_user[0].status == 0) {
      throw new Error("You have blocked yourself");
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    // console.log(err)
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const selected = await request.json();
    // console.log('body',selected)
    const token = cookies(request).get("token").value;
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    // console.log(user)
    if (user.id != params.userId) {
      throw new Error("Unauthorized");
    }
    // console.log('we are here')
    const { rows } = await sql`select * from users`;
    for (let record of rows) {
      if (selected[record.id]) {
        await sql`delete from users where id=${record.id}`;
      }
    }
    const { rows: db_user } =
      await sql`select * from users where id=${params.userId}`;
    if (!db_user[0] || db_user[0].status == 0) {
      throw new Error("You have deleted yourself");
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    // console.log(err)
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}
