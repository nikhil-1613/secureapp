"use client"; // This marks the component as a Client Component

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // To handle navigation
import { toast } from "react-hot-toast"; // To display toast notifications
import axios from "axios"; // To make HTTP requests

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false); // To disable button during login
    const router = useRouter(); // Hook for navigation

    const handleLogin = async () => {
        try {
            setButtonDisabled(true); // Disable the button to prevent multiple clicks

            // Make the API request for login
            const response = await axios.post("/api/users/login", {
                email,
                password,
            });

            // If login is successful, show success toast
            toast.success("Login successful! Redirecting to profile...");

            // Store the JWT token in localStorage or sessionStorage
            // Use sessionStorage instead of localStorage for better security if it's sensitive
            localStorage.setItem("token", response.data.token);

            // Redirect to the profile page
            router.push("/profile");

        } catch (error: any) {
            // Handle login error and display error toast
            console.log("Login failed", error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || "Login failed! Please try again.");
        } finally {
            setButtonDisabled(false); // Re-enable the button after the request completes
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-center text-white font-bold text-2xl mb-4">Login</h1>
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
                    onClick={handleLogin}
                    disabled={buttonDisabled}
                    className={`${
                        buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    } text-white font-semibold rounded w-full py-2 transition duration-300 mb-4`}
                >
                    {buttonDisabled ? "Logging in..." : "Login"}
                </button>
                <Link href="/signup" className="text-white text-center flex justify-center">
                    Don&apos;t have an account? Sign up here
                </Link>
            </div>
        </div>
    );
}

