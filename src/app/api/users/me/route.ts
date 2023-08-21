import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
  try {
    /* -------------------------------------------------------------------------- */
    //NOTE - put the userID to use
    const userID = await getDataFromToken(request);
    //NOTE - Get all user data except the (password)
    const user = await User.findById(userID).select("-password");
    return NextResponse.json({
      status: "User Found!",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
