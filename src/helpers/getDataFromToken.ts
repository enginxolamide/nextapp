import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
  try {
    /* -------------------------------------------------------------------------- */
    //NOTE - get the token from cookies
    const token = req.cookies.get("token")?.value || "";
    /* -------------------------------------------------------------------------- */
    //NOTE - decode the token using Jwt
    const decodedToken: any = Jwt.verify(token, process.env.TOKEN_SECRET!);
    //NOTE - return user Id
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
