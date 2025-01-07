"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa"; // Import bars icon from react-icons

export default function HomePage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

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
                                    href="#dummy"
                                    className="block px-4 py-2 text-gray-700 hover:text-black"
                                >
                                    Dummy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#footer"
                                    className="block px-4 py-2 text-gray-700 hover:text-black"
                                >
                                    Footer
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
                    At SecureVision, we believe that security is not just a service—it’s a commitment. Our innovative technology and dedicated team work tirelessly to provide unmatched protection for your peace of mind.
                </p>
            </section>

            {/* Dummy Section */}
            <section
                id="dummy"
                className="flex flex-col items-center py-16 bg-white text-gray-800"
            >
                <h2 className="text-3xl font-bold mb-4">Dummy Section</h2>
                <p className="text-lg max-w-3xl text-center">
                    Add your own content here. Use this section for showcasing features, articles, or anything else.
                </p>
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
                            LinkedIn
                        </a>.
                    </p>

                    {/* Disclaimer */}
                    <p className="text-sm text-gray-400">
                        SecureVision is committed to providing reliable security solutions. Services and features are subject to change as per the latest industry standards.
                    </p>
                </div>
            </footer>

            {/* <footer id="footer" className="bg-gray-800 text-white py-8">
                <div className="container mx-auto text-center">
                    <p className="text-sm">© {new Date().getFullYear()} My Website. All rights reserved.</p>
                </div>
            </footer> */}
        </div>
    );
}

// "use client";
// import { useRouter } from "next/navigation";
// export default function HomePage() {
//     const Router = useRouter();
//     const handleSignupClick = () => {
//         Router.push("/signup")
//     };

//     const handleLoginClick = () => {
//         Router.push("/login")
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Header */}
//             <header className="bg-white shadow-md">
//                 <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//                     {/* Left: Website Title */}
//                     <h1 className="text-2xl font-bold text-black">My Website</h1>

//                     {/* Center: Navigation Links */}
//                     <nav className="hidden sm:flex space-x-4">
//                         <a href="#home" className="text-gray-700 hover:text-black">Home</a>
//                         <a href="#about" className="text-gray-700 hover:text-black">About</a>
//                         <a href="#dummy" className="text-gray-700 hover:text-black">Dummy</a>
//                         <a href="#footer" className="text-gray-700 hover:text-black">Footer</a>
//                     </nav>

//                     {/* Right: Buttons */}
//                     <div className="flex space-x-4">
//                         <button
//                             onClick={handleSignupClick}
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                         >
//                             Sign Up
//                         </button>
//                         <button
//                             onClick={handleLoginClick}
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Navigation Links */}
//                 <nav className="sm:hidden flex justify-center mt-4">
//                     <div className="flex flex-col space-y-2">
//                         <a href="#home" className="text-gray-700 hover:text-black text-center">Home</a>
//                         <a href="#about" className="text-gray-700 hover:text-black text-center">About</a>
//                         <a href="#dummy" className="text-gray-700 hover:text-black text-center">Dummy</a>
//                         <a href="#footer" className="text-gray-700 hover:text-black text-center">Footer</a>
//                     </div>
//                 </nav>
//             </header>

//             {/* Home Section */}
//             <section
//                 id="home"
//                 className="flex flex-col justify-center items-center min-h-screen py-16 bg-blue-500 text-white text-center"
//             >
//                 <h2 className="text-4xl font-bold mb-4">Welcome to My Website</h2>
//                 <p className="text-lg max-w-2xl">
//                     This is a responsive homepage built with Next.js and Tailwind CSS.
//                 </p>
//             </section>

//             {/* About Section */}
//             <section
//                 id="about"
//                 className="flex flex-col items-center py-16 bg-gray-200 text-gray-800"
//             >
//                 <h2 className="text-3xl font-bold mb-4">About Us</h2>
//                 <p className="text-lg max-w-3xl text-center">
//                     Our website is designed to provide a responsive layout with a modern user interface.
//                     The about section is styled with Tailwind CSS to look great on all devices.
//                 </p>
//             </section>

//             {/* Dummy Content Section */}
//             <section
//                 id="dummy"
//                 className="flex flex-col items-center py-16 bg-white text-gray-800"
//             >
//                 <h2 className="text-3xl font-bold mb-4">Dummy Section</h2>
//                 <p className="text-lg max-w-3xl text-center">
//                     This is a dummy section where you can add your own content. Use it for showcasing features,
//                     articles, or anything else you want to highlight.
//                 </p>
//             </section>

//             {/* Footer Section */}
//             <footer
//                 id="footer"
//                 className="bg-gray-800 text-white py-8"
//             >
//                 <div className="container mx-auto text-center">
//                     <p className="text-sm">© {new Date().getFullYear()} My Website. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// }
