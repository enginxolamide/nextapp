"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { NextResponse } from "next/server";

export default function Signup() {
  const router = useRouter();
  console.log(router);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
     await axios.post("/api/users/signup", user);
      // console.log("Success", response.data)
    
      router.push("/login");

     return  NextResponse.json({
        status: "Success",
        message: "Successfully signed up",
      },{status: 200});

    } catch (error: any) {
      // console.log("failed on signup page", error.message)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
 <div className="flex absolute -z-10 w-screen min-h-screen bg-cover" style={{backgroundImage: `url("/bg.png")`}}>
         
         </div>


<div className="flex flex-col  shadow-lg  justify-center min-w-[300px] w-2/12  m-16 bg-white py-4 px-2 rounded-lg">
      <h1 className="text-center w-full text-black font-semibold text-2xl">
        {loading ? "Processing..." : "Sign Up"}
      </h1>
      <hr />
      <div className="mx-2 mt-4">
      {/* <label htmlFor="username">username</label> */}
      <input
            className=" p-4 border w-full hover:border-green-800  text-black border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
            type="text"
        id="UserName"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      {/* <label htmlFor="email">email</label> */}
      <input
            className=" p-4 border w-full hover:border-green-800  text-black border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
            type="text"
        id="UserName"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      {/* <label htmlFor="password">password</label> */}
      <input
        className=" p-4 border w-full hover:border-green-800  text-black border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="UserName"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onSignup} disabled={buttonDisabled}
        className="p-2 border w-full hover:border-b-4 hover:bg-green-700 bg-green-600 disabled:border disabled:opacity-30 border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
        >
        {buttonDisabled ? "..." : "Sign Up"}
      </button>
</div>
      <Link className=" text-black"  href="/login">Go back to <b>login</b></Link>
      </div>
    </div>
  );
}
