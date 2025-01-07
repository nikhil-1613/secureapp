"use client"

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"

export default function SingUpPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const handleSignup = async () => {
        try {
            setButtonDisabled(true); // Disable button during request

            const response = await axios.post("/api/users/signup", {
                email,
                password,
            });

            if (response.status === 201 || response.data.success) {
                toast.success("User registered successfully! Redirecting to login...", {
                    duration: 3000, // Show for 3 seconds
                });
                setIsRegistered(true); // Set registration success
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error || "Something went wrong. Please try again.";
            toast.error(errorMessage, {
                duration: 3000, // Show error for 3 seconds
            });
        } finally {
            setButtonDisabled(false); // Re-enable button
        }
    };

    useEffect(() => {
        if (isRegistered) {
            // Redirect to login page after successful registration
            const redirectTimeout = setTimeout(() => {
                router.push("/login");
            }, 3000); // 3-second delay for better user experience

            return () => clearTimeout(redirectTimeout); // Cleanup timeout
        }
    }, [isRegistered, router]);
    return(
        <div className="flex flex-col justify-center items-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-md">
            <h1 className="text-center text-white font-bold text-2xl mb-4">Sign Up</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSignup}
                disabled={buttonDisabled}
                className={`${
                    buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                } text-white font-semibold rounded w-full py-2 transition duration-300 mb-4`}
            >
                {buttonDisabled ? "Signing Up..." : "Sign Up"}
            </button>
            <Link href="/login" className="text-white text-center flex justify-center">
                Already have an account?
            </Link>
        </div>
        {/* Render Toast Container */}
        <Toaster />
    </div>

    )
}