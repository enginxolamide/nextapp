import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
  
    /* -------------------------------------------------------------------------- */
    //NOTE - find a user based on the token and who's time is greater than now
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 400 });
    }
    console.log("before isVerified",user.isVerified)
    /* -------------------------------------------------------------------------- */
    //NOTE - update the user to set isVerified to true then save
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    console.log("after isVerified",user.isVerified)

    return NextResponse.json({ message: "User Verified" }, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
