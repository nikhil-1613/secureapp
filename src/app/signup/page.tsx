"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
     phoneNumber:"",
    workingLocation: "",
    shiftTimings: "",
   
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      setButtonDisabled(true);

      // Validate required fields before making the API call
      const missingFields = Object.entries(formData)
        .filter(([, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        toast.error(`Please fill all required fields: ${missingFields.join(", ")}`, {
          duration: 3000,
        });
        setButtonDisabled(false);
        return;
      }

      // Debugging: Log the form data before sending the request
      console.log("Form Data:", formData);

      const response = await axios.post("/api/users/signup", formData);
      if (response.status === 201 || response.data.success) {
        toast.success("User registered successfully! Redirecting to login...", {
          duration: 3000,
        });
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        toast.error(error.response.data.error, { duration: 3000 });
        console.error(error.response.data.error);
      } else if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.", {
          duration: 3000,
        });
        console.error(error.message);
      } else {
        toast.error("An unknown error occurred.", { duration: 3000 });
        console.error("An unknown error occurred.");
      }
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-center text-white font-bold text-2xl mb-4">Sign Up</h1>

        {/* User Name Input */}
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleInputChange}
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="=phone"
          name="phoneNumber"
          placeholder="PhoneNumber"
          onChange={handleInputChange}
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required

        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Working Location Input */}
        <input
          type="text"
          name="workingLocation"
          placeholder="Working Location"
          value={formData.workingLocation}
          onChange={handleInputChange}
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Shift Timings Input */}
        <input
          type="text"
          name="shiftTimings"
          placeholder="Shift Timings"
          value={formData.shiftTimings}
          onChange={handleInputChange}
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          disabled={buttonDisabled}
          className={`${
            buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold rounded w-full py-2 transition duration-300 mb-4`}
        >
          {buttonDisabled ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Link to Login Page */}
        <Link href="/login" className="text-white text-center flex justify-center">
          Already have an account?
        </Link>
      </div>
      <Toaster />
    </div>
  );
}


// "use client"

// import axios from "axios";
// import Link from "next/link"
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast"

// export default function SingUpPage(){
//     const router = useRouter();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [buttonDisabled, setButtonDisabled] = useState(false);
//     const [isRegistered, setIsRegistered] = useState(false);
//     const handleSignup = async () => {
//         try {
//             setButtonDisabled(true);

//             const response = await axios.post("/api/users/signup", {
//                 email,
//                 password,
//             });

//             if (response.status === 201 || response.data.success) {
//                 toast.success("User registered successfully! Redirecting to login...", {
//                     duration: 3000, 
//                 });
//                 setIsRegistered(true); 
//             }
//         } catch (error: any) {
//             const errorMessage =
//                 error.response?.data?.error || "Something went wrong. Please try again.";
//             toast.error(errorMessage, {
//                 duration: 3000, 
//             });
//         } finally {
//             setButtonDisabled(false); }
//     };

//     useEffect(() => {
//         if (isRegistered) {
//             const redirectTimeout = setTimeout(() => {
//                 router.push("/login");
//             }, 3000);

//             return () => clearTimeout(redirectTimeout); 
//         }
//     }, [isRegistered, router]);
//     return(
//         <div className="flex flex-col justify-center items-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
//         <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-md">
//             <h1 className="text-center text-white font-bold text-2xl mb-4">Sign Up</h1>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
            
//             <button
//                 onClick={handleSignup}
//                 disabled={buttonDisabled}
//                 className={`${
//                     buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//                 } text-white font-semibold rounded w-full py-2 transition duration-300 mb-4`}
//             >
//                 {buttonDisabled ? "Signing Up..." : "Sign Up"}
//             </button>
//             <Link href="/login" className="text-white text-center flex justify-center">
//                 Already have an account?
//             </Link>
//         </div>
//         <Toaster />
//     </div>

//     )
// }