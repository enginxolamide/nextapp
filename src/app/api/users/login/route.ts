import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    /* -------------------------------------------------------------------------- */
    //NOTE: check if user exist
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    /* -------------------------------------------------------------------------- */
    //NOTE: check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword) {
    //     console.log("failed: wrong email or password")
    //   return NextResponse.json(
    //     { error: "Invalid Password" },
    //     { status: 400 }
    //   );
    // }

    /* -------------------------------------------------------------------------- */
    //NOTE: create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    /* -------------------------------------------------------------------------- */
    //NOTE: create token with tokenData, token secret , and expiration time
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    //NOTE: create an HTTP response object with a JSON body
    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });

    /* -------------------------------------------------------------------------- */
    //NOTE: store the token in cookie of the browser and make it secure against (XSS) by making it httpOnly
    response.cookies.set("token", token, {
      httpOnly: true,

    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
