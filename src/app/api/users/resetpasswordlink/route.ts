import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(req: NextRequest) {
 
    try {
    const reqBody = await req.json();
    const { email } = reqBody;
 
 
    /* -------------------------------------------------------------------------- */
    //NOTE: check if user exist
    const user = await User.findOne({ email });
    console.log('👌🏽  user:', user);

  
    if (!user) {
      console.log("User does not exists" )
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }
     
    await sendEmail({ email, emailType: "RESET", userId: user._id });
  console.log("Mail send successfully 👌🏽", user._id )

    
  return NextResponse.json(
    {
      message: "Reset password link is sent",
      success: true,
     },
    { status: 200 }
  );

  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}



