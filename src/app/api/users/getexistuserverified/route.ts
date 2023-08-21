import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
     let {email} = reqBody;
 
     /* -------------------------------------------------------------------------- */
     //NOTE: Check if email already exist in the Database
     const user = await User.findOne({ email });
 
     await sendEmail({ email, emailType: "VERIFY", userId: user._id });
     return NextResponse.json({ message: "Email Sent" });
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