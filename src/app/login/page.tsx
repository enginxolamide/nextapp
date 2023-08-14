"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";



export default function LoginPage() {
  const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
       });

       const[buttonDisabled, setbuttonDisabled]= useState(false)
       const[loading, setLoading]= useState(false)
      const onLogin = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/login",user)
          console.log("Success", response.data)
          toast.success('Log in successful!')
          router.push("/profile")


        }  catch (error: any) {
          console.log("failed", error.message)
          toast.error(error.message)
        }finally{
          setLoading(false)
        }
        
      };


    useEffect(()=>{
      if (user.email.length > 0 && user.password.length>0){
        setbuttonDisabled(false);
      }else{
        setbuttonDisabled(true)
      }


    },[user])
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-center text-white text-2xl">{loading? "Processing...":"Log in"}</h1>
          <hr />
    
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
            type="text"
            id="UserName"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
    
          <button
            onClick={onLogin}
            className="p-2 border  border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Login here
          </button>
    
          <Link href="/signup">visit signup</Link>
        </div>
      );
}