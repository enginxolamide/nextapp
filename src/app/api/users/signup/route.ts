import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    let { username, email, password } = reqBody;

    /* -------------------------------------------------------------------------- */
    //NOTE: Check if email already exist in the Database
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    /* -------------------------------------------------------------------------- */
    //NOTE:  if email don't exist; hash password in req.body
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    password = hashPassword;

    /* -------------------------------------------------------------------------- */
    //NOTE: save user credentials into database
    const newUser = new User({
      username,
      email,
      password,
    });
    const savedUser = await newUser.save();
    // console.log("message : "+ savedUser);

    /* -------------------------------------------------------------------------- */
  /* --------------------------- Send verification email ---------------------------*/
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "from here ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
