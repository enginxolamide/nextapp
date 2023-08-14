"use client";

import Link from "next/link";
import {useRouter}  from "next/navigation";
import axios  from "axios";
import { useState, useEffect } from "react";
import {toast} from "react-hot-toast";

export default function signup() {
  const router = useRouter()
  console.log(router)
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setbuttonDisabled]= useState(false)
const[loading, setLoading]= useState(false)

  const onSignup = async () => {
try {
  setLoading(true);
  const response = await axios.post("/api/users/signup",user)
  console.log("Success", response.data)
  router.push("/login")

} catch (error: any) {
  console.log("failed", error.message)
  toast.error(error.message)
}finally{
  setLoading(false)
}

  };

useEffect(()=>{
  if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
    setbuttonDisabled(false)
  }else{ setbuttonDisabled(true)}
}, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-white text-2xl">{loading? "Processing...":"Sign Up"}</h1>
      <hr />

      <label htmlFor="username">username</label>
      <input
        className="p-4 border text-black font-bold border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="UserName"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        className="p-4 border  text-black font-bold border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="UserName"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-4 border  text-black font-bold border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="UserName"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onSignup}
        className="p-2 border  border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
       {buttonDisabled ? "No signup" : "Sign Up"}
      </button>

      <Link href="/login">visit login</Link>
    </div>
  );
}
