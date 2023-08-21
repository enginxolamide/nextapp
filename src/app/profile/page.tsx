"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


export default function ProfilePage() {
interface UserData{
  username: String,
  email: String,
  isVerified: Boolean,
  id: String
}

  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [data, setData] = useState<UserData>({
    username: '',
    email: '',
    isVerified: false,
    id: '',
  });


  const getUsertoken = async () => {
    try {
      const res = await axios.get("/api/users/isuserlogedin");
      const me =  res.data
     console.log(me.value)

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => getUsertoken(), []);



  const logout = async () => {
    try {
      await axios.get("../api/users/logout");
      toast.success("Logged Out");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUsersDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.user);

     console.log(data.email)

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

const getVerified = async()=>{
  try {
    console.log("get verified function called ")
    setSending(true);
    const res = await axios.post("/api/users/getexistuserverified", {email: data.email});
        console.log("Success", res.data);
    toast.success("verification link sent successfully!");
    window.location.reload();
  } catch (error: any) {
    console.log("failed", error.message);
    toast.error(error.message);
  } finally {
    setSending(false);
  }
};


  useEffect(() => {
    getUsersDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div
        className="flex absolute -z-10 w-screen min-h-screen bg-cover"
        style={{ backgroundImage: `url("/bg.png")` }}
      ></div>
      <h1 className="text-center w-full text-white font-semibold text-2xl">My Profile</h1>
      <hr />
      <div className="rounded border border-white p-2 mt-6">
        {data.email === "" ? 
          "Searching for your data"
        : 
          <div>
            <div className="mb-4 border-b">
              <h2 >Data received ❤️😎❤️</h2>
            </div>
            <p className="bg-[#ffffff52] w-full py-1 px-2 mb-2">
              <Link  href={`/profile/${data.username}`}> Name: {data.username.toUpperCase()}</Link>
            </p>
            <p className="bg-[#ffffff52] w-full py-1 px-2 mb-2 ">
              <Link href={`/profile/${data.email}`}> Email: {data.email}</Link>
            </p>
            <p className="bg-[#ffffff52] w-full py-1 px-2 ">
              Verified: {data.isVerified=== false || sending === false?
              <span>You are not verified; <br />  
                <a className="font-italic underline text-blue-300 " onClick={getVerified}>
                  Get verified now!</a></span>
                  : {sending} ?
                <span>Sending verification email...</span>: "Verification link sent "}
            </p>
          </div>
        }
      </div>
      <hr />
    
      <button
        onClick={logout}
        className=" mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
