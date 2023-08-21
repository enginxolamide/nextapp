import { NextResponse } from "next/server";

export async function GET() {
  try {
    /* -------------------------------------------------------------------------- */
    // This code creates an HTTP response with JSON data indicating a successful logout, then clears the "token" cookie with immediate expiration for enhanced security.
    /* -------------------------------------------------------------------------- */

    //NOTE: create an HTTP response object with a JSON body
    const response = NextResponse.json({
      message: "logout successful",
      success: true,
    });
    
    //NOTE: clear the token in the value of token in the cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
