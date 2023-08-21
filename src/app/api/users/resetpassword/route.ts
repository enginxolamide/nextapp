/* --------------------------------- my process -------------------------------- */

// - create a forgot password page ~ request email and post to reset password API
// - check find the user exist in the DB via email.
// - the emailer will then send a token to the user and also initialize the forgot password variables in schema
// - when the user clicks on the link the user will then fill in the new password and a confirm password which i will verify in client side
// - the client will then send me the token, password, and confirm-password to the reset password API
// - before getting user data and updating the new the user database using the token,
// - i need to verify that the password and confirm password are same and then hashed the new password

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { input, token } = reqBody;
    // console.log(reqBody)

    /* -------------------------------------------------------------------------- */
    //NOTE - verify passwords are valid and token is present 
    if (
      !input.password ||
      !input.confirmPassword ||
      !token ||
      input.password !== input.confirmPassword
    ) {
      console.log("error 😥");
      return NextResponse.json(
        { error: "Password is not valid" },
        { status: 400 }
      );
    }


    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    // /* -------------------------------------------------------------------------- */
    // //NOTE: create a new hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.input.password, salt);
  
    user.password = hashedPassword;
    //NOTE - clear the forgot password token
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    
    await user.save();

    console.log("password changed successfully 👌🏽", user._id);
    NextResponse.json(
      {
        status: "success",
        message: "password changed successfully 👌🏽",
        userId: user._id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}
