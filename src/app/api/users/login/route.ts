import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
connect();

export async function POST( req: NextRequest){
    try {
        const reqBody = await req.json()
        const {email, password} = reqBody;
        console.log(reqBody)

       //check if user already exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    //check if the password is correct 
    const validPassword = await bcrypt.compare(password,user.password)
    // if (!validPassword) {
    //     console.log("failed: wrong email or password")
    //   return NextResponse.json(
    //     { error: "Invalid Password" },
    //     { status: 400 }
    //   );
    // }

    //create token data
    const tokenData ={
        id:user._id,
        username: user.username,
        email:user.email
        }

    //create token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        //set token in users cookie
        const response = NextResponse.json({
            message: "login successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message },{status: 500})
    }
}