import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, username } = await req.json();

    // all fields are required
    if (!name || !email || !password || !username) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await makeSureDbIsReady();

    // check if user with the same email/username exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "This E-Mail is already taken. Please try with another one." },
        { status: 409 }
      );
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        return NextResponse.json(
        { error: "This username is already taken." },
        { status: 409 }
     );
    }
    
    // if not, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const normalizedEmail = email.toLowerCase().trim();

    // create a new user into db
    await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      username,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}