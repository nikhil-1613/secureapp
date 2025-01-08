


"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  // Fetch user details
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setData("Error fetching user details");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log(res.data);
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out"); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <button
        onClick={getUserDetails}
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
      <button
        onClick={logout}
        className="mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <div className="mt-5">
        {typeof data === "object" ? JSON.stringify(data, null, 2) : data}
      </div>
    </div>
  );
}
