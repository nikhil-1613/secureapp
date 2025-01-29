"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa"; // Import bars icon from react-icons
import axios from "axios";
interface Requirement{
    name: string;
    location: string;
    Date: Date;
    shift: string;
    shiftTimings: string;
    Purpose: string;
    staffRequired: number;
    address: string;
    // acceptedGuards can be added later as per your use case
    // acceptedGuards?: string[]; // Example if you want to store an array of guards' names or IDs
}
export default function HomePage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [requirements, setRequirements] = useState<Requirement[]>([]); // Ensure it's an array
    const router = useRouter();

    // Check if the user is logged in
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get("/api/auth/status");
                setIsLoggedIn(response.data.isLoggedIn);
            } catch (error) {
                console.error("Failed to fetch login status", error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    
    // Fetch requirements from the API
    const fetchRequirements = async () => {
        try {
            const response = await axios.get("/api/admin/requirements");
            // Ensure the fetched data is an array
            if (Array.isArray(response.data.data)) {
                setRequirements(response.data.data);
            } else {
                console.error("Fetched data is not an array:", response.data.data);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("An error occurred:", error.response?.data.message || "No error message");

            }
            else {
                console.error("An error occurred:", error);
            }
        }
    };

    useEffect(() => {
        fetchRequirements();
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleSignupClick = () => {
        router.push("/signup");
    };

    const handleLoginClick = () => {
        router.push("/login");
    };

    const handleProfileClick = () => {
        router.push("/profile");
    };

    const handleSelect = async (requirementId: string) => {
        try {
          // Make a POST request to the API endpoint with the requirementId
          const response = await axios.post("/api/admin/requirements/select", {
            requirementId, // Dynamic requirement ID
          });
      
          // Log the response
          console.log("Guard successfully added:", response.data);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(
              "An error occurred:",
              error.response?.data?.error || "No error message"
            );
          } else {
            console.error("An unknown error occurred:", error);
          }
        }
      };
      
// const handleSelect = async (requirementId: string, guardDetails: { name: string; phoneNumber: number }) => {
//   try {
//     // Make a POST request to the API endpoint
//     const response = await axios.post("/api/admin/requirements/select", {
//       requirementId, // Pass the requirement ID
//       guardDetails,  // Include the guard details
//     });

//     // Log the response
//     console.log("Guard successfully added:", response.data);
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error(
//         "An error occurred:",
//         error.response?.data?.error || "No error message"
//       );
//     } else {
//       console.error("An unknown error occurred:", error);
//     }
//   }
// };

   
        const handleLogout = async () => {
        try {
            await axios.post("/api/users/logout"); // Adjust API endpoint
            setIsLoggedIn(false);
            router.push("/login"); // Redirect to home
        } catch (error) {
            console.error("Logout failed", error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Left: Website Title */}
                    <h1 className="text-2xl font-bold text-black">My Website</h1>

                    {/* Hamburger Menu for Small Screens */}
                    <button
                        className="sm:hidden text-gray-700 hover:text-black focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <FaBars className="w-6 h-6" />
                    </button>

                    {/* Center and Right: Navigation and Buttons */}
                    <nav
                        className={`${menuOpen ? "block" : "hidden"
                            } absolute top-16 left-0 w-full bg-white sm:static sm:w-auto sm:flex sm:items-center`}
                    >
                        <ul className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                            <li>
                                <a
                                    href="#home"
                                    className="block px-4 py-2 text-gray-700 hover:text-black"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="block px-4 py-2 text-gray-700 hover:text-black"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#Requirement"
                                    className="block px-4 py-2 text-gray-700 hover:text-black"
                                >
                                    Requirements
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={handleProfileClick}
                                    className="block px-4 py-2 text-gray-700 hover:text-black cursor-pointer"
                                >
                                    My Profile
                                </a>
                            </li>
                        </ul>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 sm:mt-0 px-4 sm:px-0">
                            {!isLoggedIn ? (
                                <>
                                    <button
                                        onClick={handleSignupClick}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        onClick={handleLoginClick}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2 sm:mt-0"
                                    >
                                        Login
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            {/* Home Section */}
            <section
                id="home"
                className="flex flex-col justify-center items-center min-h-screen py-16 bg-blue-500 text-white text-center"
            >
                <h2 className="text-4xl font-bold mb-4">Welcome to Secure Vision</h2>
                <p className="text-lg max-w-2xl">
                    Your trusted partner in advanced security solutions. At SecureVision, we prioritize safeguarding what matters most to you. Whether it’s personal security, business protection, or tailored surveillance, our expert services ensure you’re always in safe hands.
                </p>
            </section>

            {/* About Section */}
            <section
                id="about"
                className="flex flex-col items-center py-16 px-4 sm:px-8 bg-gray-200 text-gray-800"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
                <p className="text-lg max-w-4xl text-center leading-relaxed mb-6">
                    SecureVision was established with a mission to deliver cutting-edge security solutions to individuals and businesses alike. Our team comprises highly trained security professionals with years of experience in surveillance, risk assessment, and emergency response.
                </p>
                <ul className="text-lg max-w-3xl list-disc list-inside text-left space-y-2">
                    <li><strong>Advanced surveillance systems</strong> - Utilizing the latest technology for unmatched monitoring.</li>
                    <li><strong>24/7 monitoring and alert services</strong> - Always on guard to ensure your safety.</li>
                    <li><strong>Comprehensive risk assessments</strong> - Identifying vulnerabilities and minimizing risks.</li>
                    <li><strong>Customized security solutions</strong> - Tailored to meet your unique requirements.</li>
                </ul>
                <p className="text-lg max-w-3xl text-center mt-6 leading-relaxed">
                    At SecureVision, we believe that security is not just a service—it s a commitment. Our innovative technology and dedicated team work tirelessly to provide unmatched protection for your peace of mind.
                </p>
            </section>

            {/* Requirement Section */}
            <section
                id="requirement"
                className="flex flex-col items-center py-16 bg-white text-gray-800"
            >
                <h2 className="text-3xl font-bold mb-4">Today Requirements</h2>
                {requirements.length === 0 ? (
                    <p className="text-gray-500">No requirements available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {requirements.map((requirement: any) => {
                            const formattedDate = new Date(requirement.Date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            });

                            return (
                                <div
                                    key={requirement._id}
                                    className="bg-white p-4 rounded-lg shadow-md border"
                                >
                                    <h4 className="font-semibold">{requirement.name}</h4>
                                    {/* <p className="text-sm text-gray-600">Location: {requirement.location}</p> */}
                                    <p className="text-sm text-gray-600">Date: {formattedDate}</p>
                                    <p className="text-sm text-gray-600">Shift: {requirement.shift}</p>
                                    <p className="text-sm text-gray-600">Shift Timings: {requirement.shiftTimings}</p>
                                    <p className="text-sm text-gray-600">Purpose: {requirement.Purpose}</p>
                                    <p className="text-sm text-gray-600">Staff Required: {requirement.staffRequired}</p>
                                    <button
                                        onClick={() => window.open(requirement.location, "_blank")}
                                        className="bg-blue-500 text-white mt-4 rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 transition"
                                    >
                                        View Location
                                    </button>
                                    <button
                  onClick={() => handleSelect(requirement._id,  )}
                  className="bg-green-500 text-white mt-4 rounded-lg px-4 py-2 shadow-md hover:bg-green-600 transition"
                >
                  Select
                </button>
                                </div>
                            );
                        })}

                    </div>
                )}
            </section>

            {/* Footer */}
            <footer id="footer" className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    {/* Main Footer Text */}
                    <p className="text-sm mb-4">
                        © {new Date().getFullYear()} SecureVision. All rights reserved. Dedicated to your safety and security.
                    </p>

                    {/* Contact Us Section */}
                    <p className="text-sm mb-4">
                        Have questions or need assistance? Reach out to us at{" "}
                        <a href="mailto:support@securevision.com" className="text-blue-400 hover:underline">
                            support@securevision.com
                        </a>{" "}
                        or call{" "}
                        <a href="tel:+11234567890" className="text-blue-400 hover:underline">
                            +1 (123) 456-7890
                        </a>.
                    </p>

                    {/* Follow Us Section */}
                    <p className="text-sm mb-4">
                        Stay updated with the latest in security trends. Follow us on{" "}
                        <a href="#" className="text-blue-400 hover:underline">
                            Facebook
                        </a>,{" "}
                        <a href="#" className="text-blue-400 hover:underline">
                            Twitter
                        </a>, and{" "}
                        <a href="#" className="text-blue-400 hover:underline">
                            Instagram
                        </a>.
                    </p>
                </div>
            </footer>
        </div>
    );
}
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FaBars } from "react-icons/fa"; // Import bars icon from react-icons
// import axios, { AxiosError } from "axios";

// export default function HomePage() {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [requirements, setRequirements] = useState<any[]>([]); // Ensure it's an array
//     const router = useRouter();

//     // Fetch requirements from the API
//     const fetchRequirements = async () => {
//         try {
//             const response = await axios.get("/api/admin/requirements");
//             // Ensure the fetched data is an array
//             if (Array.isArray(response.data.data)) {
//                 setRequirements(response.data.data);
//             } else {
//                 console.error("Fetched data is not an array:", response.data.data);
//             }
//         } catch (error: unknown) {
//             if(axios.isAxiosError(error)) {
//                 console.error("An error occurred:", error.response?.data.message || "No error message");


//             }
//             else{
//                 console.error("An error occurred:", error);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchRequirements();
//     }, []);

//     const toggleMenu = () => setMenuOpen(!menuOpen);

//     const handleSignupClick = () => {
//         router.push("/signup");
//     };

//     const handleLoginClick = () => {
//         router.push("/login");
//     };

//     const handleProfileClick = () => {
//         router.push("/profile");
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Header */}
//             <header className="bg-white shadow-md sticky top-0 z-50">
//                 <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//                     {/* Left: Website Title */}
//                     <h1 className="text-2xl font-bold text-black">My Website</h1>

//                     {/* Hamburger Menu for Small Screens */}
//                     <button
//                         className="sm:hidden text-gray-700 hover:text-black focus:outline-none"
//                         onClick={toggleMenu}
//                     >
//                         <FaBars className="w-6 h-6" />
//                     </button>

//                     {/* Center and Right: Navigation and Buttons */}
//                     <nav
//                         className={`${menuOpen ? "block" : "hidden"
//                             } absolute top-16 left-0 w-full bg-white sm:static sm:w-auto sm:flex sm:items-center`}
//                     >
//                         <ul className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
//                             <li>
//                                 <a
//                                     href="#home"
//                                     className="block px-4 py-2 text-gray-700 hover:text-black"
//                                 >
//                                     Home
//                                 </a>
//                             </li>
//                             <li>
//                                 <a
//                                     href="#about"
//                                     className="block px-4 py-2 text-gray-700 hover:text-black"
//                                 >
//                                     About
//                                 </a>
//                             </li>
//                             <li>
//                                 <a
//                                     href="#dummy"
//                                     className="block px-4 py-2 text-gray-700 hover:text-black"
//                                 >
//                                     Dummy
//                                 </a>
//                             </li>
//                             <li>
//                                 <a
//                                     onClick={handleProfileClick}
//                                     className="block px-4 py-2 text-gray-700 hover:text-black cursor-pointer"
//                                 >
//                                     My Profile
//                                 </a>
//                             </li>
//                         </ul>
//                         <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 sm:mt-0 px-4 sm:px-0">
//                             <button
//                                 onClick={handleSignupClick}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                             >
//                                 Sign Up
//                             </button>
//                             <button
//                                 onClick={handleLoginClick}
//                                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2 sm:mt-0"
//                             >
//                                 Login
//                             </button>
//                         </div>
//                     </nav>
//                 </div>
//             </header>

//             {/* Home Section */}
//             <section
//                 id="home"
//                 className="flex flex-col justify-center items-center min-h-screen py-16 bg-blue-500 text-white text-center"
//             >
//                 <h2 className="text-4xl font-bold mb-4">Welcome to Secure Vision</h2>
//                 <p className="text-lg max-w-2xl">
//                     Your trusted partner in advanced security solutions. At SecureVision, we prioritize safeguarding what matters most to you. Whether it’s personal security, business protection, or tailored surveillance, our expert services ensure you’re always in safe hands.
//                 </p>
//             </section>

//             {/* About Section */}
//             <section
//                 id="about"
//                 className="flex flex-col items-center py-16 px-4 sm:px-8 bg-gray-200 text-gray-800"
//             >
//                 <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
//                 <p className="text-lg max-w-4xl text-center leading-relaxed mb-6">
//                     SecureVision was established with a mission to deliver cutting-edge security solutions to individuals and businesses alike. Our team comprises highly trained security professionals with years of experience in surveillance, risk assessment, and emergency response.
//                 </p>
//                 <ul className="text-lg max-w-3xl list-disc list-inside text-left space-y-2">
//                     <li><strong>Advanced surveillance systems</strong> - Utilizing the latest technology for unmatched monitoring.</li>
//                     <li><strong>24/7 monitoring and alert services</strong> - Always on guard to ensure your safety.</li>
//                     <li><strong>Comprehensive risk assessments</strong> - Identifying vulnerabilities and minimizing risks.</li>
//                     <li><strong>Customized security solutions</strong> - Tailored to meet your unique requirements.</li>
//                 </ul>
//                 <p className="text-lg max-w-3xl text-center mt-6 leading-relaxed">
//                     At SecureVision, we believe that security is not just a service—it’s a commitment. Our innovative technology and dedicated team work tirelessly to provide unmatched protection for your peace of mind.
//                 </p>
//             </section>

//             {/* Dummy Section */}
//             <section
//                 id="dummy"
//                 className="flex flex-col items-center py-16 bg-white text-gray-800"
//             >
//                 <h2 className="text-3xl font-bold mb-4">Today's Requirements</h2>
//                 {requirements.length === 0 ? (
//                     <p className="text-gray-500">No requirements available.</p>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {requirements.map((requirement: any) => {
//                             const formattedDate = new Date(requirement.Date).toLocaleDateString('en-US', {
//                                 year: 'numeric',
//                                 month: 'long',
//                                 day: 'numeric',
//                             });

//                             return (
//                                 <div
//                                     key={requirement._id}
//                                     className="bg-white p-4 rounded-lg shadow-md border"
//                                 >
//                                     <h4 className="font-semibold">{requirement.name}</h4>
//                                     <p className="text-sm text-gray-600">Location: {requirement.location}</p>
//                                     <p className="text-sm text-gray-600">Date: {formattedDate}</p>
//                                     <p className="text-sm text-gray-600">Shift: {requirement.shift}</p>
//                                     <p className="text-sm text-gray-600">Shift Timings: {requirement.shiftTimings}</p>
//                                     <p className="text-sm text-gray-600">Purpose: {requirement.Purpose}</p>
//                                     <p className="text-sm text-gray-600">Staff Required: {requirement.staffRequired}</p>
//                                     <button
//                                         onClick={() => window.open(requirement.address, "_blank")}
//                                         className="bg-blue-500 text-white mt-4 rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 transition"
//                                     >
//                                         View Location
//                                     </button>
//                                 </div>
//                             );
//                         })}

//                     </div>
//                 )}
//             </section>

//             {/* Footer */}
//             <footer id="footer" className="bg-gray-800 text-white py-8">
//                 <div className="container mx-auto px-4 text-center">
//                     {/* Main Footer Text */}
//                     <p className="text-sm mb-4">
//                         © {new Date().getFullYear()} SecureVision. All rights reserved. Dedicated to your safety and security.
//                     </p>

//                     {/* Contact Us Section */}
//                     <p className="text-sm mb-4">
//                         Have questions or need assistance? Reach out to us at{" "}
//                         <a href="mailto:support@securevision.com" className="text-blue-400 hover:underline">
//                             support@securevision.com
//                         </a>{" "}
//                         or call{" "}
//                         <a href="tel:+11234567890" className="text-blue-400 hover:underline">
//                             +1 (123) 456-7890
//                         </a>.
//                     </p>

//                     {/* Follow Us Section */}
//                     <p className="text-sm mb-4">
//                         Stay updated with the latest in security trends. Follow us on{" "}
//                         <a href="#" className="text-blue-400 hover:underline">
//                             Facebook
//                         </a>,{" "}
//                         <a href="#" className="text-blue-400 hover:underline">
//                             Twitter
//                         </a>, and{" "}
//                         <a href="#" className="text-blue-400 hover:underline">
//                             Instagram
//                         </a>.
//                     </p>
//                 </div>
//             </footer>
//         </div>
//     );
// }
