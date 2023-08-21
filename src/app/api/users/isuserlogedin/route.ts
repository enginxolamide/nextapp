import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value

    if (token) {
        return NextResponse.json({
          message: "Token retrieved successfully",
          token:token,
        });
       
      } else {
        return NextResponse.json({
          message: "Token not found in cookies",
        });
      }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error retrieving token",
        error: error.message,
      },
      { status: 500 }
    );
  }
}