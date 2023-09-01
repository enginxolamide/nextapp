import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  /* -------------------------------------------------------------------------- */
  // NOTE: public routes
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail"||
    path === "/forgotpassword";

  console.log("❤️  -Middleware"); // Make sure this log is intended

  /* -------------------------------------------------------------------------- */
  // NOTE: verify if the user has a token in its cookies
  const token = request.cookies.get("token")?.value;

  if (isPublicPath && token) {
    // If user has a token and is trying to access a public path, redirect to home
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // If user doesn't have a token and is trying to access a private path, redirect to login
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If none of the above conditions are met, continue processing the request
  return null;
}

// See "Matching Paths"
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/verifyemail","/forgotpassword"],
};
