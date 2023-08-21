"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getURL } from "next/dist/shared/lib/utils";


// import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Success", response.data);
      toast.success("Log in successful!");
      router.push("/profile");
    } catch (error: any) {
      console.log("failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center relative min-h-screen ">
    
      <div className="flex absolute z-10 w-screen min-h-screen  bg-cover  bg-black opacity-60 ">
      </div>
      <div className="flex absolute  w-screen min-h-screen   bg-cover  " style={{backgroundImage: `url("bg.png")`}}>
      </div>
      

      <div className="flex flex-col  shadow-lg z-10 justify-center min-w-[300px] w-2/12  m-16 bg-white py-4 px-2 rounded-lg">
        <h1 className="text-center w-full text-black font-semibold text-2xl">
          {loading ? "Processing..." : "Log in"}
        </h1>
        <hr />
        {/* <label htmlFor="email">email</label> */}
        <div className="mx-2 mt-4">
          <input
            className="p-4 border w-full hover:border-green-800  text-black border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="UserName"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
          {/* <label htmlFor="password">password</label> */}
          <input
            className=" p-4 border w-full hover:border-green-800  text-black border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="UserName"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className="p-2 border w-full hover:border-b-4 hover:bg-green-700 bg-green-600 disabled:border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
          >
            Login here
          </button>
        </div>
        <div>
          <Link className="font-bold text-blue-600" href="/signup">Create an account</Link> <br /><span className="mx-2 text-gray-400">|</span>
          <Link className=" text-black" href="/forgotpassword">Forgot password?</Link>
        </div>
        <p className="text-black font-mono text-xs pt-4 ">The credit for this entire work goes to <br /><em>Hitesh Choudhary</em></p>
      </div>
    </div>
  );
}
